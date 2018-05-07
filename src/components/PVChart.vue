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
        title: {
          text: ''
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
