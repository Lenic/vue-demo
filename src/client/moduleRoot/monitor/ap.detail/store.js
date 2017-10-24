import _ from 'underscore';
import moment from 'moment';

import { AJAX_DATE_FORMAT } from '~/common';
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
    dateValue: moment().startOf('day').subtract(1, 'days').format(AJAX_DATE_FORMAT),
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
          data: _.map(result, v => ({
            ...v,
            address: `${v.fapAddress}|${v.building}|${v.buildingFloor}|${v.imgName}|${v.secondaryLayArea}`,
          })),
        },
      });
    },
  },
};
