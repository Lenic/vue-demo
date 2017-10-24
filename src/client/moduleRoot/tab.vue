<template>
  <li :class="className">
    <router-link class="switch-btn"
                 :to="path">
      {{title}}
    </router-link>
  </li>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
    },
    path: {
      type: String,
      require: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    isFirst: {
      type: Boolean,
      default: false,
    },
    isLast: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    className() {
      return {
        'first-activity': this.isFirst && this.isSelected,
        'common-activity': this.isSelected && !(this.isFirst || this.isLast),
        'last-activity': this.isLast && this.isSelected,
      };
    },
  },
};
</script>
