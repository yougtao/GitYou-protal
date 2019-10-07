<template>
  <el-container>
    <el-header>
      <el-tabs v-model="activeName" @tab-click="changeTab">
        <el-tab-pane name="overview">
          <span slot="label"><i class="el-icon-date"> Overview</i> </span>
        </el-tab-pane>
        <el-tab-pane name="Repositories">
          <span slot="label"><i class="el-icon-notebook-2"> Repositories</i> </span>
        </el-tab-pane>
        <el-tab-pane name="Articles">
          <span slot="label"><i class="el-icon-s-data"> Articles</i> </span>
        </el-tab-pane>
        <el-tab-pane name="Fragments">
          <span slot="label"><i class="el-icon-tickets"> Fragments</i> </span>
        </el-tab-pane>
        <el-tab-pane name="Stars">
          <span slot="label"><i class="el-icon-star-off"> Stars</i> </span>
        </el-tab-pane>
      </el-tabs>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>

</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      username: this.$route.params.username,
      activeName: 'Overview'
    }
  },
  methods: {
    changeTab() {
      if (this.activeName == 'overview')
        this.$router.push('/' + this.username)
      else
        this.$router.push('/' + this.username + '/' + this.activeName)
    }
  }
}
</script>

<style scoped>
.el-container {
  margin: 30px auto;
  max-width: 1024px;
  
}
</style>