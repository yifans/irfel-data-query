<template>
  <div class="status">
    <el-row>
      <el-col :span="6">
        <el-table :data="tableData">
          <el-table-column label="parameter" prop="parameter"></el-table-column>
          <el-table-column label="value" prop="value"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="18">
        <highstock :options="chartOptions"></highstock>
      </el-col>
    </el-row>
    <!--{{tableData}}-->
    <!--{{chartPVs}}-->
    <!--{{chartOptions}}-->
    <!--<br>-->
    <!--chartData {{chartData}}-->
  </div>
</template>

<script>
// 该组件是一个独立组件，不适用Vuex中的状态
export default {
  name: 'Status',
  data () {
    return {
      chartPVs: [{
        pvName: 'RNG:BEAM:CURR',
        label: 'Beam Current'
      }, {
        pvName: 'RNG:BEAM:LIFE',
        label: 'Life Time'
      }],
      tablePVs: [{
        pvName: 'RNG:BEAM:CURR',
        label: 'Beam Current'
      }, {
        pvName: 'RNG:BEAM:LIFE',
        label: 'Life Time'
      }, {
        pvName: 'RNG:ENG',
        label: 'Energy'
      }, {
        pvName: 'RNG:OPER:MODE',
        label: 'Operation Mode'
      }, {
        pvName: 'RNG:OPER:STAT',
        label: 'Operation Status'
      }],
      chartData: [],
      tableData: [],
      timeRangeSeconds: 60 * 60 * 24,
      pageRefreshTimeout: 10,
      chartOptions: {}
    }
  },
  methods: {
    refreshPage: function () {
      let _this = this
      setTimeout(() => {
        _this.refreshPage()
      }, this.pageRefreshTimeout * 1000)
      this.getChartData()
      this.getTableData()
    },
    getTableData: function () {
      let _this = this
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 1000 * 30)
      let from = start.toISOString()
      let to = end.toISOString()
      let urlHeader = '/retrieval/data/getData.qw'
      let urls = this.tablePVs.map(pv => urlHeader + '?pv=' + pv.pvName +
        '&from=' + from + '&to=' + to + '&fetchLatestMetadata=true')
      var promiseArray = urls.map(url => this.axios.get(url))
      this.axios.all(promiseArray)
        .then(function (result) {
          let gridData = []
          result.map(function (resultItem) {
            let parameterName = resultItem.data[0].meta.name
            let pvData = resultItem.data[0].data
            let value = pvData[pvData.length - 1].val
            value = Math.round(value * 100) / 100
            gridData.push({
              parameter: parameterName,
              value: value
            })
          })
          _this.tableData = gridData
        })
        .catch(function (error) {
          console.log('error', error)
        })
    },
    getChartData: function () {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 1000 * this.timeRangeSeconds)
      let urlHeader = '/retrieval/data/getData.qw'
      let from = start.toISOString()
      let to = end.toISOString()
      let urls = this.chartPVs.map(pv => urlHeader + '?pv=' + pv.pvName + '&from=' + from + '&to=' + to)
      var promiseArray = urls.map(url => this.axios.get(url))
      let chartData = []
      this.axios.all(promiseArray)
        .then(function (result) {
          // console.log('get Data from AA', result)
          result.map(function (resultItem) {
            // let name = resultItem.data[0].meta.name
            chartData.push(resultItem.data[0])
          })
        })
        .catch(function (error) {
          console.log('error', error)
        })
      this.chartData = chartData
    }
  },
  mounted: function () {
    this.refreshPage()
  },
  watch: {
    chartData: function () {
      let rawData = this.chartData
      let config = {
        chart: {
          zoomType: 'xy',
          animation: false
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
        series: rawData.map(function (item) {
          return {
            name: item.meta.name,
            yAxis: item.meta.name,
            data: item.data.map(dataItem => [dataItem.millis, dataItem.val])
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
        yAxis: rawData.map(function (item) {
          return {
            id: item.meta.name,
            opposite: false,
            title: {
              text: item.meta.name
            }
          }
        })
      }
      this.chartOptions = config
    }
  }
}
</script>

<style scoped>

</style>
