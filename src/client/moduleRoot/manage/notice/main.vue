<template>
  <div class="notice">
    <div class="set-notice">
      <span>公告列表</span>
      <el-button type="primary"
                 :disabled="isLoadingDataSource"
                 @click="releaseNotice">发布公告</el-button>
    </div>
    <loading v-if="isLoadingDataSource && currentPageNo === 1" />
    <el-table v-else
              border
              stripe
              :data="dataSource"
              style="width: 100%"
              v-loading="isLoadingDataSource && currentPageNo !== 1">
      <el-table-column prop="gmtCreatetime"
                       label="发送时间"
                       class-name="gmtCreatetime"
                       header-align="center"
                       width="170" />
      <el-table-column prop="title"
                       class-name="title"
                       header-align="center"
                       label="通知标题" />
      <el-table-column label="操作"
                       header-align="center"
                       width="180">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     :class="[scope.row.isTop === 0 ? 'set-top' : 'no-top']"
                     @click.native.prevent="setTop(scope)">
            {{scope.row.isTop | filterIsTop}}
          </el-button>
          <el-button type="text"
                     size="small"
                     class="edit-btn"
                     @click="editNotice(scope)">
            编辑
          </el-button>
          <el-button type="text"
                     size="small"
                     class="del-btn"
                     @click.native.prevent="sureCancel(scope)">
            删除
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
    <publish-notice :is-show="dialogFormVisible"
                    :value="value"
                    ref="publishNotice"
                    :notice-id="noticeId"
                    @getNoticeList="getNoticeList"
                    @close="() => dialogFormVisible = false" />

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
import PublishNotice from './publish-notice';
import ajax, { FETCH_DATA, TOGGLE_FETCHING } from '../config';

import style from '../css';

const moduleName = 'manage.alarm';

export default {
  components: { Loading, PublishNotice },
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
      noticeId: -1,
      dataApi: ajax({
        url: '/station/notice',
        stationId: () => this.value,
        page: () => this.currentPageNo,
        limit: 15,
      }),
      topApi: ajax({
        url: '/station/notice/top',
      }),
      cancelNoticeApi: ajax({
        url: '/station/notice/delete',
      }),
      formLabelWidth: '100px',
      dialogFormVisible: false,
    };
  },
  computed: {
    ...mapBus(),
    ...mapState(moduleName, [
      'total',
      'title',
      'currentPageNo',
    ]),
    ...mapGetters(moduleName, getLazyObjectNames('dataSource')),
  },
  filters: {
    filterIsTop(isTop) {
      return parseInt(isTop) === 0 ? '设置置顶' : '取消置顶';
    },
  },
  methods: {
    ...mapDefaultMutations(moduleName),
    ...mapActions(moduleName, ['fetchData']),
    handleCurrentChange(val = 1) {
      this.set({ currentPageNo: val });

      this.bus.$emit(TOGGLE_FETCHING, true);
      try {
        this.fetchData(this.dataApi);
      } finally {
        this.bus.$emit(TOGGLE_FETCHING, false);
      }
    },
    async setTop(scope) {
      await this.topApi.post(v => {
        v.params.noticeId = scope.row.id;
        v.params.isTop = parseInt(scope.row.isTop) === 0 ? 1 : 0;

        return v;
      });

      this.$message({
        message: '已设置成功',
        type: 'success',
      });
      this.fetchData(this.dataApi);
    },
    sureCancel(scope) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.cancelNotice(scope);
      }).catch(() => {
        return false;
      });
    },
    async cancelNotice(scope) {
      await this.cancelNoticeApi.del(v => {
        v.params.noticeId = scope.row.id;

        return v;
      });

      this.fetchData(this.dataApi);
      this.$message({
        message: '删除成功',
        type: 'success',
      });
    },
    editNotice(scope) {
      this.noticeId = scope.row.id;
      this.dialogFormVisible = true;
    },
    releaseNotice() {
      this.noticeId = -1;
      this.dialogFormVisible = true;
      this.$refs.publishNotice.clearForm();
    },
    getNoticeList() {
      this.fetchData(this.dataApi);
    },
  },
  mounted() {
    this.fetchData(this.dataApi);
  },
};
</script>

