<template>
  <div>
    <div class="container">
      <nav>
        <a @click="changeTab('user_home')" :class="activeTab === 'user_home'?'active':''">Overview</a>
        <a @click="changeTab('repositories')" :class="activeTab === 'repositories'?'active':''">Repositories</a>
        <a @click="changeTab('articles')" :class="activeTab === 'articles'?'active':''">Articles</a>
        <a @click="changeTab('fragments')" :class="activeTab === 'fragments'?'active':''">Fragments</a>
        <a @click="changeTab('stars')" :class="activeTab === 'stars'?'active':''">Stars</a>
      </nav>
      <main>
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script>
import HomeHeader from '../../components/Header'
import {getUser} from '../../assets/js/commons'

export default {
  name: 'home',
  components: {HomeHeader},
  data() {
    return {
      notRepository: true,
      user: {},
      activeTab: 'user_home'
    }
  },
  created() {
    this.notRepository = this.$route.params.repository === null
    this.activeTab = this.$route.name
    console.log(this.activeTab)
    const username = this.$route.params.username
    if (username == null || username == '')
      this.$router.push('')
    this.user.username = username
  },
  mounted() {
    // this.verifyUser()  // 暂时不要验证
  },
  updated() {
    this.activeTab = this.$route.name
  },
  methods: {
    changeTab(tab) {
      if (this.activeTab == tab) return
      if (this.user.username == null || this.user.username == '') {
        this.$router.push({name: 'login'})
        return
      }
      this.activeTab = tab
      this.$router.push({name: tab})
    }
  }
}
</script>

<style scoped>
.container {
  margin: 30px auto;
  width: 1024px;
}

nav {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 1px solid #d1d5da;
}

nav a {
  display: inline-block;
  margin-right: 16px;
  padding: 16px 8px;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
  color: #586069;
}

nav a:hover {
  color: #000;
  text-decoration-line: none;
  border-bottom: 2px solid #d1d5da;
}

nav a.active {
  border-bottom: 2px solid #e36209;
}

main {
  margin-top: 24px;
}
</style>