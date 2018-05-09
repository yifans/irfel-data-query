<template>
  <div class="pvchart">
     <highstock :options="options"></highstock>
    <br>
    <!--{{historicalData}}-->
  </div>
</template>

<script>
import {mapState} from 'vuex'
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
  watch: {
    historicalData: function () {
      // if (JSON.stringify(this.historicalData) === '{}') return {}
      let rawData = this.historicalData
      let config = {
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
        series: this.selectedPVs.map(function (pv) {
          return {
            // name: dataItem.meta.name,
            // data: dataItem.data.map(pvitem => [pvitem.millis, pvitem.val]),
            // yAxis: dataItem.meta.name
            name: pv,
            yAxis: pv,
            data: rawData[pv].map(dataItem => [dataItem.millis, dataItem.val])
          }
        }),
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
        },
        yAxis: this.selectedPVs.map(function (pv) {
          return {
            id: pv,
            opposite: false,
            title: {
              text: pv
            }
          }
        })
      }
      this.options = config
    }
  }
}
</script>

<style scoped>

</style>
