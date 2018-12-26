export default {
  path: '/',
  name: '首页',
  component: resolve => import('./main').then(resolve)
};
