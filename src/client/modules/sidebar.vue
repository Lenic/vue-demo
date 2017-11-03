<template>
  <el-menu theme="dark"
           unique-opened
           :collapse="true"
           :default-active="$route.path">
    <div class='menu-wrapper'>
      <router-link :to="item.path"
                   :key="item.path"
                   v-for="item in menus">
        <el-menu-item :index="item.path"
                      class='submenu-title-noDropdown'>
          <i class="iconfont"
                v-html="item.icon" />
          <span>{{item.name}}</span>
        </el-menu-item>
      </router-link>
    </div>
  </el-menu>
</template>

<script>
export default {
  props: {
    isOpened: {
      type: Boolean,
      required: true,
    },
    menus: {
      type: Array,
      required: true,
    },
  },
};
</script>
