<template>
  <div>
    <div class="content-title"></div>
    <div class="content-brief">
      <span>修改了{{addNum}}个</span>
    </div>
    <div class="content-files">
      <div class="content-file" v-for="file in fileList" :key="file.path">
        <div class="file-title">
          <i @click="showFile(file.path)" class="el-icon-arrow-right"></i>
          <span class="file-name">{{file.name}}</span>
          <span class="file-status">
            <span class="status-add">{{file.insertions}}+</span>
            <span class="status-del">{{file.deletions}}-</span>
          </span>
          <span class="file-path">
            <a @click="toFile(file.path)" href="javascript:void(0)">{{file.path}}</a>
          </span>
        </div>
        <div class="file-body"></div>
      </div>
    </div>
  </div>
</template>

<script>
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
      })
    },
    toFile(path) {
      const repo = '/' + this.repository.user + '/' + this.repository.name
      this.$router.push(repo + '/blob/' + this.repository.curBranch + '/' + path)
    },
    showFile(path) {}
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
  font-size: 13px;
}

.file-path a:hover {
  text-decoration-line: underline;
  color: #0366d6;
}
</style>