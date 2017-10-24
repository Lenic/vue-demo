<template>
  <transition name="fade">
    <loading css="height: 100%;"
             v-if="isLoadingHospitals" />
    <div v-else
         class="main-page">
      <div class="header">
        <img class="logo"
             @click="$router.push('/')"
             :src="require('$res/images/crmlogo_03.gif')" />
        <ul class="nav">
          <tab title="在线用户"
               path="/users"
               :is-first="true"
               :is-selected="currentPath.indexOf('/users') === 0" />
          <tab title="硬件监控"
               path="/monitor"
               :is-selected="currentPath.indexOf('/monitor') === 0" />
          <tab title="收费业务"
               path="/toll"
               v-if="currentHospital === 'HY00781'"
               :is-selected="currentPath.indexOf('/toll') === 0" />
          <tab title="院内管理"
               path="/manage"
               :is-last="true"
               :is-selected="currentPath.indexOf('/manage') === 0" />
        </ul>
        <span class="user_box">
          <span>您好，{{getMobile()}}</span>
          <a class="exit"
             @click="logout">
            退出
          </a>
        </span>
      </div>
      <router-view :value="currentHospital"
                   :hospitals="hospitals"
                   @input="set({currentHospital: arguments[0]})" />
      <!-- <alarm :value="currentHospital" /> -->
    </div>
  </transition>
</template>

<script>
import Cookies from 'js-cookie';
import { mapState, mapGetters, mapActions } from 'vuex';

import Auth from '~/common/auth';
import useStyle from '$lib/mixins/use-style';
import Loading from '$lib/components/loading';
import linkStore from '$lib/mixins/link-store';
import { getLazyObjectNames } from '$lib/utils/lazy-object';
import { mapDefaultMutations } from '$lib/utils/default-mutations';

import Tab from './tab';
import ajax from './config';
import store from './store';
import Alarm from './alarm';

import style from './css';

const moduleName = 'moduleRoot';

export default {
  mixins: [linkStore(moduleName, store), useStyle(style)],
  components: { Tab, Loading, Alarm },
  data: () => ({ dataApi: ajax('/user/station') }),
  computed: {
    ...mapState(moduleName, ['currentHospital']),
    ...mapGetters(moduleName, getLazyObjectNames('hospitals')),
    currentPath() {
      return this.$route.path;
    },
  },
  methods: {
    ...mapDefaultMutations(moduleName),
    ...mapActions(moduleName, ['fetchData']),
    logout() {
      Auth.setAuth();

      this.$router.push('/login');
    },
    getMobile() {
      return Cookies.get('mobile');
    },
  },
  mounted() {
    if (!this.hospitals.length) {
      this.fetchData(this.dataApi);
    }
  },
};
</script>
