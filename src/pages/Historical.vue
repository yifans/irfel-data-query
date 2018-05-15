<template>
  <div class="historical">
    <el-row>
      <el-col :span="4">
        <pv-tree></pv-tree>
      </el-col>
      <el-col :span="20">
        <pv-dialog></pv-dialog>
        <download-dialog></download-dialog>
        <statistics-dialog></statistics-dialog>
        <el-row>
          <pv-chart></pv-chart>
        </el-row>
        <el-row type="flex" justify="center">
          <data-picker></data-picker>
        </el-row>
        <br>
        <el-row type="flex" justify="center">
              <el-button type="primary" @click="draw">Draw Line Chart</el-button>
              <el-button type="primary" @click="statistics">Statistics Data</el-button>
              <el-button type="primary" @click="view">View Data</el-button>
              <el-button type="primary" @click="download">Download Data</el-button>
        </el-row>
        {{selectedPVs}}
        <br>
        <el-row type="flex" justify="center">
          <el-form :inline="true">
            <el-form-item label="Logarithmic">
              <el-switch v-model="logarithmicAxis"></el-switch>
            </el-form-item>
            <el-form-item label="Beam Current">
              <el-switch v-model="showReferencePV"></el-switch>
            </el-form-item>
          </el-form>
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
import DownloadDialog from '../components/DownloadDialog'
import StatisticsDialog from '../components/StatisticsDialog'
import config from '../store/config'

export default {
  name: 'Historical',
  data () {
    return {
      dialogVisible: false,
      logarithmicAxis: false,
      showReferencePV: false
    }
  },
  components: {
    'pv-tree': PVTree,
    'data-picker': DataPicker,
    'pv-chart': PVChart,
    'pv-dialog': PVDialog,
    'download-dialog': DownloadDialog,
    'statistics-dialog': StatisticsDialog
  },
  computed: {
    ...mapState([
      'allPVs',
      'selectedPVs',
      'historicalData',
      'timeRange',
      'logarithmic'
    ])
  },
  methods: {
    ...mapActions([
      'getAllPVs',
      'getHistoricalData'
    ]),
    ...mapMutations([
      'setDialogTableVisible',
      'setDialogDownloadVisible',
      'setDialogStatisticsVisible',
      'setSelectedPVs',
      'setLogarithmic'
    ]),
    draw: function () {
      this.getHistoricalData()
    },
    statistics: function () {
      this.setDialogStatisticsVisible({
        visible: true
      })
    },
    view: function () {
      this.setDialogTableVisible({
        visible: true
      })
    },
    download: function () {
      this.setDialogDownloadVisible({
        visible: true
      })
    }
  },
  mounted: function () {
    this.getAllPVs()
  },
  watch: {
    logarithmicAxis: function () {
      this.setLogarithmic({
        value: this.logarithmicAxis
      })
    },
    showReferencePV: function () {
      let selectedPVsTmp = this.selectedPVs
      if (this.showReferencePV === false) {
        selectedPVsTmp.delete(config.referencePV)
      } else {
        selectedPVsTmp.add(config.referencePV)
      }
      this.setSelectedPVs({
        pvs: selectedPVsTmp
      })
    }
  }
}
</script>

<style scoped>

</style>
