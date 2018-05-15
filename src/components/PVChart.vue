<template>
  <div class="pvchart">
    <highstock :options="options" ref="pvChart"></highstock>
    {{logarithmic}}
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
// import config from '../store/config'
var chartDefault = {
  chart: {
    zoomType: 'x',
    resetZoomButton: {
      position: {
        // align: 'right', // by default
        // verticalAlign: 'top', // by default
        x: 0,
        y: -30
      },
      relativeTo: 'chart'
    }
  },
  title: {
    text: ''
  },
  credits: {
    // enabled:true,    // 默认值，如果想去掉版权信息，设置为false即可
    text: 'NSRL@USTC', // 显示的文字
    href: 'http://www.nsrl.ustc.edu.cn'
  },
  tooltip: {
    split: false,
    shared: true
  },
  rangeSelector: false,
  legend: {
    enabled: true,
    verticalAlign: 'bottom',
    // layout: 'vertical',
    align: 'middle'
  }
}
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
    ]),
    ...mapState([
      'historicalData',
      'logarithmic'
    ])
  },
  mounted: function () {
    this.options = chartDefault
    // this.options = config.chartDefaultConfig
  },
  watch: {
    pvChartOptions: function () {
      this.options = this.pvChartOptions
      console.log('here is pvChartOptions', this.pvChartOptions)
    }
  }
}
</script>

<style scoped>

</style>
