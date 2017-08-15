export default {
  namespaced: true,
  state: {
    people: [],
  },
  getters: {
    count: ({ people }) => people.length,
  },
  mutations: {
    set: (state, list) => state.people = list,
  },
  actions: {
    fetch: ({ commit }, api) => {
      api.fetch()
        .then(v => commit('set', v))
        .catch(e => console.error(e));
    },
    clear: ({ commit }) => commit('set', []),
  },
};
