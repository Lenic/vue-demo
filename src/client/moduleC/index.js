export default {
  path: '/module-c',
  component: resolve => require.ensure([], () => resolve(require('./main'))),
};
