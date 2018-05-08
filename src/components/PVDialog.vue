<template>
  <div class="pv-dialog">
    <el-dialog title="Historical Data" :visible.sync="dialogTableVisible" @close="onClose">
      <el-table :data="gridData">
        <el-table-column
          v-for="headerItem in tableHeader"
          v-bind:property="headerItem"
          v-bind:label="headerItem"></el-table-column>
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
    },
    gridData: function () {
      let rawData = this.historicalData
      let rawDataCount = this.historicalData.length
      // console.log('rawData', rawData)
      // console.log('rawData count', rawDataCount)
      let dataLength = rawData.map(dataItem => dataItem.data.length)
      let dataLengthMax = Math.max(...dataLength)
      // console.log('dataLengthMax', dataLengthMax)
      // console.log('datalength', dataLength)
      let gradData = []
      for (let i = 0; i < dataLengthMax; i++) {
        let obj = {}
        for (let j = 0; j < rawDataCount; j++) {
          if (rawData[j]['data'][i] === undefined) {
            obj[rawData[j].meta.name] = ''
            continue
          }
          let newDate = new Date()
          newDate.setTime(rawData[j]['data'][i].millis)
          let time = newDate.toISOString()
          let value = rawData[j]['data'][i].val
          let item = time + ' ' + value
          obj[rawData[j].meta.name] = item
        }
        gradData.push(obj)
      }
      console.log('gradData', gradData)
      return gradData
    },
    tableHeader: function () {
      let rawData = this.historicalData
      let tableHeader = rawData.map(dataItem => dataItem.meta.name)
      return tableHeader
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
      gridData1: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  }
}
</script>

<style scoped>

</style>
