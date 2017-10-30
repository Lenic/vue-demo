import _ from 'underscore';

import { mapLazyObject } from '$lib/utils/lazy-object';
import { defaultMutations } from '$lib/utils/default-mutations';

export default {
  namespaced: true,
  getState: () => ({
    currentHospital: '',
    hospitals: {
      loading: true,
    },
  }),
  getters: mapLazyObject('hospitals'),
  mutations: defaultMutations,
  actions: {
    fetchData: async ({ commit }, api) => {
      const { result } = await api.fetch();

      commit('set', {
        currentHospital: result.length ? result[0].stationId : '',
      });

      commit('set', {
        hospitals: {
          data: _.map(result, v => ({
            id: v.stationId,
            name: v.stationName,
          })),
        },
      });
    },
  },
};
