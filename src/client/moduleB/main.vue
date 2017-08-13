<template>
  <div>
    <span>Module B: {{count}}</span>
    <router-link to="/module-a">To A</router-link>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('moduleB', ['count']),
    ...mapGetters('moduleB', ['doubleCount']),
  },
  methods: mapActions('moduleB', ['increase', 'decrease']),
}
</script>
