export default {
  path: '/login',
  component: resolve => import('./main').then(resolve),
  meta: {
    noAuth: true,
  },
};
