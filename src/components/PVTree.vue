<template>
  <div class="tree">
    <el-tree ref='pvtree'
             :data="pvTree"
             show-checkbox
             node-key="pvName"
             :default-checked-keys="defaultCheckedKeys"
             @check="checkNode"></el-tree>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'

export default {
  name: 'PVTree',
  computed: {
    ...mapGetters([
      'pvTree'
    ]),
    ...mapState([
      'selectedPVs'
    ]),
    defaultCheckedKeys: function () {
      let keys = [...this.selectedPVs]
      return keys
    }
  },
  methods: {
    ...mapMutations([
      'setSelectedPVs'
    ]),
    checkNode: function () {
      let nodes = this.$refs.pvtree.getCheckedNodes(true)
      let pvs = new Set()
      for (let i in nodes) {
        // pvs.push(nodes[i]['pvName'])
        pvs.add(nodes[i]['pvName'])
      }
      this.setSelectedPVs({
        pvs
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
