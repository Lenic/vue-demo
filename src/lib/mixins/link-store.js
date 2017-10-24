export default function (moduleName, store) {
  return {
    beforeCreate() {
      this.$store.registerModule(moduleName, store);
    },
    destroyed() {
      this.$store.unregisterModule(moduleName);
    },
  };
}
