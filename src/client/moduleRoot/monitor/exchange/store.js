import { mapLazyObject } from '$lib/utils/lazy-object';
import { defaultMutations } from '$lib/utils/default-mutations';

export default {
  namespaced: true,
  state: {
    total: 1,
    currentPageNo: 1,
    dataSource: {
      loading: true,
    },
  },
  mutations: defaultMutations,
  getters: mapLazyObject('dataSource', []),
  actions: {
    fetchData: async ({ commit, state }, dataApi) => {
      const token = setTimeout(() =>
        commit('set', {
          dataSource: {
            ...state.dataSource,
            loading: true,
          },
        }), 100);

      const { result, total } = await dataApi.fetch();

      clearTimeout(token);
      commit('set', {
        total: parseInt(total),
        dataSource: {
          data: result,
        },
      });
    },
  },
};
