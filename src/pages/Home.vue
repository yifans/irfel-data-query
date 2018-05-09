<template>
  <div class="home">
    <el-container>
      <el-header class="el-header">
        <h1 style="text-align:center">HLS-II Data Query</h1>
        <el-menu  mode="horizontal" :router=true>
          <el-menu-item index='status' route='/status'>Operation Status</el-menu-item>
          <el-menu-item index='historical' route='/historical'>Historical Data</el-menu-item>
          <el-menu-item index='analysis' route='/analysis'>Data Analysis</el-menu-item>
          <el-menu-item index='alarm' route='/alarm'>Alarm</el-menu-item>
          <el-menu-item index='help' route='/help'>Help</el-menu-item>
        </el-menu>
      </el-header>
      <el-main class="el-main">
        <br/>
        <br/>
        <router-view></router-view>
      </el-main>
      <el-footer class="el-footer">
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: function () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
