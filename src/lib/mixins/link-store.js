import _ from 'underscore';

export default function (moduleName, store) {
  const resetFunc = _.isFunction(store.state) ? store.state : null;

  return {
    beforeCreate() {
      const currentStore = store;
      if (resetFunc) {
        currentStore.state = resetFunc();
      }

      this.$store.registerModule(moduleName, currentStore);
    },
    destroyed() {
      this.$store.unregisterModule(moduleName);
    },
  };
}
