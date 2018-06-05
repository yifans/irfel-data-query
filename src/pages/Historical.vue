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
        <axis-dialog></axis-dialog>
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
              <el-button type="primary" @click="axis">Set Axes</el-button>
        </el-row>
        <br>
        <!--{{selectedPVs}}-->
        <!--<br>-->
        <!--{{axisPVs}}-->
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
import AxisDialog from '../components/AxisDialog'
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
    'statistics-dialog': StatisticsDialog,
    'axis-dialog': AxisDialog
  },
  computed: {
    ...mapState([
      'allPVs',
      'selectedPVs',
      'axisPVs',
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
      'setAxisPVs',
      'setDialogTableVisible',
      'setDialogDownloadVisible',
      'setDialogStatisticsVisible',
      'setDialogAxisVisible',
      'setSelectedPVs',
      'setLogarithmic'
    ]),
    draw: function () {
      this.initAxisPVs()
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
    },
    axis: function () {
      this.setDialogAxisVisible({
        visible: true
      })
    },
    initAxisPVs: function () {
      // 初始化坐标轴，有参考pv，则放参考pv和除去它的第一个；没有参考pv，就放第一个
      let pvs = [...this.selectedPVs]
      let axisPVs = new Set()
      if (this.selectedPVs.has(config.referencePV)) {
        if (pvs[0] === config.referencePV) {
          axisPVs.add(pvs[0])
          axisPVs.add(pvs[1])
        } else {
          axisPVs.add(pvs[0])
          axisPVs.add(config.referencePV)
        }
      } else {
        axisPVs.add(pvs[0])
      }
      this.setAxisPVs({
        pvs: axisPVs
      })
    }
  },
  created: function () {
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
