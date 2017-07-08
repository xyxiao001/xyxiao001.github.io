import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }
  ]
})
