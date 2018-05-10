<template>
  <div class="pvchart">
     <highstock :options="options" ref="pvChart"></highstock>
    {{b}}
    <!--<br>-->
    <!--{{historicalData}}-->
  </div>
</template>

<script>
import {mapState} from 'vuex'

var chartDefault = {
  chart: {
    zoomType: 'xy'
  },
  title: {
    text: ''
  },
  credits: {
    // enabled:true,    // 默认值，如果想去掉版权信息，设置为false即可
    text: 'NSRL@USTC', // 显示的文字
    href: 'http://www.nsrl.ustc.edu.cn'
  },
  rangeSelector: false,
  legend: {
    enabled: true,
    verticalAlign: 'bottom',
    // layout: 'vertical',
    align: 'middle'
  },
  xAxis: {
    title: {
      text: 'Time'
    },
    type: 'datetime'
  }
}
export default {
  name: 'PVChart',
  data: function () {
    return {
      b: 1,
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
    console.log('haha')
    this.options = chartDefault
  },
  watch: {
    historicalData: function () {
      // if (JSON.stringify(this.historicalData) === '{}') return {}
      let rawData = this.historicalData
      let chart = this.$refs.pvChart.chart
      // remove all series
      console.log('length before remove', chart.series.length, chart.series)
      // for (let i = 0; i < chart.series.length; i++) {
      //   chart.series[i].remove()
      // }
      // chart.series.map(function (s) {
      //   s.remove()
      // })
      // 使用for和map，remove后series中还会剩下一个一列，原因不明，所以只能采用while
      while (chart.series.length > 0) {
        chart.series[0].remove(true)
      }
      // console.log('length after remove', chart.series.length, chart.series)
      this.selectedPVs.map(function (pv) {
        chart.addSeries({
          id: pv,
          name: pv,
          data: rawData[pv].map(dataItem => [dataItem.millis, dataItem.val])
        }, false)
      })
      // console.log('length after add', chart.series.length, chart.series)
      chart.redraw()
    }
  }
}
</script>

<style scoped>

</style>
