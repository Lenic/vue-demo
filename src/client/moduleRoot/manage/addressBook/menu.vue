<template>
  <div class="sub-list">
    <form class="search-box"
          @submit="searchData">
      <el-input icon="search"
                :value="deptName"
                class="search-input"
                placeholder="搜索科室名称"
                :on-icon-click="searchData"
                @input="set({ deptName: arguments[0] })" />
    </form>
    <ul class="sub-ul">
      <li>
        <a class="dep-tree-bt2"
           @click="toggleOrg">
          <span class="arrow"
                :class="{ 'down-arrow': showOrg }" />
        </a>
        <i class="tree-icon">
          <img :src="require('$res/images/icon-10.png')" />
        </i>
        <span @click="getAllUser">{{stationName}}({{employeeTotalCount}}人)</span>
      </li>
      <li v-if="showOrg"
          class="tree-container">
        <loading v-if="isLoadingDataSource" />
        <el-tree lazy
                 v-else
                 :load="loadNode"
                 :data="dataSource"
                 class="filter-tree"
                 :highlight-current="true"
                 @node-click="refreshDetail"
                 :expand-on-click-node="false" />
      </li>
    </ul>
  </div>
</template>

<script>
import _ from 'underscore';
import { mapState, mapGetters, mapActions } from 'vuex';

import useStyle from '$lib/mixins/use-style';
import Loading from '$lib/components/loading';
import linkStore from '$lib/mixins/link-store';
import { mapBus, mapBusEvent } from '$lib/utils/map-bus';
import { getLazyObjectNames } from '$lib/utils/lazy-object';
import { mapDefaultMutations } from '$lib/utils/default-mutations';

import ajax, { FETCH_DATA } from '../config';
import store from './menu-store';
import { FETCHING_ORG, REFRESH_EMPLOYEE, LOADING_EMPLOYEE, CHANGE_USER_COUNT, GET_STATION_NAME } from './constants';

import style from './menu-css';

const moduleName = 'manage.addressBook.menu';

export default {
  props: {
    value: {
      type: String,
      require: true,
    },
  },
  components: { Loading },
  mixins: [
    useStyle(style),
    linkStore(moduleName, store),
    mapBusEvent({
      [FETCH_DATA]: 'searchData',
      [LOADING_EMPLOYEE]: 'refreshStatus',
      [CHANGE_USER_COUNT]: 'changeUserCount',
    }),
  ],
  data() {
    return {
      isDisabled: false,
      dataApi: ajax({
        url: '/station/dept',
        stationId: () => this.value,
        deptName: () => this.deptName,
      }),
    };
  },
  computed: {
    ...mapBus(),
    ...mapGetters(moduleName, getLazyObjectNames('dataSource')),
    ...mapState(moduleName, ['originalDeptName', 'deptName', 'showOrg', 'hospUserCount', 'stationName']),
    employeeTotalCount: function () {
      return this.hospUserCount < 0 ? '--' : this.hospUserCount;
    },
  },
  methods: {
    ...mapDefaultMutations(moduleName),
    ...mapActions(moduleName, ['fetchData']),
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve(node.data);
      } else if (node.level === 1) {
        return resolve(node.data.details);
      } else {
        return resolve([]);
      }
    },
    toggleOrg() {
      this.set({ showOrg: !this.showOrg });
      // if (this.showOrg) {
      //   this.searchData();
      // }
    },
    refreshStatus(status) {
      this.isDisabled = status;
    },
    changeUserCount(type, deptVal, count) {
      const currentData = this.dataSource;
      _.map(currentData, v => {
        if (v.id === deptVal[0]) {
          if (deptVal.length === 1) {
            if (type) {
              v.label = `${v.name}(${v.deptUserCount + count})`;
              v.deptUserCount = v.deptUserCount + count;
            } else {
              v.label = `${v.name}(${v.deptUserCount - count})`;
              v.deptUserCount = v.deptUserCount - count;
            }
          } else {
            _.map(v.details, v1 => {
              if (v1.id === deptVal[1]) {
                if (type) {
                  v.label = `${v.name}(${v.deptUserCount + count})`;
                  v1.label = `${v1.name}(${v1.deptUserCount + count})`;
                  v.deptUserCount = v.deptUserCount + count;
                  v1.deptUserCount = v1.deptUserCount + count;
                } else {
                  v.label = `${v.name}(${v.deptUserCount - count})`;
                  v1.label = `${v1.name}(${v1.deptUserCount - count})`;
                  v.deptUserCount = v.deptUserCount - count;
                  v1.deptUserCount = v1.deptUserCount - count;
                }
              }
            });
          }
        }
      });
      this.set({ dataSource: { data: currentData } });
    },
    refreshDetail({ id, parentId }) {
      if (this.delayingIsDisabled || this.isDisabled) {
        return;
      }

      this.bus.$emit(REFRESH_EMPLOYEE, id, parentId);
    },
    getAllUser() {
      this.bus.$emit(REFRESH_EMPLOYEE, -1, null);
    },
    async searchData(e) {
      e && e.preventDefault();

      if (this.isLoadingDataSource) {
        return;
      }

      try {
        this.bus.$emit(FETCHING_ORG, true);

        await this.fetchData(this.dataApi);
      } finally {
        this.bus.$emit(FETCHING_ORG, false);
        this.bus.$emit(GET_STATION_NAME, this.stationName);
      }
    },
  },
  mounted() {
    this.set({ showOrg: !this.showOrg });
    if (this.showOrg) {
      this.searchData();
    }
  },
};
</script>
