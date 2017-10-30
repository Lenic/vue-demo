const resetFunc = (vi, store) => true; // eslint-disable-line

export default function (moduleName, store, reset = resetFunc) {
  return {
    beforeCreate() {
      if (store.getState && reset.call(this, this, store)) {
        store.state = store.getState();
      }

      this.$store.registerModule(moduleName, store);
    },
    destroyed() {
      this.$store.unregisterModule(moduleName);
    },
  };
}
