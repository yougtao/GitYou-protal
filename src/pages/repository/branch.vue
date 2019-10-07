<template>
  <div>
    <div class="content-description">
      <p>{{ repository.description }}</p>
    </div>
    <div class="content-button">
      <el-dropdown class="brand-btn">
        <el-button size="small">
          Branch: {{ repository.curBranch }}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="brand in brands" :key="brand">{{brand}}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-popover class="clone-btn" placement="bottom" title="克隆仓库" width="400" trigger="click">
        <div>
          <el-input readonly v-model="clonePath" size="small" style="margin: 10px 0 20px">
            <el-select v-model="clone" slot="prepend" style="width:110px;">
              <el-option label="Use HTTP" value="HTTP"></el-option>
              <el-option label="Use SSH" value="SSH"></el-option>
            </el-select>
          </el-input>
        </div>
        <el-button slot="reference" type="success" size="small">Clone<i class="el-icon-arrow-down el-icon--right"></i></el-button>
      </el-popover>
    </div>
    <div class="content-title">
      <img/>
      <a class="commit-author" href="javascript:void(0)">{{ repository.user }}</a>
      <a class="commit-content" @click="toCommit(repository.lastCommit.name)" href="javascript:void(0)">{{ repository.lastCommit.message
        }}</a>
      <div class=" commit-info">
        <a class="commit-name" @click="toCommit(repository.lastCommit.name)" href="javascript:void(0)">{{
          repository.lastCommit.name.substring(0,8) }}</a>
        <span class="commit-time">{{ showTime(repository.lastCommit.time) }}</span>
      </div>
    </div>
    <div class="content-code">
      <el-table :data="files" :show-header="false" style="width: 100%" size="small">
        <el-table-column prop="name" width="232" fit="false">
          <template slot-scope="scope">
            <i class="el-icon-document"></i>
            <a href="javascript:void(0)">{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column width="600">
          <template slot-scope="scope">
            <a class="content-code-message" @click="toCommit(scope.row.commit)" href="javascript:void(0)">{{ scope.row.message
              }}</a>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <span>{{ showTime(scope.row.time) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="content-file"></div>
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
          time: '4 days ago'
        },
        curBranch: ''
      },
      brands: [],
      tags: [],
      files: []
    }
  },
  mounted() {
    this.repository.user = this.$route.params.username
    this.repository.name = this.$route.params.repository
    this.repository.curBranch = this.$route.params.branch

    // 获取仓库基本信息
    this.$http.get('/repo/repository/name', {
      params: {
        user: this.repository.user,
        name: this.repository.name,
        branch: this.repository.curBranch
      }
    }).then(({data}) => {
      this.repository.id = data.id
      this.repository.name = data.name
      this.repository.userId = data.userId
      this.repository.user = data.username
      this.repository.description = data.description
      this.repository.type = data.type
      this.repository.language = data.language
      this.repository.createTime = data.createTime
    })

    // 文件列表
    this.fileList(this.repository.user, this.repository.name, '')

    // 最后一次提交
    this.$http.get('/repo/commit/last', {
      params: {
        user: this.repository.user,
        name: this.repository.name
      }
    }).then(({data}) => {
      this.repository.lastCommit = data
    })
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
    fileList(user, name, path) {
      // 获取文件信息
      this.$http.get('/repo/file', {
        params: {
          user: user,
          name: name,
          path: path
        }
      }).then(({data}) => {
        this.files = data
      })
    },
    /* 转到提交 */
    toCommit(name) {
      this.$router.push('/' + this.repository.user + '/' + this.repository.name + '/commit/' + name)
    }
  }
}
</script>

<style scoped>
a {
  text-decoration-line: none;
  color: #0366d6;
}

a:hover {
  text-decoration-line: underline;
  color: #0366d6;
}

button {
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
}

.content-description {
  text-align: left;
}

.content-button {
  margin: 10px 0;
}

.brand-btn {
}

.clone-btn {
  margin-left: 700px;
}

.content-title {
  margin-top: 20px;
  border: 1px solid #c8e1ff;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  padding: 8px;
  background-color: #f1f8ff;
  text-align: left;
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
.content-code {
  border: 1px solid #dfe2e5;
  border-top: none;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}

.content-code-message {
  color: #586069;
}


</style>
