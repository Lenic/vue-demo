export default {
  path: '/module-a',
  component: resolve => require.ensure([], () => resolve(require('./main'))),
};
