<template>
  <div>
    <div class="content-head">
      <div class="content-title group-line">
        <div class="repository-title">
          <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
            <path
                fill-rule="evenodd"
                d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path>
          </svg>
          <a @click="toUser(repository.user)" href="javascript:void(0)">{{ repository.user }}</a>
          <span>/</span>
          <a href="javascript:void(0)" class="repository-name">{{ repository.name }}</a>
        </div>
        <div class="repository-operation">
          <div class="btn-watch btn-wrap">
            <div class="btn-dropdown left">
              <button class="">
                <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
                  <path fill-rule="evenodd"
                        d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path>
                </svg>
                <span>{{watchOptions[attention.watch || 0]}}</span>
              </button>
              <div class="dropmenu-modal">
                <div class="dropmenu-head">
                  <span>Notifications</span>
                </div>
                <ul class="dropmenu-list">
                  <li :class="attention.watch === index ? 'selected':''" v-for="(option, index) in watchOptions">
                    <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
                      <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
                    </svg>
                    <span @click="changeAttention('watch', index)">{{option}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <a class="right" href="javascript:void(0)">{{repository.watch || 0}}</a>
          </div>
          <div class="btn-star btn-wrap">
            <button @click="changeAttention('star', !attention.star)" class="left">
              <svg viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
                <path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path>
              </svg>
              <span>{{attention.star? 'Unstar':'Star'}}</span>
            </button>
            <a class="right" href="javascript:void(0)">{{repository.star || 0}}</a>
          </div>
          <div class="btn-fork btn-wrap">
            <button class="left" :class="(this.user.id == this.repository.userId) || this.attention.fork ? 'disabled': ''">
              <svg viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M8 1a1.993 1.993 0 00-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 002 1a1.993 1.993 0 00-1 3.72V6.5l3 3v1.78A1.993 1.993 0 005 15a1.993 1.993 0 001-3.72V9.5l3-3V4.72A1.993 1.993 0 008 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path>
              </svg>
              <span>Fork</span>
            </button>
            <a class="right" href="javascript:void(0)">{{repository.fork || '0'}}</a>
          </div>
        </div>
      </div>
      <nav>
        <a @click="changeTab('branch')" :class="activeTab === 'branch'?'active':''">
          <svg viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
            <path fill-rule="evenodd" d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z"></path>
          </svg>
          <span>Code</span>
        </a>
        <a @click="changeTab('branches')" :class="activeTab === 'branches'?'active':''">Branches</a>
        <a @click="changeTab('commits')" :class="activeTab === 'commits'?'active':''">Commits</a>
        <a @click="changeTab('issues')" :class="activeTab === 'issues'?'active':''">Issues</a>
        <a v-if="user.username === repository.user" @click="changeTab('repository_settings')"
           :class="activeTab === 'repository_settings'?'active':''">Settings
        </a>
      </nav>
    </div>
    <div class="content-main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import RepositoryHeader from '@/components/Header'
import {getUser} from '../../assets/js/commons'

export default {
  name: 'frame',
  components: {RepositoryHeader},
  data() {
    return {
      activeTab: 'branch',
      repository: {
        user: '',
        name: '',
        curBranch: ''
      },
      attention: {},
      watchOptions: ['Not watching', 'Releases only', 'Watching', 'Ignoring']
    }
  },
  created() {
    if (this.$route.name === 'repository-home' || this.$route.name === 'branch-fileList')
      this.activeTab = 'branch'
    else
      this.activeTab = this.$route.name
    this.repository.user = this.$route.params.username
    this.repository.name = this.$route.params.repository

    this.user = getUser()
    this.repositoryInfo()
  },
  methods: {
    changeTab(tab) {
      if (this.activeTab === tab) return
      switch (tab) {
        case 'branch':
        case 'commits':
          if (this.repository.curBranch === '') return
          this.$router.push({
            name: tab, params: {
              username: this.repository.user,
              repository: this.repository.name,
              branch: this.repository.curBranch
            }
          })
          break
        default:
          this.$router.push({
            name: tab, params: {
              username: this.repository.user,
              repository: this.repository.name
            }
          })
      }
      this.activeTab = tab
    },
    repositoryInfo() {
      this.$http.get('/repo/repository/name', {
        params: {
          user: this.repository.user,
          name: this.repository.name
        }
      }).then(({data}) => {
        this.repository.id = data.id
        this.repository.name = data.name
        this.repository.userId = data.userId
        this.repository.user = data.username
        this.repository.description = data.description
        this.repository.type = data.type
        this.repository.language = data.language
        this.repository.watch = data.watch
        this.repository.star = data.star
        this.repository.fork = data.fork
        if (this.repository.curBranch == null || this.repository.curBranch == '') {
          this.repository.curBranch = data.defaultBranch
        }
        this.repository.createTime = data.createTime

        // 获取关注信息信息
        this.attentionInfo()
      })
    },
    attentionInfo() {
      if (this.user == null || this.user.id == null) return
      this.$http.get('/repo/attention', {
        params: {
          user: this.user.id,
          repository: this.repository.id
        }
      }).then(({data}) => {
        this.attention = data
      })
    },
    changeAttention(type, value) {
      // todo: 如果是fork, 还有更复杂的逻辑
      if (this.user == null || this.user.id == null) {
        this.$router.push({name: 'login'})
      }
      let attention = {user: this.user.id, repository: this.repository.id}
      attention[type] = value
      this.$http.put('/repo/attention/' + type, attention).then(({data}) => {
        if (!data)
          console.log('更新失败!')
        this.attention[type] = value
        if (type == 'star')
          this.repository.star += value ? 1 : -1
        else if (type == 'watch')
          this.repository.watch += value !== 0 ? 1 : -1
        else if (type === 'fork')
          this.repository.fork += value ? 1 : 0
      })
    },
    toUser() {
      this.$router.push('/' + this.repository.user + '/repositories')
    }
  }
}
</script>

<style scoped>

.content-head {
  margin-bottom: 10px;
  border-bottom: 1px solid #e4e7ed;
  padding: 20px 30px 0;
  background-color: #fafbfc;
}

/* content-title*/
.content-title {
  width: 1024px;
  margin: 0 auto 20px;
}

.repository-title {
  display: inline-block;
  text-align: left;
  font-size: 18px;
}

.repository-title svg {
  vertical-align: text-top;
}

.repository-title span {
  font-size: 20px;
}

.repository-title > a {
  color: #0366d6;
}

.repository-name {
  font-weight: 600;
}

.repository-operation {
  display: inline-block;
  user-select: none;
  font-size: 0;
}

.repository-operation > div {
  margin-left: 12px;
}


/* 导航区域*/
.content-head nav {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 1024px;
  margin: 0 auto;
  top: 1px;
}

.content-head nav a {
  display: inline-block;
  box-sizing: border-box;
  margin-right: 16px;
  border: 1px solid transparent;
  border-top: 3px solid transparent;
  border-radius: 3px 3px 0 0;
  padding: 7px 12px 8px;
  line-height: 20px;
  font-size: 14px;
  cursor: pointer;
  color: #586069;
}

.content-head nav a:hover {
  text-decoration-line: none;
}

.content-head nav a.active {
  border-color: #e36209 #e1e4e8 transparent;
  border-bottom: none;
  color: #000;
  background-color: #fff;
}


/* main区域*/
.content-main {
  margin: 0 auto;
  width: 1084px;
  box-sizing: border-box;
  padding: 0 30px;
}

</style>