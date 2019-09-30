import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index'
import Article from '@/pages/article/article'
import Home from '@/pages/repositories/home'
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
      path: '/repositories/new',
      name: 'new_repository',
      component: NewRepository
    }, {
      path: '/repositories/import',
      name: 'import_repository',
      component: ImportRepository
    }, {
      path: '/repositories',
      name: 'home',
      component: Home
    }, {
      path: '/repositories/:username/:repository',
      name: 'repository',
      component: Repository
    }
  ]
})
