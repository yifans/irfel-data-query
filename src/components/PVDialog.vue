<template>
  <div class="pv-dialog">
    <el-dialog :visible.sync="dialogTableVisible" @close="onClose" width="70%" center>
      <el-table :data="gridData" stripe center>
        <el-table-column
          v-for="pv in selectedPVs"
          :key='pv'
          v-bind:property="pv"
          v-bind:label="pv"></el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="currentPage"
        :page-size=pageSize
        :page-sizes="[20, 50, 100, 200]"
        layout="total, sizes, prev, pager, next, jumper"
        :total=dataLengthMax>
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'PVDialog',
  computed: {
    ...mapState([
      'selectedPVs',
      'dialogTableVisible',
      'historicalData'
    ]),
    dialogTableVisible: {
      get: function () {
        return this.$store.state.dialogTableVisible
      },
      set: function () {
        this.setDialogTableVisible({
          visible: false
        })
      }
    }
  },
  methods: {
    ...mapMutations([
      'setDialogTableVisible'
    ]),
    onClose: function () {
      this.setDialogTableVisible({
        visible: false
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    setDataLengthMax: function () {
      let rawData = this.historicalData
      let pvs = this.selectedPVs
      let dataLength = pvs.map(pv => rawData[pv].length)
      let dataLengthMax = Math.max(...dataLength)
      this.dataLengthMax = dataLengthMax
    },
    setGridData: function () {
      let rawData = this.historicalData
      let pvs = this.selectedPVs
      let gridData = []
      let start = (this.currentPage - 1) * this.pageSize
      let end = start + this.pageSize
      for (let i = start; i < end; i++) {
        let obj = {}
        for (let pvIndex in pvs) {
          let pvName = pvs[pvIndex]
          let item = rawData[pvName][i]
          if (item === undefined) {
            obj[pvName] = ''
            continue
          }
          let newDate = new Date()
          newDate.setTime(item.millis)
          let time = newDate.toISOString()
          let value = item.val
          item = time + ' ' + value
          obj[pvName] = item
        }
        gridData.push(obj)
      }
      this.gridData = gridData
    }
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 20,
      gridData: [],
      dataLengthMax: 0
    }
  },
  watch: {
    historicalData: function () {
      this.currentPage = 1
      this.pageSize = 20
      this.setDataLengthMax()
      this.setGridData()
    },
    currentPage: function () {
      this.setGridData()
    },
    pageSize: function () {
      this.setGridData()
    }
  }
}
</script>

<style scoped>

</style>
