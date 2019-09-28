<template>
  <el-container>
    <el-header>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="Overview">
          <span slot="label"><i class="el-icon-date"> Overview</i> </span>
          <Overview v-if="activeName === 'Overview'"></Overview>
        </el-tab-pane>
        <el-tab-pane name="Repositories">
          <span slot="label"><i class="el-icon-notebook-2"> Repositories</i> </span>
          <Repositories v-if="activeName === 'Repositories'"></Repositories>
        </el-tab-pane>
        <el-tab-pane name="Projects">
          <span slot="label"><i class="el-icon-s-data"> Projects</i> </span>
          <Projects></Projects>
        </el-tab-pane>
        <el-tab-pane name="Wiki">
          <span slot="label"><i class="el-icon-reading"> Wiki</i> </span>
          <Wiki></Wiki>
        </el-tab-pane>
        <el-tab-pane name="Fragments">
          <span slot="label"><i class="el-icon-tickets"> Fragments</i> </span>
          <Fragments></Fragments>
        </el-tab-pane>
        <el-tab-pane name="Stars">
          <span slot="label"><i class="el-icon-star-off"> Stars</i> </span>
          <Stars></Stars>
        </el-tab-pane>
      </el-tabs>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>

</template>

<script>
import Overview from './overview'
import Repositories from './repositories'
import Projects from './projects'
import Wiki from './wiki'
import Fragments from './fragments'
import Stars from './stars'

export default {
  name: 'home',
  components: {Overview, Repositories, Projects, Wiki, Fragments, Stars},
  data() {
    return {
      username: this.$route.params.username,
      activeName: 'Overview'
    }
  },
  methods: {
    handleClick(tab) {
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