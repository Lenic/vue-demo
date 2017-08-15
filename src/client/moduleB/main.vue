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
import ajax from './config';

export default {
  data: () => ({
    dataApi: ajax({ url: '/users' }),
  }),
  computed: {
    ...mapState('moduleB', ['people']),
    ...mapGetters('moduleB', ['count']),
  },
  methods: mapActions('moduleB', ['fetch', 'clear']),
};
</script>
