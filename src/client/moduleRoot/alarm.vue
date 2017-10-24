<template>
  <div class="alert_box"
       v-if="isShowAlarm">
    <img :src="require('$res/images/276-192.png')" />
    <el-button @click="cancelAlarm"
               class="primary cancel"
               :loading="isProcessing">
      解除警报
    </el-button>
  </div>
</template>

<script>
import ajax from './config';

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      alarmId: '',
      isShowAlarm: false,
      isProcessing: false,
      alarmApi: ajax({
        url: '/station/alarm',
        stationId: () => this.value,
        status: '0',
        alarmTime: 10,
        page: 1,
        limit: 2,
      }),
      cancelAlarmApi: ajax({
        url: '/station/alarm/cancel',
        alarmId: () => this.alarmId,
      }),
    };
  },
  methods: {
    async cancelAlarm() {
      this.isProcessing = true;
      try {
        await this.cancelAlarmApi.post();

        this.alarmId = '';
        this.isShowAlarm = false;

        this.$message({
          message: '解除成功',
          type: 'success',
        });

        this.resetAlarm();
      } finally {
        this.isProcessing = false;
      }
    },
    resetAlarm() {
      this.__token = setTimeout(async () => {
        const currentHospital = this.value
          , { result } = await this.alarmApi.fetch();

        if (!this.__token || this.isShowAlarm) {
          return;
        }

        if (currentHospital !== this.value) {
          this.resetAlarm();

          return;
        }

        if (result.length > 0) {
          this.isShowAlarm = true;
          this.alarmId = result[0].id;
        } else {
          this.resetAlarm();
        }
      }, 5000);
    },
  },
  mounted() {
    this.resetAlarm();
  },
  beforeDestroy() {
    clearTimeout(this.__token);

    this.__token = null;
  },
};
</script>
