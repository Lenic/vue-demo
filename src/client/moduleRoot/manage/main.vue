<template>
  <div class="addressbook">
    <ul class="gl-sub-nav">
      <p class="gl-sub-title">类目</p>
      <li id="addressbook-li-id"
          @click="$router.push('/manage')">
        <span class="dep-tree-bt">
          <span class="arrow arrow-after"
                :class="{ 'down-arrow': $route.path === '/manage' }" />
        </span>
        <router-link to="/manage">通讯录</router-link>
      </li>
      <router-view name="menu"
                   :value="value" />
      <li @click="$router.push('/manage/notice')">
        <a class="dep-tree-bt">
          <span class="arrow"></span>
        </a>
        <router-link to="/manage/notice">院内公告</router-link>
      </li>
      <li @click="$router.push('/manage/alarm')">
        <a class="dep-tree-bt">
          <span class="arrow"></span>
        </a>
        <router-link to="/manage/alarm">一键报警</router-link>
      </li>
    </ul>
    <div class="search">
      <label>当前医院：</label>
      <el-select :value="value"
                 placeholder="请选择"
                 class="search-term-hospital"
                 @input="$emit('input', arguments[0])">
        <el-option :key="n.id"
                   :value="n.id"
                   :label="n.name"
                   v-for="n in hospitals" />
      </el-select>
      <el-button type="primary"
                 :loading="currentIsLoading"
                 @click="searchData">
        查询
      </el-button>
    </div>
    <router-view :hospitals="hospitals"
                 :value="value" />
  </div>
</template>

<script>
import useStyle from '$lib/mixins/use-style';
import delay from '$lib/mixins/delay-property';
import { mapBus, mapBusEvent } from '$lib/utils/map-bus';

import style from './css';
import { FETCH_DATA, TOGGLE_FETCHING } from './config';

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    hospitals: {
      type: Array,
      required: true,
    },
  },
  mixins: [
    useStyle(style),
    delay('isLoading'),
    mapBusEvent({
      [TOGGLE_FETCHING]: 'changeLoadingStatus',
    }),
  ],
  data: () => ({ isLoading: false }),
  computed: mapBus(),
  methods: {
    searchData() {
      !this.delayingIsLoading && this.bus.$emit(FETCH_DATA);
    },
    changeLoadingStatus(status) {
      this.isLoading = status;

      if (!status) {
        this.currentIsLoading = status;
      }
    },
  },
};
</script>
