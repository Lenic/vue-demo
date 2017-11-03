import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import ElementUI from 'element-ui';

import login from './login';
import layout from './modules';
import './common/exception';
// import Auth from './common/auth';

import './common/css';

Vue.use(Vuex);
Vue.use(Router);
Vue.use(ElementUI);
Vue.config.productionTip = false;

const router = new Router({ routes: [login, layout] });

// Auth.validate(router);

new Vue({
  router,
  el: '#container',
  render: h => h('router-view'),
  store: new Vuex.Store({
    state: {
      bus: new Vue(),
    },
  }),
});
