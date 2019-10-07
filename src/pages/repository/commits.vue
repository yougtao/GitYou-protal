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
      <el-timeline>
        <el-timeline-item v-for="group in commits" :key="group.time" :timestamp="group.time" placement="top">
          <ul class="commit-group">
            <li v-for="commit in group.group" class="commit">
              <div>
                <img src="" alt="">
                <span>{{ commit.email }}</span>
                <a @click="toCommit(commit.name)" href="javascript:void(0)">{{ commit.message }}</a>
              </div>
            </li>
          </ul>
        </el-timeline-item>
      </el-timeline>
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
        user: '', name: ''
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
      console.log('跳转到commit: ', name)
    }
  }
}
</script>

<style scoped>
a {
  text-decoration-line: none;
}

.content-branch {
  margin-bottom: 20px;
}

.content-commits {
  text-align: left;
}

.commit-group {
  border-top: 1px solid #eaecef;
  
}

.commit {
  padding: 6px 0;
  list-style: none;
  border-bottom: 1px solid #eaecef;
  border-left: 1px solid #eaecef;
  border-right: 1px solid #eaecef;
}

.commit:hover {
  background-color: #f6fbff;
}

.commit a {
  color: #586069;
  font-size: 16px;
  font-weight: 600;
}

</style>