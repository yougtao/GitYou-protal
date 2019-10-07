<template>
  <div>
    <div class="content-branch">
      <el-dropdown>
        <el-button size="medium">
          <span>Branch: </span>
          <span>{{ curBranch }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="branch in branches" :key="branch">{{ branch }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="content-commits">
      <ul class="commit-times">
        <li v-for="group in commits" :key="group.time" class="group-li">
          <div></div>
          <div class="group-wrap">
            <div class="group-time">
              <span>{{ group.time }}</span>
            </div>
            <div class="group-commit">
              <ul class="group-ul">
                <li v-for="commit in group.group" class="commit-li">
                  <div class="commit-item">
                    <img src="" alt="">
                    <span class="commit-author">
                      <a @click="toUser(commit.email)" href="javascript:void(0)">{{ commit.email }}</a>
                    </span>
                    <span class="commit-message">
                      <a @click="toCommit(commit.name)" href="javascript:void(0)">{{ commit.message }}</a>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commits',
  data() {
    return {
      curBranch: 'master',
      repository: {
        user: '',
        name: ''
      },
      branches: ['master'],
      commits: []
    }
  },
  mounted() {
    this.repository.user = this.$route.params.username
    this.repository.name = this.$route.params.repository

    this.$http.get('/repo/commit/list', {
      params: {
        user: this.repository.user,
        name: this.repository.name,
        page: 1
      }
    }).then(({data}) => {
      let last = new Date(0).toLocaleDateString()
      let curGroup = {}
      data.forEach(e => {
        const cur = new Date(e.time * 1000).toLocaleDateString()
        if (last == cur) {
          curGroup.group.push(e)
        } else {
          curGroup = {
            time: cur,
            group: []
          }
          this.commits.push(curGroup)
          curGroup.group.push(e)
          last = cur
        }
      })
      console.log(this.commits)
    })
  },
  methods: {
    toCommit(name) {
      this.$router.push('/' + this.repository.user + '/' + this.repository.name + '/commit/' + name)
    },
    toUser(user) {
      this.$router.push('/' + user + '/repositories')
    }
  }
}
</script>

<style scoped>
a {
  text-decoration-line: none;
  color: #444d56;
}

a:hover {
  text-decoration-line: underline;
}

.content-branch {
  margin-bottom: 20px;
}

.content-commits {
  text-align: left;
}

.commit-times {
  display: block;
  margin-left: 30px;
  border-left: 2px solid #ddd;
  padding-left: 20px;
}

.group-li {
  list-style: circle;
  margin-left: -8px;
}

.group-wrap {
  margin: 20px 0;
}

.group-commit {
  margin-left: 20px;
  margin-top: 10px;
}

.commit-item {
  padding: 10px;
  border-bottom: 1px solid #eaecef;
  
}

.group-ul {
  list-style: none;
  border: 1px solid #eaecef;
  border-bottom: none;
  padding-left: 0;
}


.commit-group {
  border-top: 1px solid #eaecef;
  
}

.commit {
  padding: 10px 10px;
  list-style: none;
  border-bottom: 1px solid #eaecef;
  border-left: 1px solid #eaecef;
  border-right: 1px solid #eaecef;
}

.commit-item:hover {
  background-color: #f6fbff;
}

.commit-author a {
  color: #000;
}

.commit-message {
  margin-left: 10px;
}

</style>