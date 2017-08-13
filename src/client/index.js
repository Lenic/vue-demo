import Vue from 'vue';
import Vuex from 'vuex';

import App from './app';

Vue.use(Vuex);

new Vue({
  el: "#container",
  render: h => h(App)
});
