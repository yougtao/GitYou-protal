<template>
  <el-container>
    <el-header>
      <el-tabs>
        <el-tab-pane label="Overview">
          <span slot="label"><i class="el-icon-date"> Overview</i> </span>
          <Overview></Overview>
        </el-tab-pane>
        <el-tab-pane label="Repositories">
          <span slot="label"><i class="el-icon-notebook-2"> Repositories</i> </span>
          <Repositories></Repositories>
        </el-tab-pane>
        <el-tab-pane label="Projects">
          <span slot="label"><i class="el-icon-s-data"> Projects</i> </span>
          <Projects></Projects>
        </el-tab-pane>
        <el-tab-pane label="Wiki">
          <span slot="label"><i class="el-icon-reading"> Wiki</i> </span>
          <Overview></Overview>
        </el-tab-pane>
        <el-tab-pane label="Fragments">
          <span slot="label"><i class="el-icon-tickets"> Fragments</i> </span>
          <Overview></Overview>
        </el-tab-pane>
        <el-tab-pane label="Stars">
          <span slot="label"><i class="el-icon-star-off"> Stars</i> </span>
          <Overview></Overview>
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
  components: {Overview},
  data() {
    return {
      username: this.$route.params.username
    }
  }
}
</script>

<style scoped>

</style>