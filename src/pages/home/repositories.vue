<template>
  <div>
    <div class="search-div">
      <el-input v-model="input" placeholder="Find a repository..."></el-input>
      <el-dropdown trigger="click" @command="conditionType">
        <el-button size="medium">
          Type: {{condition.type}}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="All">All</el-dropdown-item>
          <el-dropdown-item command="Public">Public</el-dropdown-item>
          <el-dropdown-item command="Private">Private</el-dropdown-item>
          <el-dropdown-item command="Sources">Sources</el-dropdown-item>
          <el-dropdown-item command="Forks">Forks</el-dropdown-item>
          <el-dropdown-item command="Archived">Archived</el-dropdown-item>
          <el-dropdown-item command="Mirrors">Mirrors</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown trigger="click" @command="conditionLanguage">
        <el-button size="medium">
          Language: {{condition.language}}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="All">All</el-dropdown-item>
          <el-dropdown-item command="Java">Java</el-dropdown-item>
          <el-dropdown-item command="JavaScript">JavaScript</el-dropdown-item>
          <el-dropdown-item command="Python">Python</el-dropdown-item>
          <el-dropdown-item command="Vue">Vue</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="success" icon="el-icon-notebook-2" size="medium">New</el-button>
    </div>
    <div class="content">
      <el-row class="repo" v-for="(repo,index) in repositories" :key="index">
        <el-col :span="12">
          <div class="repo-title"><h3><a href="">{{ repo.name }}</a></h3></div>
          <div class="repo-description"><p>{{ repo.description }}</p></div>
          <div class="repo-info">
            <span v-if="repo.language !==0">
              <span class="repo-language-icon" :style="getColor(repo.language)"></span>
              <span>{{languageName[repo.language]}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </span>
            <span>Update {{showUpdate(repo.updateTime)}}</span>
          </div>
        </el-col>
        <el-col :offset="6" :span="6">
          <div class="btn-star">
            <el-button size="medium" icon="el-icon-star-on">Star</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-pagination v-if="pageInfo.pageNum > 1" background layout="prev, pager, next"
                   :total="pageInfo.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Repositories',
  data() {
    return {
      userId: 1,
      pageInfo: {
        total: 0,
        page: 1,
        pageNum: 0
      },
      condition: {
        type: 'All',
        language: 'All'
      },
      repositories: [],
      languageColors: ['', '#b07219'],
      languageName: ['unknown', 'Java']
    }
  },
  methods: {
    showUpdate(time) {
      let dateBegin = new Date(time)
      let dateEnd = new Date()
      let seconds = (dateEnd - dateBegin) / 1000 // 秒数
      if (seconds < 0) return ' never'
      // 0 - 6分钟 =>just now
      else if (seconds < 600) return 'just now'
      // 6 - 60分钟
      else if (seconds < 3600)
        return Math.round(seconds / 60) + 'mintues ago'

      // 小时计数
      let hours = Math.round(seconds / 3600)
      if (hours < 24) return hours + ' hours ago'
      else if (hours < 24 * 365) return 'on ' + dateBegin.getDate() + ' ' + dateBegin.getMonth()

      console.log(dateBegin)
    },
    getColor(language) {
      if (language < 0 || language >= this.languageColors.length) return 'background-color: #000'
      else return 'background-color: ' + this.languageColors[language]
    },
    conditionType(item) {
      this.condition.type = item
    },
    conditionLanguage(item) {
      this.condition.language = item
    }
  },
  mounted() {
    const data = {
      params: {
        userId: 10000
      }
    }
    this.$http.get('/repo/repository/page', data).then(res => {
      this.repositories = res.data.list
      this.pageInfo.total = res.data.total
      this.pageInfo.pageNum = res.data.pageTotal
    }).catch(res => {
      console.log('获取失败')
    })
  },
  computed: {}
}
</script>

<style scoped>
.search-div {
  border-bottom: 1px solid #e1e4e8;
  padding: 5px 0 15px 0;
}

.search-div .el-input {
  width: auto;
}

/* content*/
.content {
  margin-bottom: 30px;
}

.repo {
  border-bottom: 1px solid #e1e4e8;
  padding: 18px 10px;
}


.repo-title h3 {
  margin: 0;
  font-weight: 600;
  font-size: 20px;
  text-align: left;
}

.repo-title a {
  text-decoration-line: none;
}

.repo-description {
  text-align: left;
}

.repo-description p {
  font-size: 14px;
}

.repo-info {
  text-align: left;
}

.repo-info span {
  font-size: 12px;
}

.repo-language-icon {
  position: relative;
  top: 1px;
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.btn-star button {
  padding: 8px 12px;
}
</style>