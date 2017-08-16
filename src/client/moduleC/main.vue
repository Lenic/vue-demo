<template>
  <div>
    <div class="container">
      <div>
        <span class="title">Module C:</span>
        <span class="mark">{{now}}</span>
      </div>
      <div>
        <input type="text" :value="inputValue" @keyup="inputChanging">
        <button class="btn-primary" @click="clickHandler">Update With Child Update</button>
      </div>
      <child1 :now="now"></child1>
      <child2 :inputValue="inputValue"></child2>
    </div>
  </div>
</template>

<script>
import useStyle from '$lib/utils/mixins/use-style';

import Child1 from './child1';
import Child2 from './child2';

import style from './css';

export default {
  mixins: [useStyle(style)],
  components: { Child1, Child2 },
  data: () => ({
    inputValue: '0',
    now: Date.now(),
  }),
  methods: {
    clickHandler() {
      this.now = Date.now();
    },
    inputChanging({ target: { value } }) {
      this.inputValue = value;
    },
  },
  beforeUpdate() {
    console.log('Main will update');
  },
  updated() {
    console.log('Main updated');
  },
};
</script>

