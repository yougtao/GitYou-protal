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
import {getUser} from '../../assets/js/commons'

export default {
  name: 'home',
  data() {
    return {
      user: {},
      activeName: 'Overview'
    }
  },
  created() {
    const username = this.$route.params.username
    if (username == null || username == '')
      this.$router.push('')
    this.user.username = username
  },
  mounted() {
    // this.verifyUser()  // 暂时不要验证
  },
  methods: {
    changeTab() {
      if (this.user.username == null || this.user.username == '') {
        this.$router.push({name: 'login'})
        return
      }

      if (this.activeName == 'overview')
        this.$router.push('/' + this.user.username)
      else
        this.$router.push('/' + this.user.username + '/' + this.activeName)
    }
  }
}
</script>

<style scoped>
.el-container {
  margin: 30px auto;
  width: 1024px;
}
</style>