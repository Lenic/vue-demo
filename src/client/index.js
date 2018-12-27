import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import ElementUI from 'element-ui';

import login from './login';
import layout from './layout';
import Auth from './common/auth';

import '$res';

Vue.use(Vuex);
Vue.use(Router);
Vue.use(ElementUI);
Vue.config.productionTip = false;

const router = new Router({ routes: [login, layout] });

Auth.init(router);

new Vue({
  router,
  el: '#container',
  store: new Vuex.Store(),
  render: h => h('router-view')
});
