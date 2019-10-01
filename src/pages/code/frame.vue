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
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="Code" name="code"></el-tab-pane>
          <el-tab-pane label="settings" name="settings"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    
    <div class="content-main">
      <router-view/>
    </div>
  
  </div>
</template>

<script>
import Code from './code.vue'

export default {
  name: 'frame',
  components: {Code},
  data() {
    return {
      activeName: 'code',
      repository: {
        user: '',
        name: ''
      }
    }
  },
  mounted() {
    this.repository.user = this.$route.params.username
    this.repository.name = this.$route.params.repository
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
  padding: 20px 0;
  margin-bottom: 20px;
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