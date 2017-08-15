export default function (moduleName, store) {
  return {
    beforeCreate() {
      this.$store.registerModule(moduleName, store);
    },
    beforeDestroy() {
      this.$store.unregisterModule(moduleName);
    },
  };
}
