<template>
  <div>
    <div class="search-div content-button group-line">
      <input type="text" placeholder="Find a repository"/>
      <div class="btn-dropdown">
        <button>Type: {{ condition.type }}</button>
        <div class="dropmenu-modal">
          <div class="dropmenu-head">type</div>
          <ul class="dropmenu-list">
            <li :class="condition.type === 'all' ? 'selected':''" @click="conditionType('all')">
              <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
              </svg>
              <span>All</span>
            </li>
            <li :class="condition.type === 'public' ? 'selected':''" @click="conditionType('public')">
              <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
              </svg>
              <span>Public</span>
            </li>
            <li :class="condition.type === 'private' ? 'selected':''" @click="conditionType('private')">
              <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
              </svg>
              <span>Private</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="btn-dropdown">
        <button>Language: {{ condition.language }}</button>
        <div class="dropmenu-modal">
          <div class="dropmenu-head">选择语言: </div>
          <ul class="dropmenu-list">
            <li :class="condition.language === 'all' ? 'selected':''" @click="conditionLanguage('all')">
              <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
              </svg>
              <span>All</span>
            </li>
            <li :class="condition.language === 'java' ? 'selected':''" @click="conditionLanguage('java')">
              <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
              </svg>
              <span>Java</span>
            </li>
            <li :class="condition.language === 'php' ? 'selected':''" @click="conditionLanguage('php')">
              <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
              </svg>
              <span>Php</span>
            </li>
            <li :class="condition.language === 'javascript' ? 'selected':''" @click="conditionLanguage('javascript')">
              <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
              </svg>
              <span>Javascript</span>
            </li>
          </ul>
        </div>
      </div>
      <button class="success">New Repository</button>
    </div>
    <div class="content">
      <el-row class="repo" v-for="(repo,index) in repositories" :key="index">
        <el-col :span="12">
          <div class="repo-title"><h3><a @click="toPage(repo.username, repo.name)" href="javascript:void(0)">{{ repo.name }}</a></h3></div>
          <div class="repo-description"><p>{{ repo.description }}</p></div>
          <div class="repo-info">
            <span v-if="repo.language !==0">
              <span class="repo-language-icon" :style="getColor(repo.language)"></span>
              <span>{{languageName[repo.language]}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </span>
            <span>Update {{showUpdate(repo.updateTime)}}</span>
          </div>
        </el-col>
        <el-col :offset="6" :span="6">
          <div class="btn-star">
            <el-button size="medium" icon="el-icon-star-on">Star</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-pagination v-if="pageInfo.pageNum > 1" background layout="prev, pager, next"
                   :total="pageInfo.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Repositories',
  data() {
    return {
      user: {
        username: ''
      },
      pageInfo: {
        total: 0,
        page: 1,
        pageNum: 0
      },
      condition: {
        search: '',
        type: 'all',
        language: 'all'
      },
      repositories: [],
      languageColors: ['', '#b07219'],
      languageName: ['unknown', 'Java']
    }
  },
  methods: {
    showUpdate(time) {
      let dateBegin = new Date(time)
      let dateEnd = new Date()
      let seconds = (dateEnd - dateBegin) / 1000 // 秒数
      if (seconds < 0) return ' never'
      // 0 - 6分钟 =>just now
      else if (seconds < 600) return 'just now'
      // 6 - 60分钟
      else if (seconds < 3600)
        return Math.round(seconds / 60) + 'mintues ago'

      // 小时计数
      let hours = Math.round(seconds / 3600)
      if (hours < 24) return hours + ' hours ago'
      else if (hours < 24 * 365) return 'on ' + dateBegin.getDate() + ' ' + dateBegin.getMonth()

      console.log(dateBegin)
    },
    getColor(language) {
      if (language < 0 || language >= this.languageColors.length) return 'background-color: #000'
      else return 'background-color: ' + this.languageColors[language]
    },
    conditionType(item) {
      this.condition.type = item
    },
    conditionLanguage(item) {
      this.condition.language = item
    },
    new_repository() {
      this.$router.push({path: '/home/new'})
    },
    toPage(user, name) {
      console.log(user, name)
      this.$router.push('/' + user + '/' + name)
    }
  },
  mounted() {
    this.user.username = this.$route.params.username

    this.$http.get('/repo/repository/page', {
      params: {
        user: this.user.username
      }
    }).then(res => {
      this.repositories = res.data.list
      this.pageInfo.total = res.data.total
      this.pageInfo.pageNum = res.data.pageTotal
    }).catch(res => {
      console.log('获取失败')
    })
  },
  computed: {}
}
</script>

<style scoped>
.search-div {
  border-bottom: 1px solid #e1e4e8;
  padding: 5px 0 15px 0;
}

.search-div > input {
  min-width: 300px;
}

/* content*/
.content {
  margin-bottom: 30px;
}

.repo {
  border-bottom: 1px solid #e1e4e8;
  padding: 18px 10px;
}


.repo-title h3 {
  margin: 0;
  font-weight: 600;
  font-size: 20px;
  text-align: left;
}

.repo-title a {
  text-decoration-line: none;
}

.repo-description {
  text-align: left;
}

.repo-description p {
  font-size: 14px;
}

.repo-info {
  text-align: left;
}

.repo-info span {
  font-size: 12px;
}

.repo-language-icon {
  position: relative;
  top: 1px;
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.btn-star button {
  padding: 8px 12px;
}
</style>