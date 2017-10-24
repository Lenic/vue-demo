<template>
  <loading v-if="isLoadingDataSource" />
  <div v-else>
    <div class="chart-box">
      <div class="title">在线用户分布图</div>
      <img :src="require('$res/images/crmx_05.gif')"
           @click="erport" />
      <chart :options="dataSource">
      </chart>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Chart from '$lib/components/chart';
import Loading from '$lib/components/loading';
import linkStore from '$lib/mixins/link-store';
import { getLazyObjectNames } from '$lib/utils/lazy-object';
import { mapDefaultMutations } from '$lib/utils/default-mutations';

import store from './store';
import ajax from '../config';

const moduleName = 'monitor.ap.detail';

export default {
  props: {
    value: {
      type: String,
      require: true,
    },
  },
  components: { Loading, Chart },
  mixins: [
    linkStore(moduleName, store),
  ],
  data() {
    return {
      dataApi: ajax({
        url: '/onlineUser',
        sn: this.$route.params.sn,
      }),
      exportApi: ajax({
        url: '/exportOnlineUser',
        sn: this.$route.params.sn,
      }),
    };
  },
  computed: {
    ...mapGetters(moduleName, getLazyObjectNames('dataSource')),
  },
  methods: {
    ...mapDefaultMutations(moduleName),
    ...mapActions(moduleName, ['fetchData']),
    async searchData() {
      await this.fetchData(this.dataApi);
    },
    async erport() {
      const { result } = await this.exportApi.fetch();

      location.href = result;
    },
  },
  mounted() {
    this.searchData();
  },
};
</script>
