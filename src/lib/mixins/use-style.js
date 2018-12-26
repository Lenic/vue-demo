export default function(style) {
  return {
    created() {
      style.use();
    },
    beforeDestroy() {
      style.unuse();
    }
  };
}
