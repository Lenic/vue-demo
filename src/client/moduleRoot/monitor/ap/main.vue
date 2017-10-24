<template>
  <loading v-if="isLoadingDataSource" />
  <ul v-else
      class="date_list">
    <li>
      <p class="date_title">在线 AP</p>
      <p class="date_number">
        <router-link to="/monitor/ap/online">{{dataSource.online}}</router-link>
      </p>
    </li>
    <li>
      <p class="date_title">离线 AP</p>
      <p class="date_number">
        <router-link to="/monitor/ap/offline">{{dataSource.offline}}</router-link>
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

const moduleName = 'monitor.ap';

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
        url: '/apStat',
        date: () => this.dateValue,
        stationId: () => this.value,
      }),
    };
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
