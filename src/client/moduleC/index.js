export default {
  path: '/module-c',
  component: resolve => import('./main').then(resolve),
};
