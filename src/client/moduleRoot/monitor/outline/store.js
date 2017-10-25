import moment from 'moment';

import { AJAX_DATE_FORMAT } from '~/common';
import { mapLazyObject } from '$lib/utils/lazy-object';
import { defaultMutations } from '$lib/utils/default-mutations';

export default {
  namespaced: true,
  state: () => ({
    dateValue: moment().startOf('day').subtract(1, 'days').format(AJAX_DATE_FORMAT),
    dataSource: {
      loading: true,
    },
  }),
  mutations: defaultMutations,
  getters: mapLazyObject('dataSource'),
  actions: {
    fetchData: async ({ commit }, dataApi) => {
      const token = setTimeout(() =>
        commit('set', { dataSource: { loading: true } }), 100);

      const { result } = await dataApi.fetch();

      clearTimeout(token);
      commit('set', { dataSource: { data: result } });
    },
  },
};
