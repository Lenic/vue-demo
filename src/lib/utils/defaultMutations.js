import Vue from 'vue';
import _ from 'underscore';
import { mapMutations } from 'vuex';

export const defaultMutations = {
  set: (state, obj) => _.each(obj, (v, k) => Vue.set(state, k, v)),
  setObject: (state, [obj, source]) => _.each(source, (v, k) => Vue.set(obj, k, v))
};

export const mapDefaultMutations = function(moduleName) {
  return mapMutations(moduleName, ['set', 'setObject']);
};
