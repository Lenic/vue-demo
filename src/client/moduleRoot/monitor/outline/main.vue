<template>
  <loading v-if="isLoadingDataSource" />
  <ul v-else
      class="date_list2">
    <li :key="n.id"
        v-for="n in dataSource">
      <p class="date_title">{{n.apSn}}</p>
      <p class="date_number2">
        <router-link :to="`/monitor/round/${n.apSn}`">在线人数：{{n.apClients }}</router-link>
      </p>
      <p class="date_number2">
        实际使用宽带：{{n.downsideAvgvalue | toDecimal}}MB
      </p>
      <p class="date_number2">
        总宽带：{{n.bandwidth}}MB
      </p>
    </li>
  </ul>
</template>

<script type="text/javascript">
import { mapState, mapGetters, mapActions } from 'vuex';

import Loading from '$lib/components/loading';
import linkStore from '$lib/mixins/link-store';
import { mapBus, mapBusEvent } from '$lib/utils/map-bus';
import { getLazyObjectNames } from '$lib/utils/lazy-object';
import { mapDefaultMutations } from '$lib/utils/default-mutations';

import store from './store';
import ajax, { FETCH_DATA, TOGGLE_LOADING } from '../config';

const moduleName = 'monitor.outline';

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
      [FETCH_DATA]: 'searchData',
    }),
  ],
  data() {
    return {
      dataApi: ajax({
        url: '/sn',
        date: () => this.dateValue,
        stationId: () => this.value,
      }),
    };
  },
  filters: {
    toDecimal(x) {
      var f = parseFloat(x);
      if (isNaN(f)) {
        return;
      }
      f = Math.round(x * 100) / 100;
      return f;
    },
  },
  computed: {
    ...mapBus(),
    ...mapState(moduleName, ['dateValue']),
    ...mapGetters(moduleName, getLazyObjectNames('dataSource')),
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
  },
  mounted() {
    this.searchData();
  },
};
</script>
