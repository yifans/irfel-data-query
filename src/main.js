// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

import VueHighcharts from 'vue-highcharts'
import Highcharts from 'highcharts'
import loadStock from 'highcharts/modules/stock'

loadStock(Highcharts)

Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(VueHighcharts, { Highcharts })

Highcharts.setOptions({
  global: {
    useUTC: false
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
