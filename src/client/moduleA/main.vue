<template>
  <div>
    <div>Module A</div>
    <span>doubleCount:</span>
    <span>{{doubleCount}}</span>
    <button @click="increase()">+</button>
    <button @click="decrease()">-</button>
    <div>
      <router-link to="/module-b">To B</router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

import linkStore from '$lib/utils/mixins/link-store';
import useStyle from '$lib/utils/mixins/use-style';

import style from './css';
import store from './store';

const moduleName = 'moduleA';

export default {
  mixins: [linkStore(moduleName, store), useStyle(style)],
  computed: mapGetters(moduleName, ['doubleCount']),
  methods: mapActions(moduleName, ['increase', 'decrease']),
};
</script>
