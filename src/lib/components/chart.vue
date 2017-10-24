<template>
  <div ref="container">
  </div>
</template>

<script>
import HighCharts from 'highcharts';

// opts demo:
//
// {
//  "xAxis": [
//   "2017-09-19",
//   "2017-09-20",
//   "2017-09-21",
//   "2017-09-22",
//   "2017-09-23",
//   "2017-09-24",
//   "2017-09-25"
//  ],
//  "yAxis": [
//   34,
//   48,
//   99,
//   46,
//   95,
//   76,
//   25
//  ],
//  "name": "用户数",
//  "unit": "位"
// }

const refreshDefaultConfiguration = opts => ({
  credits: {
    enabled: false,
  },
  chart: {
    type: opts.type,
  },
  title: {
    text: null,
  },
  exporting: {
    enabled: false,
  },
  xAxis: {
    categories: opts.xAxis,
    tickmarkPlacement: 'on',
  },
  yAxis: {
    title: {
      text: opts.name,
    },
    plotLines: [
      {
        value: 0,
        width: 1,
        color: '#808080',
      },
    ],
  },
  tooltip: {
    shared: true,
    valueSuffix: opts.unit,
    crosshairs: true,
  },
  series: [
    {
      name: opts.name,
      data: opts.yAxis,
    },
  ],
});

export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  watch: {
    options() {
      this.updateChart();
    },
  },
  mounted() {
    this.updateChart();
  },
  methods: {
    updateChart() {
      if (!this.options.name) {
        return;
      }

      const config = refreshDefaultConfiguration(this.options);
      HighCharts.chart(this.$refs.container, config);
    },
  },
};
</script>
