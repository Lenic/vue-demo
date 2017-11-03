<template>
  <div class="app-wrapper"
       :class="{ hideSidebar: !isSidebarOpened }">
    <sidebar :menus="menus"
             class="sidebar-container"
             :isOpened="isSidebarOpened" />
    <div class="main-container">
      <!-- <navbar></navbar>
        <app-main></app-main> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import useStyle from '$lib/mixins/use-style';
import linkStore from '$lib/mixins/link-store';

// import { Navbar, Sidebar, AppMain } from 'views/layout'
import sidebar from './sidebar';
import store from './store';

import style from './css';

const moduleName = 'modules';

export default {
  mixins: [linkStore(moduleName, store), useStyle(style)],
  components: { sidebar },
  computed: {
    ...mapState(moduleName, ['isSidebarOpened', 'menus']),
  },
};
</script>
