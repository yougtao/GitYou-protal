<template>
  <div CLASS="content">
    <div class="content-title">
      <h3>创建一个新的Repository</h3>
      <p>A repository contains all project files, including the revision history. Already have a project repository elsewhere?</p>
      <p><a @click="import_repository" href="javascript:void(0)">Import a repository.</a></p>
    </div>
    <div class="content-info">
      <div class="repository-title">
        <el-dropdown>
          <el-button size="medium">
            <img src="https://avatars1.githubusercontent.com/u/33676932?s=40&v=4"/>
            <span>{{user.name}}</span><i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-input size="medium" v-model="repository.name" placeholder="Repository Name"></el-input>
      </div>
      <div class="repository-description">
        Description
        <el-input v-model="repository.description" size="medium"></el-input>
      </div>
      <div class="repository-status">
        <template>
          <el-radio v-model="repository.status" label="public">Pubilc</el-radio>
          <el-radio v-model="repository.status" label="private">Private</el-radio>
        </template>
      </div>
      <el-button type="success" @click="createRepository">创建 Repository</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'new_repository',
  data() {
    return {
      user: {
        userId: 10000,
        name: 'xiaorui'
      },
      repository: {
        userId: 10000,
        name: '',
        description: '',
        status: 'public'
      }
    }
  },
  methods: {
    createRepository() {
      console.log('创建')
      if (this.repository === '') return
      this.$http.post('repo/repository', this.repository).then(res => {
        this.$message.success('创建成功')
      }).catch(res => {
        this.$message.error('创建失败')
      })
    },
    import_repository() {
      this.$router.push({path: '/import_repository'})
    }
  }
}
</script>

<style scoped>
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

.content-info {
  line-height: 36px;
  text-align: left;
}

.repository-title {
  line-height: 36px;
}

.repository-description {
  padding-bottom: 20px;
  border-bottom: 1px solid #e1e4e8;
  margin-bottom: 30px;
}

.repository-status {
  padding-bottom: 20px;
  border-bottom: 1px solid #e1e4e8;
  margin-bottom: 30px;
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