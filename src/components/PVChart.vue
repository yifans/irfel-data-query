<template>
  <div class="pvchart">
     <highstock :options="options"></highstock>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'PVChart',
  computed: {
    ...mapGetters([
      'historicalData'
    ]),
    options: function () {
      let rawData = this.historicalData
      return {
        chart: {
          zoomType: 'xy',
          resetZoomButton: {
            position: {
              // align: 'right', // by default
              // verticalAlign: 'top', // by default
              // x: 500,
              // y: 500
            }
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
        rangeSelector: false,
        series: rawData.map(function (dataItem) {
          // console.log('dataitem', dataItem)
          return {
            name: dataItem.meta.name,
            data: dataItem.data.map(pvitem => [pvitem.millis, pvitem.val]),
            yAxis: dataItem.meta.name
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
        yAxis: rawData.map(function (dataItem) {
          return {
            id: dataItem.meta.name,
            opposite: false,
            title: {
              text: dataItem.meta.name
            }
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
