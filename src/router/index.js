import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/Home'
import Status from '@/pages/Status'
import Historical from '@/pages/Historical'
import Analysis from '@/pages/Analysis'
import Alarm from '@/pages/Alarm'
import Help from '@/pages/Help'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      redirect: '/status',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'status',
          name: 'Status',
          component: Status
        },
        {
          path: 'historical',
          name: 'Historical',
          component: Historical
        },
        {
          path: 'analysis',
          name: 'Analysis',
          component: Analysis
        },
        {
          path: 'alarm',
          name: 'Alarm',
          component: Alarm
        },
        {
          path: 'help',
          name: 'Help',
          component: Help
        }
      ]
    }
  ]
})
