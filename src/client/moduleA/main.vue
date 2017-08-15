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

import style from './css';

export default {
  computed: mapGetters('moduleA', ['doubleCount']),
  methods: mapActions('moduleA', ['increase', 'decrease']),
  mounted() {
    style.use();
  },
  beforeDestroy() {
    style.unuse();
  },
};
</script>
