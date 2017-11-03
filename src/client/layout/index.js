export default {
  path: '/',
  component: resolve => import('./main').then(resolve),
};
