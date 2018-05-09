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
          <!--<el-button type="primary" @click="draw">Draw Line Chart</el-button>-->
          <el-button type="primary" @click="statistics">Statistics Data</el-button>
          <el-button type="primary" @click="view">View Data</el-button>
          <el-button type="primary" @click="download">Download Data</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
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
    ...mapState([
      'allPVs',
      'historicalData',
      'selectedPVs',
      'timeRange'
    ])
  },
  watch: {
    selectedPVs: function () {
      this.getHistoricalData()
    },
    timeRange: function () {
      this.getHistoricalData()
    }
  },
  methods: {
    ...mapActions([
      'getAllPVs',
      'getHistoricalData'
    ]),
    ...mapMutations([
      'setDialogTableVisible'
    ]),
    statistics: function () {
      console.log('statistics')
    },
    view: function () {
      this.setDialogTableVisible({
        visible: true
      })
    },
    download: function () {
      let urlHeader = '/retrieval/data/getData.csv?'
      let from = this.timeRange[0].toISOString()
      let to = this.timeRange[1].toISOString()
      let urls = this.selectedPVs.map(function (pv) {
        return urlHeader + 'pv=' + pv + '&from=' + from + '&to=' + to
      })
      for (let i in urls) {
        // window.open(urls[i])
        console.log(urls[i])
      }
    }
  },
  mounted: function () {
    this.getAllPVs()
  }
}
</script>

<style scoped>

</style>
