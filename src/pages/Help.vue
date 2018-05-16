<template>
  <div class="help">
    <br>
    <h1>系统说明</h1>
    该系统用于IRFEL项目历史数据查询与展示，目前使用HLS-II数据进行系统测试。
    <ul>
      <li>后端： 后端采用The EPICS Archiver Appliance进行历史数据采集。</li>
      <li>前端： 前端基于Vue.js2.0开发了单页应用(SPA)。</li>
    </ul>
    <h1>其它</h1>
    <ul>
      <li>如有任何问题，请联系 <a href="mailto:yifans@mail.ustc.edu.cn">yifans@mail.ustc.edu.cn。</a>
        或者 <a href="mailto:gfliu@ustc.edu.cn">gfliu@ustc.edu.cn</a></li>
      <li>代码托管于 <a href="https://github.com/yifans/irfel-data-query">https://github.com/yifans/irfel-data-query</a>。</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Help'
}
</script>

<style scoped>

</style>
