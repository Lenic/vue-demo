export default {
  path: '/module-a',
  component: resolve => import('./main').then(resolve),
};
