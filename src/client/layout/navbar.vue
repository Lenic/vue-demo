<template>
  <el-menu class="navbar"
           mode="horizontal">
    <hamburger class="hamburger-container"
               @toggleClick="$emit('toggleSidebar')"
               :is-active="isSidebarOpened" />
    <levelbar />
  </el-menu>
</template>

<script>
import Levelbar from './levelbar';
import Hamburger from './hamburger';

export default {
  props: {
    isSidebarOpened: {
      type: Boolean,
      required: true,
    },
  },
  components: { Levelbar, Hamburger },
};
</script>



