<template>
  <div class="home">
    <el-container>
      <el-header class="el-header">
        IRFEL Data Query
        <el-menu  mode="horizontal" router="true">
          <el-menu-item route='/status'>Operation Status</el-menu-item>
          <el-menu-item route='/historical'>Historical Data</el-menu-item>
          <el-menu-item route='/analysis'>Data Analysis</el-menu-item>
          <el-menu-item route='/alarm'>Alarm</el-menu-item>
          <el-menu-item route='/help'>Help</el-menu-item>
        </el-menu>
      </el-header>
      <el-main class="el-main">
        <br/>
        <br/>
        <router-view></router-view>
      </el-main>
      <el-footer class="el-footer">
        nsrl control group
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
