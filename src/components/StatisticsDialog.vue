<template>
  <div class="pv-dialog">
    <el-dialog :visible.sync="dialogStatisticsVisible" @close="onClose" width="70%" center>
      statistics
      <el-table :data="gridData" stripe center>
        <el-table-column property="pv" label="PV Name"></el-table-column>
        <el-table-column property="mean" label="Mean"></el-table-column>
        <el-table-column property="deviation" label="Deviation"></el-table-column>
        <el-table-column property="rms" label="RMS"></el-table-column>
        <el-table-column property="max" label="Max"></el-table-column>
        <el-table-column property="min" label="Min"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'StatisticsDialog',
  computed: {
    ...mapState([
      'historicalData',
      'dialogStatisticsVisible'
    ]),
    dialogStatisticsVisible: {
      get: function () {
        return this.$store.state.dialogStatisticsVisible
      },
      set: function () {
        this.setDialogStatisticsVisible({
          visible: false
        })
      }
    }
  },
  methods: {
    ...mapMutations([
      'setDialogStatisticsVisible'
    ]),
    onClose: function () {
      this.setDialogStatisticsVisible({
        visible: false
      })
    },
    getMean: function (arr) {
      if (arr.length === 0) return ''
      return this.getSum(arr) / arr.length
    },
    getSum: function (arr) {
      let sum = 0
      arr.map(function (item) {
        sum += item
      })
      return sum
    },
    getRMS: function (arr) {
      if (arr.length === 0) return ''
      let powList = arr.map(item => Math.pow(item, 2))
      let powListSum = this.getSum(powList)
      let rms = Math.sqrt(powListSum / arr.length)
      return rms
    },
    getDeviation: function (arr) {
      if (arr.length === 0) return ''
      let mean = this.getMean(arr)
      let deviationList = arr.map(item => (item - mean))
      let deviation = this.getRMS(deviationList)
      return deviation
    },
    setGridData: function () {
      let _this = this
      let rawData = this.historicalData
      let gridData = []
      rawData.map(function (dataItem) {
        let dataList = dataItem.data.map(function (data) {
          return data.val
        })
        let pv = dataItem.pvName
        let max = Math.max(...dataList)
        let min = Math.min(...dataList)
        let mean = _this.getMean(dataList)
        let rms = _this.getRMS(dataList)
        let deviation = _this.getDeviation(dataList)
        gridData.push({
          pv,
          max,
          mean,
          rms,
          deviation,
          min
        })
      })
      this.gridData = gridData
    }
  },
  data () {
    return {
      gridData: []
    }
  },
  watch: {
    dialogStatisticsVisible: function () {
      if (this.dialogStatisticsVisible === false) return ''
      this.setGridData()
    }
  }
}
</script>

<style scoped>

</style>
