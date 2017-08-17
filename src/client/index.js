import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';

import App from './app';

import routeA from './moduleA';
import routeB from './moduleB';
import routeC from './moduleC';

// fixed style-loader exception: can't load all style-loader modules.
import './css';

Vue.use(Vuex);
Vue.use(Router);
Vue.config.productionTip = false;

const defaultRoute = {
  path: '/',
  redirect: '/module-a',
};

const router = new Router({
  mode: 'history',
  routes: [routeA, routeB, routeC, defaultRoute],
});

new Vue({
  store: new Vuex.Store(),
  router,
  el: '#container',
  render: h => h(App),
});
