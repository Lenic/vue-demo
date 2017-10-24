import { mapLazyObject } from '$lib/utils/lazy-object';
import { defaultMutations } from '$lib/utils/default-mutations';

export default {
  namespaced: true,
  state: {
    total: 1,
    title: '',
    currentPageNo: 1,
    dataSource: {
      loading: true,
    },
  },
  getters: mapLazyObject('dataSource'),
  mutations: defaultMutations,
  actions: {
    fetchData: async ({ commit, state }, api) => {
      const token = setTimeout(() =>
        commit('set', {
          dataSource: {
            ...state.dataSource,
            loading: true,
          },
        }), 100);

      const { result, total } = await api.fetch();

      clearTimeout(token);
      commit('set', {
        total: parseInt(total),
        dataSource: {
          data: result,
        },
        isButtonLoading: false,
      });
    },
  },
};
