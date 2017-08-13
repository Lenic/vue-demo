export const route = {
  path: '/module-a',
  component: resolve => require.ensure([], require => resolve(require('./main'))),
};

export const store = {
  namespaced: true,
  state: {
    count: 0,
  },
  getters: {
    doubleCount: ({ count }) => count * 2,
  },
  mutations: {
    add: (state, n = 1) => state.count += n,
    sub: (state, n = 1) => state.count -= n,
  },
  actions: {
    increase: ({ commit }, n = 1) => commit('add', n),
    decrease: ({ commit }, n = 1) => commit('sub', n),
  },
};

