export default {
  path: 'ap/:type',
  components: {
    default: resolve => import('./main').then(resolve),
    toolbar: resolve => import('../default-toolbar').then(resolve),
  },
};
