<template>
  <header class="header">
    <div class="header-inner">
      <div class="box">
        <div class="logo-box" @click="toPages('/')">
          <i class="iconfont icon-github"></i>
        </div>
        <div class="menu-icon" @click="dropMenu = !dropMenu"></div>
        <div class="search-box">
          <input type="text" name="" value="" placeholder="Search All">
        </div>
        <div class="header-menu">
          <ul>
            <li class="menu-item" @click="toPages('/')">首页</li>
            <li class="menu-item" @click="toUserPage('/repositories')">Repositories</li>
            <li class="menu-item" @click="toUserPage('/articles')">Articles</li>
            <li class="menu-item" @click="toPages('/labels')">Labels</li>
            <li class="menu-item">About</li>
          </ul>
        </div>
      </div>
      <div class="icon-box">
        <div class="header-message">
          <a href="javascript:void(0)">
            <svg viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M14 12v1H0v-1l.73-.58c.77-.77.81-2.55 1.19-4.42C2.69 3.23 6 2 6 2c0-.55.45-1 1-1s1 .45 1 1c0 0 3.39 1.23 4.16 5 .38 1.88.42 3.66 1.19 4.42l.66.58H14zm-7 4c1.11 0 2-.89 2-2H5c0 1.11.89 2 2 2z"></path>
            </svg>
          </a>
        </div>
        <div class="header-btn-add dropdown">
          <a class="add" href="javascript:void(0)">
            <svg class="octicon" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z"></path>
            </svg>
          </a>
          <div class="dropdown-box">
            <div class="dropdown-arrow"></div>
            <ul>
              <li @click="toUserPage('new_repository')">New repository</li>
              <li @click="toUserPage('import_repository')">Import repository</li>
              <li @click="toUserPage('new_article')">New article</li>
            </ul>
          </div>
        </div>
        <div v-if="isLogin" class="header-user dropdown">
          <img :src="user.avatar"/>
          <a @click="" href="javascript:void(0)">{{user.username}}</a>
          <div class="dropdown-box">
            <div class="dropdown-arrow"></div>
            <ul>
              <li class="unoptional" @click="toUserPage('user_home')">Sign in as <span class="username">{{user.username}}</span></li>
              <div class="dropdown-divider"></div>
              <li @click="toUserPage('user_home')">我的主页</li>
              <li @click="toUserPage('repositories')">我的仓库</li>
              <li @click="toUserPage('articles')">我的文章</li>
              <li @click="toUserPage('stars')">我的stars</li>
              <div class="dropdown-divider"></div>
              <li @click="toUserPage('settings')">Settings</li>
              <li @click="toUserPage('help')">Help</li>
              <li @click="login('logout')">Sign out</li>
            </ul>
          </div>
        </div>
        <div v-else class="header-login">
          <a @click="login('login')" href="javascript:void(0)">Login</a>
        </div>
      </div>
    </div>
    <div class="drop-menu" v-show="dropMenu">
      <ul>
        <li class="menu-item" @click="toPages('/')">Overview</li>
        <li class="menu-item" @click="toPages('/articles')">Articles</li>
        <li class="menu-item" @click="toPages('/labels')">Labels</li>
        <li class="menu-item">About</li>
      </ul>
    </div>
  </header>
</template>

<script>
import {getUser} from '../assets/js/commons'

export default {
  name: 'Header',
  data() {
    return {
      isLogin: false,
      dropMenu: false,
      user: {
        username: ''
      }
    }
  },
  mounted() {
    this.$http.post('/user/auth/verify').then(({data}) => {
      this.user = data.data
      this.isLogin = true
      this.$http.get('/user/user', {
        params: {
          id: this.user.id
        }
      }).then(({data}) => {
        this.user = data
      })
    }).catch(() => {
      this.user.username = ''
      this.isLogin = false
    })
  },
  beforeUpdate() {
    console.log('Header.beforeUpdate()')
  },
  beforeRouteUpdate(to, from, next) {
    next(vm => {
      console.log('Header.beforeRouteUpdate()')
      if (from.name === 'login') {
        vm._data.user = getUser()
      }
    })

  },
  updated() {
    console.log('header.updated()')
  },
  methods: {
    toPages(route) {
      this.$router.push(route)
    },
    toUserPage(route) {
      console.log('clicked')
      let user = getUser()
      this.user = user
      switch (route) {
        case 'notifications':
        case 'new_repository':
        case 'import_repository':
        case 'new_article':
        case 'settings':
          if (user.username == null || user.username == '')
            this.$router.push({name: 'login'})
          else
            this.$router.push({name: route, params: {username: user.username}})
          break

        case 'user_home':
        case 'repositories':
        case 'articles':
        case 'stars':
          if (user.username == null || user.username == '')
            this.$router.push('')
          else
            this.$router.push({name: route, params: {username: user.username}})
          break
      }
    },
    login(option) {
      if (option === 'logout') {
        this.$http.post('/user/auth/logout').then(({data}) => {
          this.$message.success({message: '退出成功!', duration: 1200})
          this.user = {}
          this.$router.push({name: 'login'})
        })
        return
      }

      // 如果是登录的话
      let user = getUser()
      if (user.username == null || user.username === '') {
        this.$router.push({name: 'login'})
        return
      }
      this.$http.post('/user/auth/verify').then((data) => {
        this.user.id = data.data.id
        this.user.username = data.data.username
      }).catch(() => {
        this.$router.push({name: 'login'})
      })
    }
  }
}
</script>


<style>
@import "../assets/css/commons.css";
</style>
<style scoped>
a {
  color: #fff;
}

a:hover {
  text-decoration-line: none;
}

.header {
  background-color: #24292e;
}

.header-inner {
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.box {
  padding: 9px 0;
  max-width: 1024px;
  display: flex;
  align-items: center;
}

.logo-box {
  margin-right: 15px;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  background: #fff;
  text-align: center;
  line-height: 32px;
  cursor: pointer;
}

.icon-github {
  font-size: 30px;
  position: relative;
  top: 4px;
  /*right: 1px;*/
}

.menu-icon {
  display: none;
  width: 24px;
  height: 24px;
  color: rgba(255, 255, 255, 0.75);
  margin-right: 10px;
  background-image: url(https://avatars1.githubusercontent.com/u/33676932?s=40&v=4);
}

.menu-icon:hover {
  color: #fff;
}

.menu-icon:visited {
  color: #c8c9cb;
}

.search-box input {
  
  box-sizing: border-box;
  height: 30px;
  width: 300px;
  background-color: #3f4448;
  border: 0;
  border-radius: 3px;
  padding: 0 8px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 18px;
}

.search-box:focus {
  outline: none;
}

.header-menu ul {
  display: flex;
  margin: 0;
  padding: 0;
}

.menu-item {
  list-style: none;
  margin-left: 16px;
  line-height: 20px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.menu-item:hover {
  color: #fff;
}

.menu-item:visited {
  color: #c8c9cb;
}

/* 右侧图标 */
.icon-box {
  color: rgba(255, 255, 255, 0.75);
  align-items: center;
  align-self: center;
  display: flex;
  justify-content: space-between; /* 子元素分布方式: 均匀分布*/
  min-width: 160px;
}

/* message*/
.header-message {
  cursor: pointer;
}

.header-message a,
.header-btn-add a {
  font-size: 0;
  vertical-align: middle;
}

.header-btn-add > a:hover {
  color: #e1e4e8;
}

.header-user {
  margin-left: 20px;
  font-size: 0;
}

.header-user img {
  display: inline-block;
  border-radius: 3px;
  height: 24px;
  width: 24px;
  vertical-align: middle;
}

.header-user a {
  margin-left: 5px;
  color: #fff;
  font-size: 16px;
  vertical-align: middle;
}

.header-user .username {
  font-weight: 600;
}

.header-login a:hover {
  color: #fff;
  text-decoration-line: none;
}

.iconfont {
  font-size: 18px;
}

.iconfont:hover {
  color: #fff;
}

/* drop-menu*/
.drop-menu ul {
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: center;
  flex-direction: column;
}

.menu-item {
  list-style: none;
  color: rgba(255, 255, 255, 0.75);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin: 10px 15px;
}

menu-item:hover {
  color: #fff;
}

menu-item:visited {
  color: #c8c9cb;
}
</style>