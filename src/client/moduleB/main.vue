<template>
  <div>
    <span>Module B: {{count}}</span>
    <router-link to="/module-a">To A</router-link>
    <table>
      <thead>
        <tr>
          <td>编号</td>
          <td>姓名</td>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.id" v-for="item in people">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <button @click="fetch(dataApi)">Fetch</button>
      <button @click="clear">Clear</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import linkStore from '$lib/utils/mixins/link-store';

import ajax from './config';
import store from './store';

const moduleName = 'moduleB';

export default {
  mixins: [linkStore(moduleName, store)],
  data: () => ({
    dataApi: ajax({
      url: '/users',
      id: Date.now(),
      name: '张三',
    }),
  }),
  computed: {
    ...mapState(moduleName, ['people']),
    ...mapGetters(moduleName, ['count']),
  },
  methods: mapActions(moduleName, ['fetch', 'clear']),
};
</script>
