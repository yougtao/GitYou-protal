import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index'
import Article from '@/pages/article/article'
import Login from '@/pages/commons/login'
import Home from '@/pages/repositories/home'
import NewRepository from '@/pages/components/new_repository'
import ImportRepository from '@/pages/components/import_repository'

import Repository from '@/pages/code/frame'
import Branch from '@/pages/code/branch'
import Commit from '@/pages/code/commit'
import Commits from '@/pages/code/commits'
import Branches from '@/pages/code/branches'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/repositories/new',
      name: 'new_repository',
      component: NewRepository
    }, {
      path: '/repositories/import',
      name: 'import_repository',
      component: ImportRepository
    },
    {
      path: '/:username/repositories',
      name: 'home',
      component: Home
    }, {
      path: '/:username/articles',
      name: 'articles',
      component: Article
    }, {
      path: '/:username/:repository',
      name: 'repository',
      component: Repository,
      children: [{
        path: '',
        name: 'branch',
        component: Branch,
        params: {
          branch: 'master'
        }
      }, {
        path: 'branch/:branch',
        name: 'branch',
        component: Branch
      }, {
        path: 'commit/:commit',
        name: 'commit',
        component: Commit
      }, {
        path: 'commits',
        name: 'commits',
        component: Commits
      }, {
        path: 'branches',
        name: 'branches',
        component: Branches
      }]
    }
  ]
})
