<template>
  <div>
    <div class="content-brief">
      <div class="brief-commit">
        <span class="brief-commit-title">{{commit.message}}</span>
        <span v-if="commit.content!==''" class="brief-commit-full">{{commit.content}}</span>
      </div>
      <div class="brief-title">
        <a @click="toCommit(commit.author)" href="javascript:void(0)" class="brief-title-author">{{commit.author}}</a>
        <a @click="toBranch(repository.curBranch)" href="javascript:void(0)" class="brief-title-branch">{{repository.curBranch}}</a>
        <span class="brief-title-time">提交于 {{showTime(commit.time)}}</span>
      </div>
    </div>
    <div class="brief-stat">
      <span>更改了{{fileList.length}}个文件, </span>
      <span class="color-add">++{{additionsNum}} </span>行,
      <span class="color-delete">--{{deletionsNum}} </span>行
    </div>
    <div class="content-files">
      <div class="content-file" v-for="file in fileList" :key="file.path">
        <div class="file-title">
          <a @click="showFile(file)" href="javascript:void(0)">
            <i :class="file.show ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
            <span class="file-name" :class="'file-type-'+file.type">{{file.name}}</span>
          </a>
          <span class="file-status">
            <span class="color-add">+{{file.additions || 0}}&nbsp</span>
            <span class="color-delete">-{{file.deletions || 0}}&nbsp</span>
          </span>
          <span class="file-path">
            <a @click="toFile(file.path)" href="javascript:void(0)">{{getFilePath(file)}}</a>
          </span>
        </div>
        <div v-show="file.show" class="file-body">
          <table v-if="file.diffLines" class="diff-table">
            <tbody>
            <tr v-if="file.diffLines.length > 0" class="diff-first">
              <td class="diff-num">...</td>
              <td class="diff-num">...</td>
              <td class="diff-text">{{file.statistics}}</td>
            </tr>
            <tr v-for="line in file.diffLines" :class="getClass(line.sign)">
              <td class="diff-num">{{line.num1 === 0 ? '':line.num1}}</td>
              <td class="diff-num">{{line.num2 === 0 ? '':line.num2}}</td>
              <td class="diff-text">
                <span class="diff-text-sign">{{line.sign}}&nbsp&nbsp</span><span class="diff-text-span">{{line.text}}</span>
              </td>
            </tr>
            </tbody>
          </table>
          <div v-else class="diff-other">
            <span v-if="file.type ==='RENAME'">文件只重命名并没有更改</span>
            <span v-else-if="file.type === 'ADD'">没有添加任何内容</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'commit',
  data() {
    return {
      repository: {
        user: '',
        name: '',
        commitId: '',
        curBranch: ''
      },
      commit: {
        name: '',
        author: '',
        message: '',
        content: '',
        time: 0
      },
      fileList: []
    }
  },
  mounted() {
    this.repository.user = this.$route.params.username
    this.repository.name = this.$route.params.repository
    this.repository.commitId = this.$route.params.commitId
    this.repository.curBranch = this.$parent.repository.curBranch

    // 获取commit信息和修改列表
    this.commitInfo()
    this.changeList()
  },
  methods: {
    commitInfo() {
      this.$http.get('/repo/commit', {
        params: {
          user: this.repository.user,
          name: this.repository.name,
          commit: this.repository.commitId
        }
      }).then(({data}) => {
        this.commit = data
        this.commit.content = data.fullMessage.substring(data.message.length + 1)
      })
    },
    changeList() {
      this.$http.get('/repo/commit/change', {
        params: {
          user: this.repository.user,
          name: this.repository.name,
          commit: this.repository.commitId
        }
      }).then(({data}) => {
        this.fileList = data
        for (let i = 0; i < this.fileList.length; i++) {
          Vue.set(this.fileList[i], 'show', false)
          this.formatDiff(i, data[i])
        }
      })
    },
    formatDiff(i, data) {
      let diffLines = []  // 所有行
      let additions = 0  // 增加的行数
      let deletions = 0 // 删除的行数

      if (data.diff === null)
        return
      let lines = data.diff.split(/\n/)
      let index1 = 0
      let index2 = 0
      for (let i = 0; i < lines.length; i++) {
        if (lines[i] === '')
          break
        let line = {}
        line.sign = lines[i].substring(0, 1)
        line.text = lines[i].substring(1)
        if (line.sign === '-') {
          deletions++
          line.num1 = ++index1
          line.num2 = 0
        } else if (line.sign === '+') {
          additions++
          line.num1 = 0
          line.num2 = ++index2
        } else if (line.sign === ' ') {
          line.num1 = ++index1
          line.num2 = ++index2
        } else if (line.sign === '\\') {
          line.num1 = 0
          line.num2 = 0
        }
        diffLines.push(line)
      }
      Vue.set(this.fileList[i], 'diffLines', diffLines)
      this.fileList[i].statistics = data.statistics
      this.fileList[i].additions = additions
      this.fileList[i].deletions = deletions
    },
    showFile(file) {
      file.show = !file.show
    },
    getFilePath(file) {
      if (file.type === 'RENAME') return file.oldPath + ' -> ' + file.path
      else return file.path
    },
    getClass(sign) {
      if (sign === '-') {
        return 'diff-line-delete'
      } else if (sign === '+') {
        return 'diff-line-add'
      } else if (sign === '\\') {
        return 'diff-line-split'
      }
    },
    toFile(path) {
      const repo = '/' + this.repository.user + '/' + this.repository.name
      this.$router.push(repo + '/blob/' + this.repository.curBranch + '/' + path)
    },
    toCommit(author) {
      this.$router.push({name: 'commits-query', query: {author: author}})
    },
    toBranch(branch) {
      console.log('跳转到branch: ', branch)
    }
  },
  computed: {
    additionsNum: function () {
      let num = 0
      for (let i = 0; i < this.fileList.length; i++)
        num += this.fileList[i].additions ? this.fileList[i].additions : 0
      return num
    },
    deletionsNum: function () {
      let num = 0
      for (let i = 0; i < this.fileList.length; i++)
        num += this.fileList[i].deletions ? this.fileList[i].deletions : 0
      return num
    }
  }
}
</script>

<style scoped>
a {
  text-decoration-line: none;
  color: #24292e;
}

a:hover {
  text-decoration-line: underline;
}

.color-add {
  color: #2cbe4e;
}

.color-delete {
  color: #cb2431;
}

/* 信息区域 */
.content-brief {
  margin: 16px 0;
  border: 1px solid #ddd;
  border-radius: 3px;
  
}

.brief-commit {
  border-bottom: 1px solid #ddd;
  padding: 8px 10px;
  background-color: #eaf5ff;
  text-align: left;
}

.brief-commit-title {
  display: block;
  padding: 6px 0;
  font-size: 18px;
  font-weight: 600;
}

.brief-commit-full {
  display: block;
  border-top: 1px solid rgba(27, 31, 35, .15);
  padding: 8px 2px 2px;
  font-size: 14px;
  white-space: pre;
}

.brief-title {
  padding: 10px 8px;
  text-align: left;
}

.brief-title-author {
  font-weight: 600;
  font-size: 18px;
}

.brief-title-branch {
  margin-left: 8px;
  font-size: 14px;
}

.brief-title-time {
  padding-left: 20px;
  font-size: 14px;
  color: #3f4448;
}

.brief-stat {
  padding: 8px;
  text-align: left;
}

/* 文件相关区域 */
.content-file {
  margin: 16px 0;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.file-title {
  padding: 12px 10px;
  text-align: left;
  background-color: #fafbfc;
  font-size: 16px;
}

.file-title a:hover {
  text-decoration-line: none;
}

.file-name {
  font-weight: 600;
  font-size: 16px;
}

.file-type-ADD {
  color: #2cbe4e;
}

.file-type-DELETE {
  color: #cb2431;
}

.file-type-MODIFY {
  color: #0366d6;
}

.file-type-RENAME {
  color: coral;
}

.file-type-COPY {
  color: chocolate;
}

.file-status {
  margin-left: 16px;
  height: 18px;
  line-height: 18px;
  font-size: 16px;
}

.file-path {
  margin-left: 16px;
  font-weight: 500;
  font-size: 14px;
}

.file-path a:hover {
  text-decoration-line: underline;
  color: #0366d6;
}


/* 每个文件区 */
.file-body {
  overflow: auto;
}

.diff-other {
  padding: 10px 20px;
  text-align: left;
  font-size: 14px;
  color: #aaa;
}

.diff-table {
  border-collapse: collapse;
}

.diff-first td {
  background-color: #dbedff;
  color: #586069;
  font-size: 14px;
  font-weight: 600;
  user-select: none;
}

.diff-first td:last-child {
  background-color: #f1f8ff;
  color: #767B81;
  font-weight: 400;
}

.diff-num {
  padding: 2px 6px;
  min-width: 20px;
  font-size: 14px;
  color: #586069;
  text-align: right;
  user-select: none;
}

.diff-text {
  padding: 4px 10px;
  text-align: left;
  white-space: nowrap;
}

.diff-text-sign {
  user-select: none;
}

.diff-text-span {
  white-space: pre;
  word-spacing: 0.3em;
}

.diff-line-add td {
  background-color: #cdffd8;
}

.diff-line-add .diff-text {
  background-color: #e6ffed;
}

.diff-line-delete td {
  background-color: #ffdce0;
}

.diff-line-delete .diff-text {
  background-color: #ffeef0;
}

.diff-line-split {
  height: 20px;
  color: #ccc;
  font-size: 14px;
}


</style>