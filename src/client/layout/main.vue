<template>
  <div class="app-wrapper"
       :class="{ hideSidebar: !isSidebarOpened }">
    <sidebar :menus="menus"
             class="sidebar-container"
             :isOpened="isSidebarOpened" />
    <div class="main-container">
      <navbar :is-sidebar-opened="isSidebarOpened"
              @toggleSidebar="set({ isSidebarOpened: !isSidebarOpened })" />
      <!-- <app-main></app-main> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import useStyle from '$lib/mixins/use-style';
import linkStore from '$lib/mixins/link-store';
import { mapDefaultMutations } from '$lib/utils/default-mutations';

// import { Navbar, Sidebar, AppMain } from 'views/layout'
import sidebar from './sidebar';
import navbar from './navbar';
import store from './store';

import style from './css';

const moduleName = 'modules';

export default {
  mixins: [linkStore(moduleName, store), useStyle(style)],
  components: { sidebar, navbar },
  computed: {
    ...mapState(moduleName, ['isSidebarOpened', 'menus']),
  },
  methods: mapDefaultMutations(moduleName),
  mounted() {
    console.log(this.$route.params);
  },
};
</script>
