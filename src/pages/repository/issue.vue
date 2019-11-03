<template>
  <div>
    <div class="issue-head">
      <div>
        <span class="issue-title">{{issue.title}}</span>
        <span class="issue-number">#{{issue.number}}</span>
      </div>
      <div class="issue-detail">
        <span class="issue-status">Open</span>
        <a @click="toUser(issue.author)" class="issue-author" href="javascript:void(0)">{{issue.authorName}}</a>
        <span class="issue-time">于 {{showTime(issue.createTime)}}</span>
        <span>{{issue.comments.length}} 条评论</span>
      </div>
    </div>
    <div class="comments-main">
      <div v-if="issue.authorId !== ''" class="comment-issue">
        <div class="comment-avatar">
          <img :src="issue.authorAvatar && issue.authorAvatar" :alt="issue.authorName && issue.authorName">
        </div>
        <div class="comment-mini" :class="self.username && self.username === issue.authorName ? 'self':''">
          <div class="comment-bar">
            <div class="comment-title">
              <a @click="toUser(issue.authorName)" href="javascript:void(0)" class="comment-author">{{issue.authorName}}</a>
              <span class="comment-time">评论于 {{showTime(issue.createTime)}}</span>
            </div>
            <el-dropdown class="comment-bar-menu" trigger="click" @command="">
              <a class="comment-menu">
                <svg aria-label="Show options" viewBox="0 0 13 16" version="1.1" width="13" height="16" role="img">
                  <path fill-rule="evenodd"
                        d="M1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM13 7.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                </svg>
              </a>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="copy">复制</el-dropdown-item>
                <el-dropdown-item>引用</el-dropdown-item>
                <div v-if="self.username === issue.authorName">
                  <div class="dropdown-divider"></div>
                  <el-dropdown-item>编辑</el-dropdown-item>
                  <el-dropdown-item class="comment-menu-delete">删除</el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="comment-bar-label">
              <span v-if="issue.username === issue.authorName">作者</span>
              <span>提问者</span>
            </div>
          </div>
          <div class="comment-content article" v-html="loadContent(issue.content)"></div>
        </div>
        <div class="comment-cable"></div>
      </div>
      <div v-for="(comment,index) in issue.comments" class="comment-unit">
        <div class="comment-avatar">
          <img :src="comment.authorAvatar" :alt="comment.authorName">
        </div>
        <div class="comment-mini" :class="self.username && self.username === comment.authorName ? 'self':''">
          <div class="comment-bar">
            <div class="comment-title">
              <a @click="toUser(comment.authorName)" href="javascript:void(0)" class="comment-author">{{comment.authorName}}</a>
              <span class="comment-time">评论于 {{showTime(comment.createTime)}}</span>
            </div>
            <el-dropdown class="comment-bar-menu" trigger="click" @command="">
              <a class="comment-menu">
                <svg aria-label="Show options" viewBox="0 0 13 16" version="1.1" width="13" height="16" role="img">
                  <path fill-rule="evenodd"
                        d="M1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM13 7.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                </svg>
              </a>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="copy">复制</el-dropdown-item>
                <el-dropdown-item>引用</el-dropdown-item>
                <div v-if="self.username === comment.authorName">
                  <div class="dropdown-divider"></div>
                  <el-dropdown-item>编辑</el-dropdown-item>
                  <el-dropdown-item class="comment-menu-delete">删除</el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="comment-bar-label">
              <span v-if="issue.username === comment.authorName">作者</span>
              <span v-if="issue.authorName === comment.authorName">提问者</span>
            </div>
          </div>
          <div class="comment-content article" v-html="loadContent(comment.content)"></div>
        </div>
        <div class="comment-cable"></div>
      </div>
      <div class="comment-end"></div>
      <div v-if="self.id && self.id > 0" class="comment-create">
        <div class="comment-avatar">
          <img :src="self.avatar" :alt="self.username">
        </div>
        <smd-editor class="comment-mini"/>
      </div>
    </div>
  
  </div>
</template>

<script>
import SmdEditor from '../../components/basic/SmdEditor'
import {doMaked} from '../../assets/js/maked'
import {getUser, itoTime} from '../../assets/js/commons'

export default {
  name: 'issue',
  components: {SmdEditor},
  data() {
    return {
      showTime: itoTime,
      issue: {
        authorId: '', // 发表该issue的人
        username: '',
        repository: '',
        number: 0,
        comments: []
      },
      self: {
        id: '',
        username: ''
      }
    }
  },
  mounted() {
    this.issue.username = this.$route.params.username
    this.issue.repository = this.$route.params.repository
    this.issue.number = this.$route.params.issue

    this.maked = doMaked()
    this.self = getUser()

    // 获取Issue信息
    this.issueInfo()

    // 获取 comment列表
    this.commentList()

    this.userInfo()
  },
  methods: {
    // 获取用户信息
    userInfo() {
      this.$http.get('/user/user', {
        params: {id: this.self.id}
      }).then(({data}) => {
        this.self = data
      })
    },
    issueInfo() {
      this.$http.get('/repo/issue', {
        params: {
          user: this.issue.username,
          repository: this.issue.repository,
          number: this.issue.number
        }
      }).then(({data}) => {
        Object.assign(this.issue, data)
        console.log(this.issue)
      })
    },
    commentList() {
      this.$http.get('/repo/issue/comments', {
        params: {
          user: this.issue.username,
          repository: this.issue.repository,
          issue: this.issue.number
        }
      }).then(({data}) => {
        this.issue.comments = data
        //for (let i = 0; i < data.length; i++)
        //document.getElementsByClassName('comment-content')[i].innerHTML = this.maked(data[i].content)
      })
    },
    loadContent(content) {
      return this.maked(content)
    },
    toUser(user) {
      this.$router.push({'name': 'overview', params: {username: user}})
    }

  }
}
</script>

<style>
@import '../../assets/css/code_style/article.css';
</style>

<style scoped>
div {
  padding: 0;
  border: 0;
  margin: 0;
}

.issue-head {
  margin-bottom: 20px;
  border-bottom: 1px solid #e1e4e8;
}

.issue-title {
  font-size: 32px;
}

.issue-number {
  margin-left: 10px;
  font-style: italic;
  font-size: 28px;
  color: #6a737d;
}

.issue-detail {
  margin: 10px 0;
  padding: 10px 0;
}

.issue-detail span {
  margin-left: 10px;
  font-size: 14px;
}

.issue-status {
  margin-left: 0;
  border-radius: 3px;
  padding: 6px 10px;
  font-weight: 600;
  line-height: 20px;
  color: #fff;
  background-color: #2cbe4e;
}

.issue-author {
  margin-left: 10px;
  font-weight: 600;
  color: #3f4448;
}


/* 评论区 */
.comment-issue, .comment-unit, .comment-create {
  font-size: 0;
}

.comment-avatar {
  display: inline-block;
  margin-right: 20px;
  vertical-align: top;
  width: 40px;
  height: 40px;
}

.comment-avatar img {
  border-radius: 20px;
  width: 40px;
  height: 40px;
}

.comment-mini {
  display: inline-block;
  margin-top: 0;
  border: 1px solid #d1d5da;
  border-radius: 4px;
  width: 800px;
}

.comment-mini.self {
  border-color: #c0d3eb;
}

.comment-create {
  margin-top: 20px;
}

/* 评论框 */

.comment-bar {
  border-bottom: 1px solid #d1d5da;
  padding: auto 0;
  height: 36px;
  background-color: #f6f8fa;
}

.self .comment-bar {
  border-bottom: 1px solid #c0d3eb;
  background-color: #f1f8ff;
}

.comment-title {
  display: inline-block;
  padding: 8px;
  width: 70%;
}

.comment-author {
  font-size: 16px;
  font-weight: 600;
}

.comment-time {
  margin-left: 10px;
  font-size: 12px;
}

.comment-bar-label {
  float: right;
  margin: 8px 0 8px 20px;
}

.comment-bar-label span {
  border: 1px solid #c0d3eb;
  border-radius: 3px;
  padding: 2px 4px;
  font-size: 12px;
  line-height: 16px;
}

.comment-bar-menu {
  float: right;
  margin: 8px 20px;
}

.comment-menu {
  cursor: pointer;
}

.comment-content {
  padding: 10px;
}

/* 其他*/
.comment-cable {
  margin-left: 100px;
  border-left: 3px solid #e1e4e8;
  height: 30px;
}

.dropdown-divider {
  border-top: 1px solid #d1d5da;
}

.comment-end {
  border-top: 3px solid #e1e4e8;
  width: 860px;
}
</style>