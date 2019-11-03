<template>
  <div>
    <!-- 面包屑导航 -->
    <div class="content-nav">
      <a @click="toRepository" href="javascript:void(0)" class="nav-repository">{{repository.name}}</a>
      <span v-for="(folder,index) in file.paths">
        <span> / </span>
        <a @click="toFolder(index)" href="javascript:void(0)" class="nav-folder">{{folder}}</a>
      </span>
      <span>
        <span class="nav-file"> / {{file.name}}</span>
      </span>
    </div>
    <!-- commit信息 -->
    <div></div>
    <!-- 文件信息 -->
    <div class="content-code">
      <div class="code-title">
        <span>42 行(32 sloc)</span>
        <span>1.11 KB</span>
      </div>
      <div class="code-content">
        <pre>
          <code class="text-code">{{file.content}}</code>
        </pre>
      </div>
    </div>
  
  </div>
</template>

<script>
export default {
  name: 'blob',
  data() {
    return {
      repository: {
        user: '',
        name: '',
        branch: ''
      },
      file: {
        name: '',
        path: '',
        paths: [],
        content: ''
      }
    }
  },
  mounted() {
    this.repository.user = this.$route.params.username
    this.repository.name = this.$route.params.repository
    this.repository.branch = this.$route.params.branch
    this.file.path = this.$route.params.pathMatch

    this.file.paths = this.$route.params.pathMatch.split('/')
    this.file.name = this.file.paths.pop()

    this.$http.get('/repo/file', {
      params: {
        user: this.repository.user,
        name: this.repository.name,
        branch: this.repository.branch,
        path: this.file.path
      }
    }).then(({data}) => {
      this.file.name = data.name
      this.file.content = data.content
    })
  },
  methods: {
    toFolder(num) {
      let base = '/' + this.repository.user + '/' + this.repository.name + '/branch/' + this.repository.branch + '/'
      for (let i = 0; i <= num; i++) {
        base += this.file.paths[i]
      }
      this.$router.push(base)
    },
    toRepository() {
      this.$router.push('/' + this.repository.user + '/' + this.repository.name)
    }
  }
}
</script>

<style scoped>

/* 导航区域 */
.content-nav {
  padding: 16px;
  text-align: left;
}

.nav-repository {
  font-size: 18px;
  font-weight: 500;
  color: #0366d6;
}

.nav-folder {
  color: #0366d6;
}

.nav-file {
  font-weight: 500;
  color: #000;
}

/* 文件信息 */
.content-code {

}

.code-title {
  padding: 10px;
  border: 1px solid #d1d5da;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  text-align: left;
}

.code-content {
  padding: 16px;
  border: 1px solid #d1d5da;
  border-top: none;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  text-align: left;
}

.text-code {
  font-size: 16px;
  background-color: #ffffff;
}
</style>