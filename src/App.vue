<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <keep-alive><router-view/></keep-alive>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
}
</style>
