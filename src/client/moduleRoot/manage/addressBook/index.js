export default {
  path: '',
  components: {
    default: resolve => import('./main').then(resolve),
    menu: resolve => import('./menu').then(resolve),
  },
};
