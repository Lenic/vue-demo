import { defaultMutations } from '$lib/utils/default-mutations';

export default {
  namespaced: true,
  state: {
    isSidebarOpened: true,
    menus: [
      {
        path: '/',
        icon: '&#xe926;',
        name: '活动列表',
      },
      {
        path: '/dd',
        icon: '&#xe926;',
        name: '奖品列表',
      },
    ],
  },
  mutations: defaultMutations,
};
