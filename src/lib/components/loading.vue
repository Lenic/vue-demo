<template>
  <div class="loading-container" :style="css">
    <div class="el-loading-mask">
      <div class="el-loading-spinner">
        <svg viewBox="25 25 50 50"
             class="circular">
          <circle cx="50"
                  cy="50"
                  r="20"
                  fill="none"
                  class="path" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    css: {
      type: String,
      default: '',
    },
  },
};
</script>
