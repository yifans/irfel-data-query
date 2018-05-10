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
  computed: {
    ...mapState([
      'selectedPVs',
      'downloadFormat'
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
    },
    urls: function () {
      let urls = []
      for (let i in this.downloadURLs) {
        urls.push({
          pvName: this.selectedPVs[i] + '.' + this.downloadFormat,
          url: this.downloadURLs[i]
        })
      }
      return urls
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
    }
  }
}
</script>

<style scoped>

</style>
