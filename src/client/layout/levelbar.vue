<template>
  <el-breadcrumb separator="/"
                 class="app-levelbar">
    <el-breadcrumb-item :key="item.path"
                        v-for="(item, index) in levelList">
      <span class="no-redirect"
            v-if="index === levelList.length - 1">
        {{item.name}}
      </span>
      <router-link v-else
                   :to="item.path">
        {{item.name}}
      </router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb();
  },
  data() {
    return {
      levelList: null,
    };
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      const first = matched[0];

      if (first && (first.name !== '首页' || first.path !== '')) {
        matched = [{ name: '首页', path: '/' }].concat(matched);
      }

      this.levelList = matched;
    },
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
};
</script>
