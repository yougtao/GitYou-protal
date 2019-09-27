import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index'
import Home from '@/pages/home/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }, {
      path: '/:username',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'overview'
        }
      ]
    }
  ]
})
