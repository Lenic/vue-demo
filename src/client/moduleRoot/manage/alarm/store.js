import _ from 'underscore';

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
    mobile: {
      loading: true,
    },
  },
  getters: {
    ...mapLazyObject('mobile', ''),
    ...mapLazyObject('dataSource'),
  },
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
    fetchMobile: async ({ commit }, api) => {
      const token = setTimeout(() =>
        commit('set', { mobile: { loading: true } }), 100);

      const { result } = await api.fetch();

      clearTimeout(token);
      commit('set', { mobile: { data: _.pluck(result, 'mobile').join(',') } });
    },
  },
};
