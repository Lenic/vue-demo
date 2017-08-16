export default {
  path: '/module-b',
  component: resolve => require.ensure([], () => resolve(require('./main'))),
};
