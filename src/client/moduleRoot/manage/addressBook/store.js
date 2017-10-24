import _ from 'underscore';

import { mapLazyObject } from '$lib/utils/lazy-object';
import { defaultMutations } from '$lib/utils/default-mutations';

export default {
  namespaced: true,
  state: {
    deptId: -1,
    parentId: null,
    userName: '',
    regUserId: '',
    currentPageNo: 1,
    total: 0,
    dataSource: {},
  },
  getters: mapLazyObject('dataSource', []),
  mutations: defaultMutations,
  actions: {
    fetchData: async ({ commit }, api) => {
      commit('set', {
        total: 0,
        dataSource: { loading: true },
      });

      const { result, total } = await api.fetch();

      commit('set', {
        dataSource: {
          data: _.map(result, v => ({
            id: v.id,
            stationId: v.stationId,
            userid: v.userid,
            userName: v.userName,
            mobile: v.mobile,
            userPosition: v.userPosition,
            jobnumber: v.jobnumber,
            email: v.email,
            hlDeptId: v.hlDeptId,
            hlDeptName: v.hlDeptName,
            remark: v.remark,
            regUserId: v.regUserId,
            workplace: v.workplace,
          })),
        },
        total: total,
      });
    },
  },
};
