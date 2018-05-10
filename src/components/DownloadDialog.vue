<template>
  <div class="download-dialog">
    <el-dialog title="Download Data" :visible.sync="dialogDownloadVisible" @close="onClose">
      <el-row>
        <a v-for="url in urls"
           :key="url.pvName"
           v-bind:href="url.url"
           v-bind:download="url.pvName">
          <el-button type="primary">{{url.pvName}}</el-button>
        </a>
      </el-row>
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
          pvName: this.selectedPVs[i],
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
