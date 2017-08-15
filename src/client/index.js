import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';

import App from './app';

import routeA from './moduleA';
import routeB from './moduleB';

Vue.use(Vuex);
Vue.use(Router);
Vue.config.productionTip = false;

const defaultRoute = {
  path: '/',
  redirect: '/module-a',
};

const router = new Router({
  routes: [routeA, routeB, defaultRoute],
});

new Vue({
  store: new Vuex.Store(),
  router,
  el: '#container',
  render: h => h(App),
});
