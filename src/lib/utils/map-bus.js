/* eslint-disable no-invalid-this */

import _ from 'underscore';

function mapDefaultEventBus() {
  return this.$store.state.bus;
}

export const mapBus = () => ({
  bus: mapDefaultEventBus,
});

export const mapBusEvent = mapper => {
  return {
    created() {
      _.map(mapper, (v, k) => this.bus.$on(k, this[v]));
    },
    beforeDestroy() {
      _.map(mapper, (v, k) => this.bus.$off(k, this[v]));
    },
  };
};
