<template>
  <div class="axis-dialog">
    <el-dialog title="Set Axes" :visible.sync="dialogAxisVisible" @close="onClose" width="70%" center>
        <el-transfer
          v-model="value"
          :titles="['all PVs', 'Show Axis']"
          filterable
          @change="handleChange"
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
        this.setTransferData()
        this.initValue()
      }
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
    handleChange (value) {
      let axisPVs = new Set()
      for (let i of value) {
        for (let d of this.transferData) {
          // console.log('i and d', i, d.key, d.label)
          if (d.key === i) {
            axisPVs.add(d.label)
            break
          }
        }
      }
      this.setAxisPVs({
        pvs: axisPVs
      })
    },
    initValue: function () {
      let value = []
      for (let p of this.axisPVs) {
        for (let d of this.transferData) {
          if (d.label === p) {
            value.push(d.key)
            break
          }
        }
      }
      this.value = value
    }
  }
}
</script>

<style scoped>

</style>
