<template>
  <div>
    <span class="title">Child 2:</span>
    <span class="mark">{{inputValue}}</span>
  </div>
</template>

<script>
export default {
  props: ['inputValue'],
  beforeUpdate() {
    console.log('Child 2 will update');
  },
  updated() {
    console.log('Child 2 updated');
  },
};
</script>
