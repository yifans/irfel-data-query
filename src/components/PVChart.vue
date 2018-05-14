<template>
  <div class="pvchart">
     <highstock :options="options" ref="pvChart"></highstock>
    <!--{{options}}-->
    <!--{{historicalData}}-->
  </div>
</template>

<script>
import {mapState} from 'vuex'

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
    ...mapState([
      'selectedPVs',
      'historicalData'
    ])
  },
  mounted: function () {
    this.options = chartDefault
  },
  methods: {
    clearChart: function () {
      let chart = this.$refs.pvChart.chart
      console.log('before clear series')
      while (chart.series.length > 0) {
        console.log('at clear series')
        chart.series[0].remove(true)
      }
      console.log('y length', chart.yAxis.length)
      // while (chart.yAxis.length > 1) {
      //   chart.yAxis[0].remove()
      //   console.log('length after remove', chart.yAxis.length)
      for (let i = chart.yAxis - 1; i > -1; i--) {
        console.log('yAxis', chart.yAxis[i])
        chart.yAxis[i].remove()
      }
    }
  },
  watch: {
    historicalData: function () {
      // if (JSON.stringify(this.historicalData) === '{}') return {}
      this.$forceUpdate()
      let rawData = this.historicalData
      let chart = this.$refs.pvChart.chart
      // remove all series
      // console.log('length before remove', chart.series.length, chart.series)
      // for (let i = 0; i < chart.series.length; i++) {
      //   chart.series[i].remove()
      // }
      // chart.series.map(function (s) {
      //   s.remove()
      // })
      // 使用for和map，remove后series中还会剩下一个一列，原因不明，所以只能采用while
      // while (chart.series.length > 0) {
      //   chart.series[0].remove(true)
      // }
      // for (let i = 0; i < chart.yAxis.length; i++) {
      //   console.log('yAxis', chart.yAxis[i])
      //   chart.yAxis[i].remove()
      // }
      // for (let i = chart.yAxis - 1; i > -1; i--) {
      //   console.log('yAxis', chart.yAxis[i])
      //   chart.yAxis[i].remove()
      // }
      // this.options = this.chartDefault
      // this.clearChart()
      this.options = {}
      this.options = chartDefault

      this.selectedPVs.map(function (pv) {
        // console.log('rawData in chart', rawData[pv])
        if (pv === 'RNG:BEAM:CURR') {
          console.log('add beam yaxis')
          chart.addAxis({
            id: pv,
            opposite: false,
            title: {
              text: pv
            }
          })
          chart.addSeries({
            yAxis: pv,
            name: pv,
            // lineColor: '#FF0000',
            data: rawData[pv].map(dataItem => [dataItem.millis, dataItem.val])
          })
        } else {
          chart.addAxis({
            id: pv,
            opposite: true,
            visible: false,
            title: {
              text: pv
            }
          })
          chart.addSeries({
            yAxis: pv,
            name: pv,
            data: rawData[pv].map(dataItem => [dataItem.millis, dataItem.val])
          })
        }
      })
      // console.log('length after add', chart.series.length, chart.series)
      // chart.redraw()
    }
  }
}
</script>

<style scoped>

</style>
