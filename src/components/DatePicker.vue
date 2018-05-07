<template>
  <div class="datepicker">
    <el-date-picker
      range-separator="to"
      v-model="range"
      :picker-options="pickerOptions"
      type="datetimerange">
    </el-date-picker>
    <br>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: 'DatePicker',
  data () {
    return {
      range: [new Date(new Date().getTime() - 3600 * 1000 * 24), new Date()],
      pickerOptions: {
        shortcuts: [{
          text: '1min',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 1000 * 60)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '1h',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 1000 * 3600)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '1d',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 1000 * 3600 * 24)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '1w',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 1000 * 3600 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {
    ...mapMutations([
      'setTimeRange'
    ])
  },
  watch: {
    range: function () {
      this.setTimeRange({
        timeRange: this.range
      })
    }
  }
  // mounted: function () {
  //   this.setTimeRange({
  //     timeRange: this.range
  //   })
  // }
  // computed: {
  //   timerange () {
  //     return this.$store.state.timeRange
  //   }
  // }
}
</script>

<style scoped>

</style>
