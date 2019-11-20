<template>
  <div>
    <div class="content-description">
      <p>{{ repository.description }}</p>
    </div>
    <div class="content-button group-line">
      <div class="left">
        <div class="btn-dropdown">
          <button>Branch: {{ curBranch }}</button>
          <div class="dropmenu-modal">
            <div class="dropmenu-head">选择 Branches/tags</div>
            <div>
              <div class="dropmenu-filters">
                <div class="text-filter">
                  <input type="text"/>
                </div>
                <div class="tabs-filter">
                  <ul>
                    <li class="active">Branches</li>
                    <li>Tags</li>
                  </ul>
                </div>
              </div>
              <ul class="dropmenu-list">
                <li :class="curBranch === branch.name ? 'selected':''" @click="curBranch = branch.name" v-for="branch in branches"
                    :key="branch.name">
                  <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
                  </svg>
                  <span>{{branch.name}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <button>New pull request</button>
      </div>
      <div class="right">
        <el-popover class="clone-btn" placement="bottom" title="克隆仓库" width="400" trigger="click">
          <div>
            <el-input readonly v-model="clonePath" size="small" style="margin: 10px 0 20px;user-select: all">
              <el-select v-model="clone" slot="prepend" style="width:110px;">
                <el-option label="Use HTTP" value="HTTP"></el-option>
                <el-option label="Use SSH" value="SSH"></el-option>
              </el-select>
            </el-input>
          </div>
          <el-button slot="reference" type="success" size="small">Clone<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        </el-popover>
      </div>
    </div>
    <div class="content-title">
      <div>
        <img/>
        <a class="commit-author" @click="toCommits(repository.user)" href="javascript:void(0)">{{ repository.user }}</a>
        <a class="commit-content" @click="toCommit(repository.lastCommit.commit)" href="javascript:void(0)">{{ repository.lastCommit.message
          }}</a>
      </div>
      <div class="commit-info">
        <a class="commit-name" @click="toCommit(repository.lastCommit.commit)" href="javascript:void(0)">{{
          repository.lastCommit.commit }}</a>
        <span class="commit-time">{{ showTime(repository.lastCommit.time) }}</span>
      </div>
    </div>
    <div class="content-files">
      <table>
        <tbody>
        <tr v-if="repository.curPath !=''">
          <td class="file-name">
            <i class="el-icon-folder"></i>
            <a @click="toFolder('..')" href="javascript:void(0)">..</a>
          </td>
        </tr>
        <tr v-for="file in files" :key="file.name">
          <td class="file-name">
            <template v-if="file.folder">
              <i class="el-icon-folder"></i>
              <a @click="toFolder(file.name)" href="javascript:void(0)">{{ file.name }}</a>
            </template>
            <template v-else>
              <i class="el-icon-document"></i>
              <a @click="toFile(file.name)" href="javascript:void(0)">{{ file.name }}</a>
            </template>
          </td>
          <td class="file-commit-message">
            <a @click="toCommit(file.commit)" href="javascript:void(0)">{{ file.message }}</a>
          </td>
          <td class="file-commit-time">
            <span>{{ showTime(file.time) }}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="content-code"></div>
  </div>
</template>

<script>
export default {
  name: 'branch',
  data() {
    return {
      clone: 'HTTP',
      repository: {
        id: 0, name: '',
        userId: 0, user: '',
        description: '',
        type: 0, language: 0,
        lastCommit: {
          name: '',
          message: '',
          time: ''
        },
        curPath: ''
      },
      curBranch: '',  // 不要在vue中使用深度watch
      branches: [],
      tags: [],
      files: []
    }
  },
  created() {
    this.curBranch = this.$parent.repository.curBranch
  },
  mounted() {
    this.repository.user = this.$route.params.username
    this.repository.name = this.$route.params.repository
    this.repository.id = this.$parent.repository.id
    if (this.$parent.repository.curBranch !== '')
      this.repository.curBranch = this.$parent.repository.curBranch

    const pathMatch = this.$route.params.pathMatch
    if (pathMatch != null)
      this.repository.curPath = pathMatch

    // 获取仓库基本信息
    this.repositoryInfo()

    // 获取branch列表
    this.branchList()
  },
  watch: {
    curBranch: {
      handler() {
        if (this.curBranch === null || this.curBranch === '') return
        this.$parent.repository.curBranch = this.curBranch
        if (this.$parent.repository.curBranch !== this.curBranch)
          this.$router.push({name: this.$route.name, params: {branch: this.curBranch}})
        this.fileList(this.repository.curPath)
      },
      immediate: true
    }
  },
  computed: {
    clonePath() {
      if (this.clone === 'HTTP') return 'http://gityou.com/' + this.repository.username + '/' + this.repository.name + '.git'
      else if (this.clone === 'SSH') return 'git@gityou.com:' + this.repository.username + '/' + this.repository.name + '.git'
    },
    showTime() {
      const Day = ['周末', '周一', '周二', '周三', '周四', '周五', '周六']
      const Month = ['jan', 'feb', '三月', '四月', '五月', 'June', 'July', '八月', '九月', 'Oct', '十一月', '十二月']
      return (time) => {
        let dateBegin = new Date(time * 1000)
        let dateEnd = new Date()
        let seconds = (dateEnd - dateBegin) / 1000 // 秒数
        if (seconds < 0) return ' never'
        // 0 - 6分钟 =>just now
        else if (seconds < 600) return 'just now'
        // 6 - 60分钟
        else if (seconds < 3600)
          return Math.floor(seconds / 60) + 'mintues ago'

        // 小时计数
        let hours = Math.floor(seconds / 3600)
        if (hours < 24) return hours + ' 小时前'

        // 天
        const days = dateEnd.getDate() - dateBegin.getDate()
        if (days == 1) return '昨天'
        else if (days == 2) '前天'

        if (days < 7) {
          const day = dateEnd.getDay() - (dateBegin.getDay() === 0 ? 7 : dateBegin.getDay())
          if (day < 0) return '上' + Day[dateBegin.getDay()]
          else return Day[dateBegin.getDay()]
        } else if (days < 30) return days + ' 天前'

        // 年
        if (days > 365) return (dateEnd.getFullYear - dateBegin.getFullYear()) + ' 年前'

        // 月
        const months = dateEnd.getMonth() - dateBegin.getMonth()
        if (months <= 0) return '去年' + Month[dateBegin.getMonth()]
        else return months + ' 个月前'
      }
    }
  },
  methods: {
    switchClone() {
      if (this.clone === 'HTTP') this.repository.clone = this.repository.cloneHTTP
      else if (this.clone === 'SSH') this.repository.clone = this.repository.cloneSSH
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
        if (this.curBranch == null || this.curBranch == '') {
          this.$parent.repository.curBranch = data.defaultBranch
          this.curBranch = data.defaultBranch
        }
        this.repository.createTime = data.createTime
      })
    },
    // 获取文件列表
    fileList(path) {
      this.$http.get('/repo/file/list', {
        params: {
          user: this.repository.user,
          name: this.repository.name,
          branch: this.curBranch,
          path: path
        }
      }).then(({data}) => {
        this.files = data
        // 查找最近的一次提交
        let lastTime = 0
        let lastCommit = -1
        for (let i = 0; i < data.length; i++) {
          if (data[i].time > lastTime) {
            lastTime = data[i].time
            lastCommit = i
          }
        }
        this.repository.lastCommit = data[lastCommit]
      })
    },
    branchList() {
      this.$http.get('/repo/branch/list', {
        params: {
          user: this.repository.user,
          name: this.repository.name
        }
      }).then(({data}) => {
        this.branches = data
      })
    },
    /* 转到提交 */
    toCommit(name) {
      this.$router.push('/' + this.repository.user + '/' + this.repository.name + '/commit/' + name)
    },
    toCommits(user) {
      this.$router.push({
        path: '/' + this.repository.user + '/' + this.repository.name + '/commits/' + this.repository.curBranch,
        query: {author: user}
      })
    },
    toFolder(folder) {
      let baseUrl = '/' + this.repository.user + '/' + this.repository.name + '/branch/' + this.repository.curBranch + '/'
      if (folder == '..') {
        const index = this.repository.curPath.lastIndexOf('/')
        this.repository.curPath = this.repository.curPath.substring(0, index == undefined ? 0 : index)
      } else {
        if (this.repository.curPath == '')
          this.repository.curPath += folder
        else
          this.repository.curPath += '/' + folder
      }
      this.$router.replace(baseUrl + this.repository.curPath)
      // 切换文件列表
      this.fileList(this.repository.curPath)

    },
    toFile(file) {
      const base = '/' + this.repository.user + '/' + this.repository.name + '/blob/' + this.repository.curBranch
      if (this.repository.curPath === '')
        this.$router.push(base + '/' + file)
      else
        this.$router.push(base + '/' + this.repository.curPath + '/' + file)
    }
  }
}
</script>

<style scoped>
a {
  color: #0366d6;
}

.content-description {
  text-align: left;
  font-size: 16px;
  font-weight: 500;
}

.content-button {
  margin: 20px 0;
}

.clone-btn {
}

.content-title {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  border: 1px solid #c8e1ff;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  padding: 8px;
  background-color: #f1f8ff;
}

.content-title span {
  margin: 0 5px;
}

.commit-author {
  margin-right: 10px;
}

.commit-content {
  font-size: 13px;
  color: #586069;
}

.commit-info {
  float: right;
  font-size: 13px;
  font-weight: 400;
}

/* content-repository */
.content-files {
  border: 1px solid #dfe2e5;
  border-top: none;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}

.content-files table {
  width: 100%;
  font-size: 14px;
  border-collapse: collapse;
  border-spacing: 0;
}

.content-files tr:hover {
  background-color: #f6f8fa;
}

.content-files tr:first-child td {
  border: none;
}

.content-files td {
  padding: 5px 10px;
  border-top: 1px solid #dfe2e5;
  border-left: none;
  border-right: none;
}


.file-name {
  width: 220px;
  text-align: left;
}

.file-commit-message {
  text-align: left;
}

.file-commit-time {
  text-align: right;
}

.file-commit-message a {
  color: #586069;
}

.file-commit-message a:hover {
  color: #0366d6;
}


</style>
