<template>
  <div class="toolbar">
    <label>
      <span>当前医院：</span>
      <el-select :value="value"
                 placeholder="请选择"
                 class="search-term-hospital"
                 @input="$emit('input', arguments[0])">
        <el-option :key="n.id"
                   :value="n.id"
                   :label="n.name"
                   v-for="n in hospitals" />
      </el-select>
    </label>
    <el-button type="primary btn-search"
               :loading="currentIsLoading"
               @click="delayingIsLoading ? '' : bus.$emit(fetchDataName)">
      查询
    </el-button>
  </div>
</template>

<script>
import delay from '$lib/mixins/delay-property';
import { mapBus, mapBusEvent } from '$lib/utils/map-bus';

import { FETCH_DATA, TOGGLE_LOADING } from './config';

export default {
  mixins: [
    delay('isLoading'),
    mapBusEvent({
      [TOGGLE_LOADING]: 'changeLoadingStatus',
    }),
  ],
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
  data: () => ({
    fetchDataName: FETCH_DATA,
    isLoading: false,
  }),
  computed: mapBus(),
  methods: {
    changeLoadingStatus(status) {
      this.isLoading = status;

      if (!status) {
        this.currentIsLoading = status;
      }
    },
  },
};
</script>
