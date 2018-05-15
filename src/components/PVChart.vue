<template>
  <div class="pvchart">
    <!--<highstock :options="pvChartOptions" ref="pvChart"></highstock>-->
    <highstock :options="options"></highstock>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import config from '../store/config'

export default {
  name: 'PVChart',
  data: function () {
    return {
      options: {}
    }
  },
  computed: {
    ...mapGetters([
      'pvChartOptions'
    ])
  },
  mounted: function () {
    this.options = config.chartDefaultConfig
  },
  watch: {
    pvChartOptions: function () {
      this.options = this.pvChartOptions
    }
  }
}
</script>

<style scoped>

</style>
