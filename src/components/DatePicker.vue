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
      shortcutsConfig: [
        {text: '30s', second: 30},
        {text: '1min', second: 60},
        {text: '5min', second: 60 * 5},
        {text: '1h', second: 60 * 60},
        {text: '8h', second: 60 * 60 * 8},
        {text: '1d', second: 60 * 60 * 24},
        {text: '2d', second: 60 * 60 * 24 * 2},
        {text: '1w', second: 60 * 60 * 24 * 7},
        {text: '1m', second: 60 * 60 * 24 * 30}
      ],
      range: [new Date(new Date().getTime() - 3600 * 1000 * 24), new Date()]
    }
  },
  computed: {
    pickerOptions: function () {
      let shortcuts = this.shortcutsConfig.map(function (configItem) {
        return {
          text: configItem.text,
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 1000 * configItem.second)
            picker.$emit('pick', [start, end])
          }
        }
      })
      return {shortcuts}
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
  },
  mounted: function () {
    this.setTimeRange({
      timeRange: this.range
    })
  }
}
</script>

<style scoped>

</style>
