<template>
  <div class="app-wrapper" :class="{ hideSidebar: !isSidebarOpened }">
    <sidebar :menus="menus" class="sidebar-container" :isOpened="isSidebarOpened" />
    <div class="main-container">
      <navbar
        :is-sidebar-opened="isSidebarOpened"
        @toggleSidebar="set({ isSidebarOpened: !isSidebarOpened })"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import linkStore from '$lib/mixins/linkStore';
import { mapDefaultMutations } from '$lib/utils/defaultMutations';

import sidebar from './sidebar';
import navbar from './navbar';
import store from './store';

const moduleName = 'modules';

export default {
  mixins: [linkStore(moduleName, store)],
  components: { sidebar, navbar },
  computed: {
    ...mapState(moduleName, ['isSidebarOpened', 'menus'])
  },
  methods: mapDefaultMutations(moduleName),
  mounted() {
    console.log(this.$route.params);
  }
};
</script>
