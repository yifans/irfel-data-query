<template>
  <div class="historical">
    <el-row>
      <el-col :span="4">
        <pv-tree></pv-tree>
      </el-col>
      <el-col :span="20">
        <pv-dialog></pv-dialog>
        <el-row>
          <pv-chart></pv-chart>
        </el-row>
        <el-row>
          <data-picker></data-picker>
        </el-row>
        <br>
        <el-row>
          <el-button type="primary" @click="draw">Draw Line Chart</el-button>
          <el-button type="primary" @click="statistics">Statistics Data</el-button>
          <el-button type="primary" @click="view">View Data</el-button>
          <el-button type="primary" @click="download">Download Data</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import PVTree from '../components/PVTree'
import PVChart from '../components/PVChart'
import DataPicker from '../components/DatePicker'
import PVDialog from '../components/PVDialog'

export default {
  name: 'Historical',
  data () {
    return {
      dialogVisible: false
    }
  },
  components: {
    'pv-tree': PVTree,
    'data-picker': DataPicker,
    'pv-chart': PVChart,
    'pv-dialog': PVDialog
  },
  computed: {
    ...mapGetters([
      'allPVs',
      'historicalData'
    ])
  },
  methods: {
    ...mapActions([
      'getAllPVs',
      'getHistoricalData'
    ]),
    ...mapMutations([
      'setDialogTableVisible'
    ]),
    draw: function () {
      this.getHistoricalData()
    },
    statistics: function () {
      console.log('statistics')
    },
    view: function () {
      console.log('view data')
      this.setDialogTableVisible({
        visible: true
      })
    },
    download: function () {
      console.log('download')
      // window.open('www.baidu.com')
    }
  },
  mounted: function () {
    this.getAllPVs()
  }
}
</script>

<style scoped>

</style>
