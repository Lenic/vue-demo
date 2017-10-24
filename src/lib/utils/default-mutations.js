import Vue from 'vue';
import _ from 'underscore';
import { mapMutations } from 'vuex';

export const defaultMutations = {
  set: (state, obj) => _.each(obj, (v, k) => Vue.set(state, k, v)),
};

export const mapDefaultMutations = function (moduleName) {
  return mapMutations(moduleName, ['set']);
};
