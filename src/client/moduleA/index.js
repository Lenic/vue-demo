export default {
  path: '/module-a',
  component: resolve => require.ensure([], require => resolve(require('./main'))),
};
