import _ from 'underscore';

import { mapLazyObject } from '$lib/utils/lazy-object';
import { defaultMutations } from '$lib/utils/default-mutations';

function convertList(list) {
  return _.map(list, v => ({
    value: v.id,
    label: v.deptName,
    parentId: v.parentId,
    children: v.deptList && convertList(v.deptList),
  }));
}

export default {
  namespaced: true,
  state: {
    dataSource: {},
  },
  mutations: defaultMutations,
  getters: mapLazyObject('dataSource', []),
  actions: {
    fetchData: async ({ commit }, dataApi) => {
      const token = setTimeout(() =>
        commit('set', { dataSource: { loading: true } }), 100);

      const { result } = await dataApi.fetch();

      clearTimeout(token);
      commit('set', {
        dataSource: {
          data: convertList(result.depts),
        },
      });
    },
  },
};
