<template>
  <div class="new-content-box">
    <div class="new-c-t">
      <form @submit="searchData"
            class="new-c-input-box">
        <el-input icon="search"
                  placeholder="搜索员工"
                  :on-icon-click="searchData"
                  v-model.trim="searchUserVal" />
      </form>
      <i>{{stationName}}</i>
    </div>
    <div class="new-c-sub-title">
      <el-button type="primary"
                 class=" float-btn"
                 @click="addUser">
        添加员工
      </el-button>
      <span class="new-c-sub-text">
        <img :src="require('$res/images/icon-06.gif')" />
        <span>科室人员</span>
      </span>
    </div>
    <loading v-if="isLoadingDataSource" />
    <div v-else>
      <div class="del-user"
           v-if="isShowDelete">
        <span class="pointer"
              @click="cancelmore">
          <img :src="require('$res/images/del-03.gif')" />
          <span>批量删除</span>
        </span>
      </div>
      <div class="user-table">
        <el-table ref="multipleTable"
                  :data="dataSource"
                  border
                  tooltip-effect="dark"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="userName"
                           align="center"
                           label="姓名"
                           width="120">
          </el-table-column>
          <el-table-column prop="userid"
                           label="员工UserID"
                           align="center"
                           width="120">
          </el-table-column>
          <el-table-column label="职称"
                           align="center"
                           prop="userPosition"
                           width="120">
          </el-table-column>
          <el-table-column prop="jobnumber"
                           label="工号"
                           align="center"
                           width="120">
          </el-table-column>
          <el-table-column prop="mobile"
                           align="center"
                           label="手机号"
                           width="130">
          </el-table-column>
          <el-table-column label="操作"
                           align="center"
                           width="120">
            <template slot-scope="scope">
              <el-button @click="editUser(scope.row)"
                         type="text"
                         size="small">编辑</el-button>
              <el-button type="text"
                         @click="cancelUser(scope.row)"
                         size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-container"
           v-show="total>0">
        <span class="page_list">当前第
          <span>{{currentPageNo}}</span> 页，每页
          <span>15</span> 条记录，共计
          <span>{{total%15 === 0? (total/15 ? total/15 : 1): parseInt(total/15+1)}}</span> 页，共计
          <span>{{total}}</span> 条记录
        </span>
        <el-pagination :total="total"
                       :current-page="currentPageNo"
                       :page-size="15"
                       layout="prev, pager, next, jumper"
                       @current-change="handleCurrentChange" />
      </div>
    </div>
    <add-user :value="value"
              :title="title"
              :isEditor="isEditor"
              :editForm="editForm"
              :isShow="showDialog"
              @cancel-user="cancelUser"
              @close="showDialog = false" />
  </div>
</template>

<script type="text/javascript">
import _ from 'underscore';
import { mapState, mapGetters, mapActions } from 'vuex';

import Loading from '$lib/components/loading';
import linkStore from '$lib/mixins/link-store';
import { mapBus, mapBusEvent } from '$lib/utils/map-bus';
import { getLazyObjectNames } from '$lib/utils/lazy-object';
import { mapDefaultMutations } from '$lib/utils/default-mutations';

import store from './store';
import ajax, { FETCH_DATA, TOGGLE_FETCHING } from '../config';
import addUser from './add-user';
import {
  REFRESH_EMPLOYEE,
  LOADING_EMPLOYEE,
  CHANGE_USER_COUNT,
  GET_STATION_NAME,
} from './constants';

const moduleName = 'manage.addressBook';

export default {
  props: {
    hospitals: {
      type: Array,
      require: true,
    },
    value: {
      type: String,
      require: true,
    },
  },
  components: { Loading, addUser },
  mixins: [
    linkStore(moduleName, store),
    mapBusEvent({
      [FETCH_DATA]: 'refreshData',
      [GET_STATION_NAME]: 'getStationName',
      [REFRESH_EMPLOYEE]: 'initialData',
    }),
  ],
  watch: {
    value: function (val) {
      this.currentHospital = _.find(this.hospitals, v => v.id === val);
    },
  },
  data() {
    return {
      isAll: false,
      title: '',
      editForm: {},
      stationName: '',
      isEditor: false,
      showDialog: false,
      isShowDelete: false,
      searchUserVal: '',
      currentHospital: _.find(this.hospitals, v => v.id === this.value),
      dataApi: ajax({
        limit: 15,
        url: '/station/user',
        stationId: () => this.value,
        userName: () => this.userName,
        page: () => this.currentPageNo,
        deptId: () => (this.deptId < 0 || this.isAll) ? '' : this.deptId,
      }),
      cancelApi: ajax({
        url: '/station/user/delete',
      }),
    };
  },
  computed: {
    ...mapBus(),
    ...mapGetters(moduleName, getLazyObjectNames('dataSource')),
    ...mapState(moduleName, [
      'deptId',
      'parentId',
      'userName',
      'regUserId',
      'currentPageNo',
      'total',
    ]),
  },
  methods: {
    ...mapDefaultMutations(moduleName),
    ...mapActions(moduleName, ['fetchData']),
    refreshData() {
      // if (this.deptId === -1) {
      //   return;
      // }

      this.searchUserVal = '';
      this.set({ userName: this.searchUserVal });
      this.isAll = false;

      this.fetchDataWithEvent();
    },
    getStationName(stationName) {
      this.stationName = stationName;
    },
    searchData(e) {
      e.preventDefault();

      // if (this.deptId === -1) {
      //   return;
      // }

      if (this.userName !== this.searchUserVal) {
        this.set({ userName: this.searchUserVal });
        this.isAll = true;

        this.fetchDataWithEvent();
      }
    },
    async fetchDataWithEvent() {
      try {
        this.bus.$emit(LOADING_EMPLOYEE, true);
        this.bus.$emit(TOGGLE_FETCHING, true);

        await this.fetchData(this.dataApi);
      } finally {
        this.bus.$emit(LOADING_EMPLOYEE, false);
        this.bus.$emit(TOGGLE_FETCHING, false);
      }
    },
    initialData(deptId, parentId) {
      if (this.deptId === deptId) {
        return;
      }

      this.set({
        deptId,
        parentId,
        userName: '',
        currentPageNo: 1,
      });
      this.isAll = false;

      this.fetchDataWithEvent();
    },
    handleCurrentChange(val) {
      this.set({ currentPageNo: val });

      this.fetchDataWithEvent();
    },
    handleSelectionChange(val) {
      if (val.length > 0) {
        this.isShowDelete = true;

        this.set({ regUserId: _.pluck(val, 'regUserId') });
      } else {
        this.isShowDelete = false;
      }
    },
    cancelmore() {
      if (this.regUserId.length > 0) {
        this.cancelUser(this.regUserId);
      } else {
        this.$message('请先勾选所需删除项目');
      }
    },
    addUser() {
      this.title = '添加员工';
      this.showDialog = true;
      this.editForm = {};
    },
    editUser(val) {
      this.title = '员工编辑';
      this.editForm = val;
      this.isEditor = true;
      this.showDialog = true;
    },
    sureCancel(val, count) {
      this.cancelApi.del(v => {
        v.params.regUserId = val.join(',');

        return v;
      }).then(() => {
        this.$message({
          message: '成功删除员工',
          type: 'success',
        });

        this.bus.$emit(CHANGE_USER_COUNT, false, [this.parentId, this.deptId], count);
        this.isShowDelete = false;

        this.fetchDataWithEvent();
      });
    },
    cancelUser(val) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        if (Array.isArray(val)) {
          this.sureCancel(this.regUserId, this.regUserId.length);
        } else {
          this.sureCancel([val.regUserId], 1);
        }
      }).catch(() => {
        return false;
      });
    },
  },
  mounted() {
    this.fetchDataWithEvent();
  },
};
</script>
