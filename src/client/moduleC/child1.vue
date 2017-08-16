<template>
  <div>
    <span class="title">Child 1:</span>
    <span class="mark">{{now}}</span>
  </div>
</template>

<script>
export default {
  props: ['now'],
  beforeUpdate() {
    console.log('Child 1 will update');
  },
  updated() {
    console.log('Child 1 updated');
  },
};
</script>
