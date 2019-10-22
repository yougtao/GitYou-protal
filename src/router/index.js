import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index'
import Login from '@/pages/commons/login'
import NewRepository from '@/pages/commons/new_repository'
import ImportRepository from '@/pages/commons/import_repository'

import HomeFrame from '@/pages/home/frame'
import Overview from '@/pages/home/overview'
import Repositories from '@/pages/home/repositories'
import Articles from '@/pages/home/articles'
import Fragments from '@/pages/fragment/fragments'
import Stars from '@/pages/star/stars'

/* 代码仓库相关 */
import Repository from '@/pages/repository/frame'
import Branch from '@/pages/repository/branch'
import Blob from '@/pages/repository/blob'
import Commit from '@/pages/repository/commit'
import Commits from '@/pages/repository/commits'
import Branches from '@/pages/repository/branches'
import Issues from '@/pages/repository/issues'
import Settings from '@/pages/repository/settings'

/* Article相关 */

/* Fragment相关 */

Vue.use(Router)

/* repository子路由 */
const repositoryChildren = [
  {
    path: '',
    name: 'repository-home',
    component: Branch,
    params: {branch: 'master'}
  }, {
    path: 'branch/:branch',
    name: 'repository-branch',
    component: Branch
  }, {
    path: 'branch/:branch/*',
    name: 'branch-fileList',
    component: Branch
  }, {
    path: 'blob/:branch/*',
    name: 'blob-content',
    component: Blob
  }, {
    path: 'commit/:commitId',
    name: 'commit',
    component: Commit
  }, {
    path: 'branches',
    name: 'branches',
    component: Branches
  }, {
    path: 'commits/:branch',
    name: 'commits',
    component: Commits
  }, {
    path: 'issues',
    name: 'issues',
    component: Issues
  }, {
    path: 'settings',
    name: 'settings',
    component: Settings
  }]


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
      path: '/repository/new',
      name: 'new_repository',
      component: NewRepository
    }, {
      path: '/repository/import',
      name: 'import_repository',
      component: ImportRepository
    }, {
      path: '/:username',
      component: HomeFrame,
      children: [{
        path: '',
        name: 'overview',
        component: Overview
      }, {
        path: 'repositories',
        name: 'repositories',
        component: Repositories
      }, {
        path: 'articles',
        name: 'articles',
        component: Articles
      }, {
        path: 'fragments',
        name: 'fragments',
        component: Fragments
      }, {
        path: 'stars',
        name: 'stars',
        component: Stars
      }]
    }, {
      path: '/:username/:repository',
      name: 'repository',
      component: Repository,
      children: repositoryChildren
    }
  ]
})
