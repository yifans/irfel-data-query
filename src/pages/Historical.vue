<template>
  <div class="historical">
    <pv-tree></pv-tree>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PVTree from '../components/PVTree'

export default {
  name: 'Historical',
  components: {
    'pv-tree': PVTree
  },
  computed: {
    ...mapGetters([
      'allPVs'
    ])
  },
  methods: {
    ...mapActions([
      'getAllPVs'
    ])
  },
  mounted: function () {
    this.getAllPVs()
  }
}
</script>

<style scoped>

</style>
