<template>
  <div class="download-dialog">
    <el-dialog title="Download Data" :visible.sync="dialogDownloadVisible" @close="onClose">
      <a v-for="url in urls"
         :key="url.pvName"
         v-bind:href="url.url"
         v-bind:download="url.pvName">
        <p align="center">
          <el-button type="primary">{{url.pvName}}</el-button>
        </p>
      </a>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'DownloadDialog',
  data () {
    return {
      urls: []
    }
  },
  computed: {
    ...mapState([
      'selectedPVs',
      'downloadFormat',
      'timeRange'
    ]),
    ...mapGetters([
      'downloadURLs'
    ]),
    dialogDownloadVisible: {
      get: function () {
        return this.$store.state.dialogDownloadVisible
      },
      set: function () {
        this.setDialogDownloadVisible({
          visible: false
        })
      }
    }
  },
  watch: {
    dialogDownloadVisible: function () {
      if (this.dialogDownloadVisible === true) {
        this.urls = this.makeURL()
      }
    }
  },
  methods: {
    ...mapMutations([
      'setDialogDownloadVisible'
    ]),
    onClose: function () {
      this.setDialogDownloadVisible({
        visible: false
      })
    },
    makeURL: function () {
      let urlHeader = '/retrieval/data/getData.' + this.downloadFormat
      if (this.timeRange.length === 0) return []
      let from = this.timeRange[0].toISOString()
      let to = this.timeRange[1].toISOString()
      let urls = []
      for (let pv of this.selectedPVs) {
        urls.push({
          pvName: pv + '.' + this.downloadFormat,
          url: urlHeader + '?pv=' + pv + '&from=' + from + '&to=' + to
        })
      }
      return urls
    }
  }
}
</script>

<style scoped>

</style>
