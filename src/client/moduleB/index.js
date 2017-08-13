export default {
  path: '/module-b',
  component: resolve => require.ensure([], require => resolve(require('./main'))),
};
