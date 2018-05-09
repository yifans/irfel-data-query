<template>
  <div class="pv-dialog">
    <el-dialog title="Historical Data" :visible.sync="dialogTableVisible" @close="onClose">
      <el-table :data="gridData">
        <el-table-column
          v-for="pv in selectedPVs"
          :key='pv'
          v-bind:property="pv"
          v-bind:label="pv"></el-table-column>
      </el-table>
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
    }
  },
  data () {
    return {
      gridData: []
    }
  },
  watch: {
    historicalData: function () {
      console.log('historical Data', this.historicalData)
      let rawData = this.historicalData
      let pvs = this.selectedPVs
      let dataLength = pvs.map(pv => rawData[pv].length)
      let dataLengthMax = Math.max(...dataLength)
      let gridData = []
      for (let i = 0; i < dataLengthMax; i++) {
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
      console.log('grid after for each', gridData)
      this.gridData = gridData
    }
  }
}
</script>

<style scoped>

</style>
