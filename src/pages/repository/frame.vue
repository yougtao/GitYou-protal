<template>
  <div>
    <div class="content-head">
      <div class="content-title">
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
      }
    }
  },
  created() {
    this.activeTab = this.$route.name
    this.repository.user = this.$route.params.username
    this.repository.name = this.$route.params.repository

    this.user = getUser()
  },
  updated() {
    this.activeTab = this.$route.name
    console.log('repository.activeTab: ', this.activeTab)
  },
  methods: {
    changeTab(tab) {
      if (this.activeTab === tab) return

      this.activeTab = tab
      switch (tab) {
        case 'branch':
        case 'commits':
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


    },
    toUser() {
      this.$router.push('/' + this.repository.user + '/repositories')
    }
  }
}
</script>

<style scoped>
a {
  text-decoration-line: none;
  color: #0366d6;
  font-size: 18px;
  font-weight: 500;
}

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
  line-height: 28px;
}

.repository-title {
  text-align: left;
}

.repository-title svg {
  vertical-align: text-top;
}

.repository-title span {
  font-size: 20px;
}

.repository-name {
  font-weight: 600;
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

.content-head a:hover {
  color: #000;
  text-decoration-line: none;
}

.content-head a.active {
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