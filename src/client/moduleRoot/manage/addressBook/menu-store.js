import _ from 'underscore';

import { mapLazyObject } from '$lib/utils/lazy-object';
import { defaultMutations } from '$lib/utils/default-mutations';

function convertList(list) {
  return _.map(list, v => ({
    id: v.id,
    name: v.deptName,
    deptUserCount: v.deptUserCount,
    label: `${v.deptName}(${v.deptUserCount}人)`,
    parentId: v.parentId,
    details: convertList(v.deptList || []),
  }));
}

export default {
  namespaced: true,
  state: {
    showOrg: false,
    deptName: null,
    dataSource: {},
    stationName: null,
    originalDeptName: null,
    hospUserCount: -1,
  },
  mutations: defaultMutations,
  getters: mapLazyObject('dataSource', []),
  actions: {
    fetchData: async ({ commit, state }, dataApi) => {
      commit('set', {
        showOrg: true,
        originalDeptName: state.deptName,
      });

      const token = setTimeout(() =>
        commit('set', { dataSource: { loading: true } }), 100);

      const { result } = await dataApi.fetch();

      clearTimeout(token);
      commit('set', {
        hospUserCount: result.hospUserCount,
        stationName: result.stationName,
        dataSource: {
          data: convertList(result.depts),
        },
      });
    },
  },
};
