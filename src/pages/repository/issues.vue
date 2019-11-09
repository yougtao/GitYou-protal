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
                <div class="item-title">
                  <a @click="toIssue(item.number)" href="javascript:void(0)">{{item.title}}</a>
                </div>
                <div class="item-info">
                  <span class="item-id">#{{item.number}}</span>
                  <span>{{item.resolved?'已解决':'未解决'}}</span>
                  <span>发表于 {{ showTime(item.createTime)}}</span>
                </div>
              </div>
              <div></div>
            </div>
          </li>
        </ul>
      </div>
      <div class="issue-edit">
        <smd-editor :title="true" :commit="commit"></smd-editor>
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
import {itoTime} from '../../assets/js/commons'

export default {
  name: 'issues',
  components: {SmdEditor},
  data() {
    return {
      showTime: itoTime,
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
          user: this.repository.user,
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
      this.$router.push({
        name: 'issue', params: {
          issue: id
        }
      })
    },
    commit(title, content) {
      let issue = {
        repository: this.$parent.repository.id,
        authorId: this.$parent.user.id,
        title: title,
        content: content,
        label: 0
      }
      this.$http.post('/repo/issue', issue).then(({data}) => {
        this.$message.success({message: '发表成功!', duration: 1200})
        this.pageList()
      })
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

.item-title a {
  font-weight: 600;
  font-size: 16px;
  color: #000;
}

.item-title a:hover {
  color: #0366d6;
}

.item-info {
  font-size: 12px;
}

.item-id {
  font-size: 14px;
}

/* 分页*/
.content-paginate {
  margin: 20px 0;
}

</style>