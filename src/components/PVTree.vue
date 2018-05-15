<template>
  <div class="tree">
    <el-tree ref='pvtree' :data="pvTree" show-checkbox @check="checkNode"></el-tree>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'PVTree',
  computed: {
    ...mapGetters([
      'pvTree'
    ])
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
