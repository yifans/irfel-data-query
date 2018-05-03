<template>
  <div class="home">
    <el-container>
      <el-header class="el-header">
        IRFEL Data Query
        <br/>
        <router-link to='/status'>Operation Status</router-link>
        <router-link to='/historical'>Historical Data</router-link>
        <router-link to='/analysis'>Data Analysis</router-link>
        <router-link to='/alarm'>Alarm</router-link>
        <router-link to='/help'>Help</router-link>
      </el-header>
      <el-main class="el-main">
        this is the main part
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
  name: 'Home'
}
</script>

<style scoped>

</style>
