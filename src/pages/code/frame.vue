<template>
  <div>
    <div class="content-head">
      <div class="content-title">
      <span>
        <a href="javascript:void(0)" class="title-name">{{ repository.user }}</a>
        <span>/</span>
        <a href="javascript:void(0)" class="title-name">{{ repository.name }}</a>
      </span>
      </div>
      <div class="content-nav">
        <el-tabs v-model="activeName" type="card" @tab-click="">
          <el-tab-pane label="Code" name="code"></el-tab-pane>
          <el-tab-pane v-if="user.username === repository.user" label="Settings" name="settings"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    
    <div class="content-main">
      <router-view/>
    </div>
  
  </div>
</template>

<script>
export default {
  name: 'frame',
  data() {
    return {
      activeName: 'code',
      user: {
        id: '',
        username: ''
      },
      repository: {
        user: '',
        name: ''
      }
    }
  },
  mounted() {
    this.repository.user = this.$route.params.username
    this.repository.name = this.$route.params.repository

    const userStr = document.cookie.split(';')[0].split('=')[1].split('.')[1]
    this.user = JSON.parse(window.atob(userStr))
    console.log(this.user)
  },
  methods: {}
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
  padding-top: 20px;
  background-color: #fafbfc;
}

.content-head .el-tabs__header {
  margin-bottom: 0;
}

.content-title {
  max-width: 1024px;
  margin: 0 auto 20px;
  text-align: left;
}

.content-nav {
  max-width: 1024px;
  margin: 0 auto;
}

.content-main {
  margin: 0 auto;
  max-width: 1024px;
}

/* content-title*/
.content-title span {

}

.title-name {

}
</style>