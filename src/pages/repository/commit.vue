<template>
  <div>
    <div class="content-title"></div>
    <div class="content-brief">
      <span>修改了{{addNum}}个</span>
    </div>
    <div class="content-files">
      <div class="content-file" v-for="file in fileList" :key="file.path">
        <div class="file-title">
          <i @click="loadFile(file)" class="el-icon-arrow-right"></i>
          <span @click="loadFile(file)" class="file-name">{{file.name}}({{file.type}})</span>
          <span class="file-status">
            <span class="status-add">+{{file.insertions}}&nbsp</span>
            <span class="status-del">-{{file.deletions}}&nbsp</span>
          </span>
          <span class="file-path">
            <a @click="toFile(file.path)" href="javascript:void(0)">{{file.path}}</a>
          </span>
        </div>
        <div v-show="file.show" class="file-body">
          <table v-if="file.diffLines !==undefined" class="diff-table">
            <tbody>
            <tr class="diff-first">
              <td class="diff-num"></td>
              <td class="diff-num"></td>
              <td class="diff-text">{{file.statistics}}</td>
            </tr>
            <tr v-for="(line,index) in file.diffLines" :class="getClass(line.sign)">
              <td class="diff-num">{{line.num1 === 0 ? '':line.num1}}</td>
              <td class="diff-num">{{line.num2 === 0 ? '':line.num2}}</td>
              <td class="diff-text">
                <span class="diff-text-sign">&nbsp{{line.sign}}&nbsp</span><span>{{line.text}}</span>
              </td>
            </tr>
            </tbody>
          </table>
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
        curBranch: 'master'
      },
      fileList: []
    }
  },
  mounted() {
    this.repository.user = this.$route.params.username
    this.repository.name = this.$route.params.repository
    this.repository.commitId = this.$route.params.commitId
    this.repository.curBranch = this.$route.params.branch
    // 获取修改列表
    this.changeList()
  },
  methods: {
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
          Vue.set(this.fileList[i], 'show', true)
        }
      })
    },
    /* 文件MODIFY */
    fileDiff(file) {
      this.$http.get('/repo/commit/diff', {
        params: {
          user: this.repository.user,
          name: this.repository.name,
          commit: this.repository.commitId,
          path: file.path
        }
      }).then(({data}) => {
        let diffLines = []

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
            line.num1 = ++index1
            line.num2 = 0
          } else if (line.sign === '+') {
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
        Vue.set(file, 'diffLines', diffLines)
        file.statistics = data.statistics
        console.log(this.fileList)
      })
    },
    loadFile(file) {
      if (file.diffLines === undefined) {
        this.fileDiff(file)
      } else {
        file.show = !file.show
      }
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
    }
  },
  computed: {
    addNum() {
      let num = 0
      return 0
    }
  }
}
</script>

<style scoped>
a {
  text-decoration-line: none;
  color: #24292e;
}

.content-file {
  margin: 16px 0;
  border: 1px solid #ddd;
}

.file-title {
  padding: 8px 10px;
  text-align: left;
  background-color: #fafbfc;
  font-size: 16px;
}

.file-name {
  font-weight: 600;
  font-size: 16px;
}

.file-status {
  margin-left: 16px;
  height: 18px;
  line-height: 18px;
  font-size: 16px;
}

.file-status .status-add {
  color: #2cbe4e;
}

.file-status .status-del {
  color: #cb2431;
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

/* diff table */
.diff-table {
  border-collapse: collapse;
}

.diff-table td {
  padding: 4px 10px;
  text-align: left;
}

.diff-first td {
  background-color: #dbedff;
  color: #767B81;
  font-size: 14px;
  user-select: none;
}

.diff-first td:last-child {
  background-color: #f1f8ff;
}

.diff-num {
  min-width: 40px;
  color: #586069;
  text-align: center;
  user-select: none;
}

.diff-text {
  width: 100%;
}

.diff-text-sign {
  user-select: none;
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