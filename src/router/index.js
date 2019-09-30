import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index'
import Article from '@/pages/article/article'
import Home from '@/pages/home/home'
import NewRepository from '@/pages/components/new_repository'
import ImportRepository from '@/pages/components/import_repository'
import Repository from '@/pages/code/nav'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }, {
      path: '/articles',
      name: 'article',
      component: Article
    }, {
      path: '/new_repository',
      name: 'new_repository',
      component: NewRepository
    }, {
      path: '/import_repository',
      name: 'import_repository',
      component: ImportRepository
    }, {
      path: '/:username',
      name: 'home',
      component: Home
    }, {
      path: '/:username/:repository',
      name: 'repository',
      component: Repository
    }
  ]
})
