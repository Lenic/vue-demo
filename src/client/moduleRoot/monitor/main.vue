<template>
  <div class="container margin-lr-auto">
    <router-view name="toolbar"
                 :hospitals="hospitals"
                 :value="value"
                 @input="$emit('input', arguments[0])" />
    <div class="content">
      <ul class="sub_nav">
        <li>硬件数据</li>
        <li @click="$router.push('/monitor')"
            :class="{ sub_navhover: $route.path === '/monitor' }">
          <router-link to="/monitor">网关</router-link>
        </li>
        <li @click="$router.push('/monitor/exchange')"
            :class="{ sub_navhover2: $route.path === '/monitor/exchange' }">
          <router-link to="/monitor/exchange">交换机</router-link>
        </li>
        <li @click="$router.push('/monitor/ap')"
            :class="{ sub_navhover3: $route.path.indexOf('/monitor/ap') === 0 }">
          <router-link to="/monitor/ap">AP</router-link>
        </li>
      </ul>
      <div class="content-main">
        <transition name="fade">
          <router-view :value="value" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import useStyle from '$lib/mixins/use-style';

import style from './css';

export default {
  mixins: [useStyle(style)],
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
};
</script>
