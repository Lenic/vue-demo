import _ from 'underscore';

import { mapLazyObject } from '$lib/utils/lazy-object';
import { defaultMutations } from '$lib/utils/default-mutations';

export default {
  namespaced: true,
  state: {
    dataSource: {
      loading: true,
    },
  },
  mutations: defaultMutations,
  getters: mapLazyObject('dataSource', []),
  actions: {
    fetchData: async ({ commit }, api) => {
      commit('set', { dataSource: { loading: true } });

      const { result } = await api.fetch();
      const otherCount = _.chain(result)
        .filter((v, i) => i >= 9)
        .reduce((acc, v) => acc + v.count, 0)
        .value();

      const dataVal = result.slice(0, 9);
      dataVal.push({ address: '其他', count: otherCount });

      const data = {
        yAxis: _.zip(_.map(dataVal, v => v.address), _.map(dataVal, v => v.count)),
        name: '用户数',
        unit: '位',
        type: 'pie',
      };
      commit('set', { dataSource: { data } });
    },
  },
};
