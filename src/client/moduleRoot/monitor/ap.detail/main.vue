<template>
  <loading v-if="isLoadingDataSource && currentPageNo === 1" />
  <div v-else>
    <el-table border
              stripe
              :data="dataSource"
              v-loading="isLoadingDataSource && currentPageNo !== 1"
              style="width: 100%">
      <el-table-column prop="fapSn"
                       label="AP SN"
                       class-name="code"
                       width="150" />
      <el-table-column prop="fapMac"
                       label="AP MAC"
                       class-name="code"
                       width="185" />
      <el-table-column prop="apSn"
                       label="所属网关"
                       class-name="code"
                       width="165" />
      <el-table-column prop="fapDeviceFactory"
                       label="AP 厂商"
                       width="90" />
      <el-table-column prop="address"
                       label="位置|楼宇|楼层|AP图纸表示|区域"
                       width="540" />
      </el-table-column>
    </el-table>
    <div class="pager-container">
      <span class="page_list">当前第
        <span>{{currentPageNo}}</span> 页，每页
        <span>15</span> 条记录，共计
        <span>{{total%15 === 0? (total/15 ? total/15 : 1): parseInt(total/15+1)}}</span> 页，共计
        <span>{{total}}</span> 条记录
      </span>
      <el-pagination @current-change="handleCurrentChange"
                     :current-page="currentPageNo"
                     :page-size="15"
                     v-loading="isLoadingDataSource"
                     layout="prev, pager, next, jumper"
                     :total="total" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import Loading from '$lib/components/loading';
import linkStore from '$lib/mixins/link-store';
import { mapBus, mapBusEvent } from '$lib/utils/map-bus';
import { getLazyObjectNames } from '$lib/utils/lazy-object';
import { mapDefaultMutations } from '$lib/utils/default-mutations';

import store from './store';
import ajax, { FETCH_DATA, TOGGLE_LOADING } from '../config';

const moduleName = 'monitor.ap.detail';

export default {
  props: {
    value: {
      type: String,
      require: true,
    },
  },
  components: { Loading },
  mixins: [
    linkStore(moduleName, store),
    mapBusEvent({
      [FETCH_DATA]: 'resetSearch',
    }),
  ],
  data() {
    return {
      dataApi: ajax({
        limit: 15,
        url: '/ap',
        date: () => this.dateValue,
        stationId: () => this.value,
        page: () => this.currentPageNo,
        status: () => this.$route.params.type === 'online' ? 1 : 3,
      }),
    };
  },
  computed: {
    ...mapBus(),
    ...mapGetters(moduleName, getLazyObjectNames('dataSource')),
    ...mapState(moduleName, ['total', 'dateValue', 'currentPageNo']),
  },
  methods: {
    ...mapDefaultMutations(moduleName),
    ...mapActions(moduleName, ['fetchData']),
    async searchData() {
      try {
        this.bus.$emit(TOGGLE_LOADING, true);
        await this.fetchData(this.dataApi);
      } finally {
        this.bus.$emit(TOGGLE_LOADING, false);
      }
    },
    handleCurrentChange(val) {
      this.set({ currentPageNo: val });

      this.searchData();
    },
    resetSearch() {
      this.handleCurrentChange(1);
    },
  },
  mounted() {
    this.searchData();
  },
};
</script>
