import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';

import App from './app';

import { route as ra, store as moduleA } from './moduleA';
import { route as rb, store as moduleB } from './moduleB';

Vue.use(Vuex);
Vue.use(Router);
Vue.config.productionTip = false;

const store = new Vuex.Store({
  modules: { moduleA, moduleB },
});

const defaultRoute = {
  path: '/',
  redirect: '/module-a',
};

const router = new Router({
  routes: [ra, rb, defaultRoute],
});

new Vue({
  store,
  router,
  el: '#container',
  render: h => h(App),
});
