export default {
  path: '/login',
  component: resolve => import('./main' /* webpackChunkName:"login" */).then(resolve),
  meta: {
    noAuth: true
  }
};
