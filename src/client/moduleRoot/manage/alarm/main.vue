<template>
  <div class="alarm">
    <div class="set-alarm">
      <span>警报列表</span>
      <el-button type="primary"
                 :disabled="isLoadingDataSource"
                 @click="toggleDialog(true)">设置警报接收对象</el-button>
    </div>
    <loading v-if="isLoadingDataSource && currentPageNo === 1" />
    <el-table v-else
              border
              stripe
              :data="dataSource"
              v-loading="isLoadingDataSource && currentPageNo !== 1">
      <el-table-column prop="gmtCreatetime"
                       header-align="center"
                       label="报警时间"
                       width="130" />
      <el-table-column prop="address"
                       header-align="center"
                       label="警报位置" />
      <el-table-column prop="userName"
                       header-align="center"
                       label="报警人员"
                       width="80" />
      <el-table-column prop="deptName"
                       header-align="center"
                       label="所属科室"
                       width="100" />
      <el-table-column prop="mobile"
                       header-align="center"
                       label="联系方式"
                       width="100" />
      <el-table-column label="当前状态"
                       header-align="center"
                       class-name="alarming"
                       width="80">
        <template slot-scope="scope">{{scope.row.status | filterState}}</template>
      </el-table-column>
      <el-table-column label="操作"
                       header-align="center"
                       width="100"
                       class-name="text-center">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     :loading="scope.$index === index && removeBtnLonding"
                     @click.native.prevent="removeAlarm(scope)">
            解除警报
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager-container">
      <span class="page_list">当前第
        <span>{{currentPageNo}}</span> 页，每页
        <span>15</span> 条记录，共计
        <span>{{total%15 === 0? (total/15 ? total/15 : 1): parseInt(total/15+1)}}</span> 页，共计
        <span>{{total}}</span> 条记录
      </span>
      <el-pagination :total="total"
                     :page-size="15"
                     :current-page="currentPageNo"
                     v-show="!isLoadingDataSource"
                     layout="prev, pager, next, jumper"
                     @current-change="handleCurrentChange" />
    </div>
    <el-dialog size="tiny"
               title="接警电话"
               :show-close="false"
               :visible.sync="dialogFormVisible">
      <loading v-if="isLoadingMobile" />
      <el-input v-else
                :rows="5"
                resize="none"
                type="textarea"
                :value="mobile"
                @input="set({ mobile: { data: arguments[0] } })"
                auto-complete="off" />
      </el-form-item>
      <div>注意</div>
      <div>1.多个号码间以英文逗号分隔</div>
      <div>2.固话要带区号，比如057156132823</div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   :loading="saveBtnLoading"
                   @click="saveAlarmMobiles">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import { mapState, mapGetters, mapActions } from 'vuex';

import useStyle from '$lib/mixins/use-style';
import Loading from '$lib/components/loading';
import linkStore from '$lib/mixins/link-store';
import { mapBus, mapBusEvent } from '$lib/utils/map-bus';
import { getLazyObjectNames } from '$lib/utils/lazy-object';
import { mapDefaultMutations } from '$lib/utils/default-mutations';

import store from './store';
import ajax, { FETCH_DATA, TOGGLE_FETCHING } from '../config';

import style from '../css';

const moduleName = 'alarm';

export default {
  components: { Loading },
  mixins: [
    linkStore(moduleName, store),
    useStyle(style),
    mapBusEvent({
      [FETCH_DATA]: 'handleCurrentChange',
    }),
  ],
  props: {
    value: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      dataApi: ajax({
        url: '/station/alarm',
        stationId: () => this.value,
        page: () => this.currentPageNo,
        limit: 15,
      }),
      cancelApi: ajax({
        url: '/station/alarm/cancel',
      }),
      saveAlarmApi: ajax({
        url: '/station/alarm/mobile/save',
        stationId: () => this.value,
        mobiles: () => this.mobile,
      }),
      index: -1,
      removeBtnLonding: false,
      dialogFormVisible: false,
      saveBtnLoading: false,
      mobileApi: ajax({
        url: '/station/alarm/mobile',
        stationId: () => this.value,
      }),
    };
  },
  computed: {
    ...mapBus(),
    ...mapState(moduleName, [
      'total',
      'currentPageNo',
    ]),
    ...mapGetters(moduleName, getLazyObjectNames('dataSource')),
    ...mapGetters(moduleName, getLazyObjectNames('mobile')),
  },
  filters: {
    filterState(status) {
      return status === '0' ? '警报中' : '已解除';
    },
  },
  methods: {
    ...mapDefaultMutations(moduleName),
    ...mapActions(moduleName, ['fetchData', 'fetchMobile']),
    handleCurrentChange(val = 1) {
      this.set({ currentPageNo: val });

      this.bus.$emit(TOGGLE_FETCHING, true);
      try {
        this.fetchData(this.dataApi);
      } finally {
        this.bus.$emit(TOGGLE_FETCHING, false);
      }
    },
    async removeAlarm(scope) {
      this.index = scope.$index;
      const token = setTimeout(() => this.removeBtnLonding = true, 100);

      const { result } = await this.cancelApi.post(v => {
        v.params.alarmId = scope.row.id;

        return v;
      });

      clearTimeout(token);
      this.removeBtnLonding = false;

      this.$message({
        message: result,
        type: 'success',
      });

      this.fetchData(this.dataApi);
    },
    async saveAlarmMobiles() {
      const token = setTimeout(() => this.saveBtnLoading = true, 100);

      const { result } = await this.saveAlarmApi.post();

      clearTimeout(token);
      this.saveBtnLoading = false;
      this.dialogFormVisible = false;
      if (result === 0) {
        this.$message({
          message: '保存成功',
          type: 'success',
        });
      }
    },
    toggleDialog(status) {
      this.dialogFormVisible = status;

      if (status) {
        this.fetchMobile(this.mobileApi);
      }
    },
  },
  mounted() {
    this.fetchData(this.dataApi);
  },
};
</script>

