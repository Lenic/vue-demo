export default {
  path: 'exchange',
  components: {
    default: resolve => import('./main').then(resolve),
    toolbar: resolve => import('../default-toolbar').then(resolve),
  },
};
