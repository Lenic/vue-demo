export default {
  path: 'ap',
  components: {
    default: resolve => import('./main').then(resolve),
    toolbar: resolve => import('../default-toolbar').then(resolve),
  },
};
