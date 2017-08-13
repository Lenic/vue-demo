import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';


import App from './app';
import moduleA from './moduleA';
import moduleB from './moduleB';

Vue.use(Vuex);
Vue.use(Router);
Vue.config.productionTip = false;

const defaultRoute = {
  path: '/',
  redirect: '/module-a',
};

const router = new Router({
  routes: [moduleA, moduleB, defaultRoute],
});

new Vue({
  router,
  el: "#container",
  render: h => h(App),
});
