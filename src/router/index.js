import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index'
import UserFrame from '@/pages/userFrame'
import Login from '@/pages/commons/login'
import NewRepository from '@/pages/commons/new_repository'
import ImportRepository from '@/pages/commons/import_repository'

import UserHome from '@/pages/home/frame'
import Overview from '@/pages/home/overview'
import Repositories from '@/pages/home/repositories'
import Articles from '@/pages/home/articles'
import Settings from '@/pages/home/settings'
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
import Issue from '@/pages/repository/issue'
import RepositorySettings from '@/pages/repository/settings'

/* Article相关 */

/* Fragment相关 */

Vue.use(Router)

/* /:username子路由*/
const userChildren = [
  {
    path: '',
    name: 'user_home',
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
  }, {
    path: 'settings',
    name: 'settings',
    component: Settings
  }]

/* /:username/:repository子路由 */
const repositoryChildren = [
  {
    path: '',
    name: 'repository-home',
    component: Branch,
    params: {branch: 'master'}
  }, {
    path: 'branch/:branch',
    name: 'branch',
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
    path: 'commits',
    name: 'commits-query',
    component: Commits
  }, {
    path: 'issues',
    name: 'issues',
    component: Issues
  }, {
    path: 'issue/:issue',
    name: 'issue',
    component: Issue
  }, {
    path: 'settings',
    name: 'repository_settings',
    component: RepositorySettings
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
      component: UserFrame,
      children: [
        {
          path: '',
          component: UserHome,
          children: userChildren
        }, {
          path: ':repository',
          component: Repository,
          children: repositoryChildren
        }
      ]
    }
  ]
})
