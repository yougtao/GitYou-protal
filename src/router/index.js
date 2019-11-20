import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index'
import UserFrame from '@/pages/userFrame'
import Login from '@/pages/commons/login'
import NewRepository from '@/pages/commons/new_repository'
import ImportRepository from '@/pages/commons/import_repository'

/* Home */
import HomeFrame from '@/pages/HomeFrame'
import Settings from '@/pages/home/settings'
import notifications from '@/pages/home/notifications'
import SettingsProfile from '@/pages/home/settings/settings-Profile'
import SettingsAccount from '@/pages/home/settings/settings-account'
import SettingsSecurity from '@/pages/home/settings/settings-security'
import SettingsEmails from '@/pages/home/settings/settings-emails'
import SettingsNotifications from '@/pages/home/settings/settings-notifications'
import SettingsKeys from '@/pages/home/settings/settings-keys'
import SettingsBlocked from '@/pages/home/settings/settings-blocked'
import SettingsDeveloper from '@/pages/home/settings/settings-developer'

/* User*/
import UserHome from '@/pages/user/frame'
import Overview from '@/pages/user/overview'
import Repositories from '@/pages/user/repositories'
import Articles from '@/pages/user/articles'
import Fragments from '@/pages/fragment/fragments'
import Stars from '@/pages/user/stars'

/* 代码仓库相关 */
import Repository from '@/pages/repository/frame'
import Branch from '@/pages/repository/branch'
import Blob from '@/pages/repository/blob'
import Commit from '@/pages/repository/commit'
import Commits from '@/pages/repository/commits'
import Branches from '@/pages/repository/branches'
import Issues from '@/pages/repository/issues'
import Issue from '@/pages/repository/issue'
import Insights from '@/pages/repository/insights'
import Activity from '@/pages/repository/insights/activity'
import Stargazers from '@/pages/repository/insights/stargazers'
import Watchers from '@/pages/repository/insights/watchers'
import Forks from '@/pages/repository/insights/forks'
import RepositorySettings from '@/pages/repository/settings'

/* Article相关 */

/* Fragment相关 */

Vue.use(Router)

/* /:username子路由*/
const userChildren = [
  {path: '', name: 'user_home', component: Overview},
  {path: 'repositories', name: 'repositories', component: Repositories},
  {path: 'articles', name: 'articles', component: Articles},
  {path: 'fragments', name: 'fragments', component: Fragments},
  {path: 'stars', name: 'stars', component: Stars}
]

/* /:username/:repository子路由 */
const repositoryChildren = [
  {path: '', name: 'repository-home', component: Branch},
  {path: 'branch/:branch', name: 'branch', component: Branch},
  {path: 'branch/:branch/*', name: 'branch-fileList', component: Branch},
  {path: 'blob/:branch/*', name: 'blob-content', component: Blob},
  {path: 'branches', name: 'branches', component: Branches},
  {path: 'commit/:commitId', name: 'commit', component: Commit},
  {path: 'commits/:branch', name: 'commits', component: Commits},
  {path: 'commits', name: 'commits-query', component: Commits},
  {path: 'issues', name: 'issues', component: Issues},
  {path: 'issue/:issue', name: 'issue', component: Issue},
  {
    path: '', component: Insights, children: [
      {path: 'activity', name: 'activity', component: Activity},
      {path: 'stargazers', name: 'stargazers', component: Stargazers},
      {path: 'watchers', name: 'watchers', component: Watchers},
      {path: 'forks', name: 'forks', component: Forks}
    ]
  },
  {path: 'settings', name: 'repository_settings', component: RepositorySettings}
]


const settingsChildren = [
  {path: 'profile', name: 'settings-profile', component: SettingsProfile},
  {path: 'account', name: 'settings-account', component: SettingsAccount},
  {path: 'security', name: 'settings-security', component: SettingsSecurity},
  {path: 'emails', name: 'settings-emails', component: SettingsEmails},
  {path: 'notifications', name: 'settings-notifications', component: SettingsNotifications},
  {path: 'keys', name: 'settings-keys', component: SettingsKeys},
  {path: 'blocked', name: 'settings-blocked', component: SettingsBlocked},
  {path: 'developer', name: 'settings-developer', component: SettingsDeveloper}
]


export default new Router({
  routes: [
    {path: '/', name: 'index', component: Index},
    {path: '/login', name: 'login', component: Login},
    {path: '', component: HomeFrame, children: [
        {path: 'settings', name: 'settings', redirect: 'settings/profile', component: Settings, children: settingsChildren},
        {path: 'notifications', name: 'notifications', component: notifications},
        {path: 'new', name: 'new_repository', component: NewRepository},
        {path: 'import', name: 'import_repository', component: ImportRepository}
      ]
    },
    {path: '/:username', component: UserFrame, children: [
        {path: '', component: UserHome, children: userChildren},
        {path: ':repository', component: Repository, children: repositoryChildren}
      ]
    }
  ]
})
