<template>
  <div CLASS="content">
    <div class="content-title">
      <h2>导入一个Repository</h2>
      <p>Import all the files, including the revision history, from another version control system.</p>
    </div>
    <div class="content-clone">
      <h2>你的仓库URL</h2>
      <el-input v-model="repository.clone" placeholder="http://svn.example.org/user/code"></el-input>
    </div>
    <div class="content-info">
      <h2>Repository 信息</h2>
      <div class="repository-title">
        <el-dropdown trigger="click">
          <el-button size="medium">
            <img src="https://avatars1.githubusercontent.com/u/33676932?s=40&v=4"/>
            <span> {{repository.username}}</span><i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="user in userList" :key="user">{{user}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-input size="medium" v-model="repository.name" maxlength="50"
                  show-word-limit placeholder="Repository Name"></el-input>
      </div>
      <div class="repository-description">
        Description
        <el-input v-model="repository.description" size="medium"></el-input>
      </div>
      <div class="repository-status">
        <template>
          <el-radio v-model="repository.secret" label="0">Pubilc</el-radio>
          <el-radio v-model="repository.secret" label="1">Private</el-radio>
        </template>
      </div>
      <el-button type="success" @click="importRepository">导入 Repository</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'import_repository',
  data() {
    return {
      userList: ['xiaorui'],
      repository: {
        clone: '',
        userID: '',
        username: '',
        mame: '',
        description: '',
        secret: '0'
      }
    }
  },
  mounted() {
    const user = JSON.parse(window.atob('eyJpZCI6MTAwMDAsInVzZXJuYW1lIjoieGlhb3J1aSIsImV4cCI6NTMwMjQ2NDEzNX0'))
    this.repository.userId = user.id
    this.repository.username = user.username
  },
  methods: {
    importRepository() {
      this.$http.post('/repo/repository/import', this.repository).then(({data}) => {
            this.$message.success('创建成功')
            this.$router.push('/' + data.data.username + '/' + data.data.name)
          }
      )
    }
  }
}
</script>

<style scoped>
h2 {
  font-size: 18px;
  font-weight: 500;
}

.content {
  margin: 30px auto;
  max-width: 800px;
}

.content-title {
  padding: 2px;
  border-bottom: 1px solid #e1e4e8;
  margin-bottom: 30px;
  text-align: left;
}

.content-title a {
  text-decoration-line: none;
}

.content-info {
  line-height: 36px;
  text-align: left;
}

.repository-title {
  line-height: 36px;
  margin-bottom: 30px;
}

.repository-description {
  padding-bottom: 20px;
  margin-bottom: 30px;
}

.repository-status {
  padding-bottom: 20px;
  border-bottom: 1px solid #e1e4e8;
  margin-bottom: 30px;
}

/* content-clone */
.content-clone {
  margin-bottom: 30px;
  text-align: left;
}

.content-info button {
  padding: 6px 12px;
}

.content-info img {
  height: 20px;
  widows: 20px;
  line-height: 1;
}

.content-info span {
  font-size: 14px;
  font-weight: 600;
}

.repository-title .el-input {
  width: 240px;
  line-height: 36px;
}
</style>