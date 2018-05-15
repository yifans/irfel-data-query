<template>
  <div class="axis-dialog">
    <el-dialog title="Set Axes" :visible.sync="dialogAxisVisible" @close="onClose" width="70%" center>
        <el-transfer
          v-model="value"
          :titles="['all PVs', 'Show Axis']"
          filterable
          :data="transferData"></el-transfer>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AxisDialog',
  data () {
    return {
      value: [],
      transferData: []
    }
  },
  computed: {
    ...mapState([
      'selectedPVs',
      'axisPVs'
    ]),
    dialogAxisVisible: {
      get: function () {
        return this.$store.state.dialogAxisVisible
      },
      set: function () {
        this.setDialogAxisVisible({
          visible: false
        })
      }
    }
  },
  watch: {
    dialogAxisVisible: function () {
      if (this.dialogAxisVisible === true) {
        this.initValue()
        this.setTransferData()
      }
    },
    value: function () {
      let axisPVs = new Set()
      for (let i in this.value) {
        axisPVs.add(this.transferData[i].label)
      }
      this.setAxisPVs({
        pvs: axisPVs
      })
    }
  },
  methods: {
    ...mapMutations([
      'setDialogAxisVisible',
      'setAxisPVs'
    ]),
    onClose: function () {
      this.setDialogAxisVisible({
        visible: false
      })
    },
    setTransferData: function () {
      let selectedPVs = [...this.selectedPVs]
      this.transferData = selectedPVs.map(function (pv, index) {
        return {
          key: index,
          label: pv
        }
      })
    },
    initValue: function () {
      let pvs = [...this.selectedPVs]
      let value = []
      for (let p of this.axisPVs) {
        value.push(pvs.indexOf(p))
      }
      this.value = value
    }
  }
}
</script>

<style scoped>

</style>
