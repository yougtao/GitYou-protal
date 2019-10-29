<template>
  <div>
    <div class="content-title">
    
    </div>
    <div class="content-data">
      <div class="issues-title">
        <span>9 个未解决  56个已解决</span>
      </div>
      <div class="issues-main">
        <ul>
          <li v-for="item in issues">
            <div class="issue-item">
              <div class="item-head">
                <div>
                  <a @click="toIssue(item.id)" href="javascript:void(0)" class="item-title">{{item.title}}</a>
                </div>
                <div>
                  <span class="item-time">{{item.createTime}}</span>
                </div>
              </div>
              <div></div>
            </div>
          </li>
        </ul>
      </div>
      <div class="issue-edit">
        <smd-editor :commit="commit"></smd-editor>
      </div>
    </div>
    <div class="content-paginate">
      <el-pagination
          background :hide-on-single-page="true" layout="prev, pager, next"
          @current-change="changePage"
          :current-page="page.curPage" :page-size="4" :total="page.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import SmdEditor from '../../components/basic/SmdEditor'

export default {
  name: 'issues',
  components: {SmdEditor},
  data() {
    return {
      repository: {
        user: '',
        name: ''
      },
      page: {
        total: 0,
        pageTotal: 0,
        curPage: 1
      },
      issues: []
    }
  },
  mounted() {
    this.repository.user = this.$route.params.username
    this.repository.name = this.$route.params.repository

    // 获取issues列表
    this.pageList()
  },
  methods: {
    pageList() {
      this.$http.get('/repo/issue/page', {
        params: {
          repository: this.repository.name,
          page: this.page.curPage
        }
      }).then(({data}) => {
        this.issues = data.list
        this.page.total = data.total
        this.page.pageTotal = data.pageTotal
      })
    },
    toIssue(id) {
      console.log('跳转到issue')
    },
    commit(data) {
      console.log('提交成功, 数据: ', data)
    },
    /* 改变页码 */
    changePage(page) {
      this.page.curPage = page
      this.pageList()
    }
  }
}
</script>

<style scoped>
a {
  text-decoration-line: none;
}

/* 主体*/
.issues-title {
  border: 1px solid #d1d5da;
  border-bottom: none;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  padding: 10px;
  text-align: left;
  
}

.issues-main {
  border: 1px solid #d1d5da;
  border-top: none;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}

.issues-main ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.issues-main li {
  border-top: 1px solid #d1d5da;
  padding: 6px 20px;
  height: 40px;
}

.issues-main li:hover {
  background-color: #f6f8fa;
}

/* issue item */
.issue-item {
  text-align: left;
}

.item-head {
  display: inline-block;
  text-align: left;
}

.item-title {
  font-weight: 600;
  font-size: 16px;
  color: #000;
}

.item-title:hover {
  color: #0366d6;
}

.item-time {
  font-size: 14px;
}

/* 分页*/
.content-paginate {
  margin: 20px 0;
}

</style>