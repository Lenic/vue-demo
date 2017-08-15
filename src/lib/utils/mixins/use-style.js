export default function (style) {
  return {
    mounted() {
      style.use();
    },
    beforeDestroy() {
      style.unuse();
    },
  };
}
