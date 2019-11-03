<template>
  <div :host="host" :owner="owner" :commenter="commenter" :time="time" :content="content" class="comment-mini">
    <div class="comment-bar">
      <div class="comment-title">
        <a @click="toUser(commenter)" href="javascript:void(0)" class="comment-author">{{commenter}}</a>
        <span class="comment-time">评论于 {{time}}</span>
      </div>
      <el-dropdown class="comment-bar-menu" trigger="click" @command="copyTocClipboard">
        <a class="comment-menu">
          <svg aria-label="Show options" viewBox="0 0 13 16" version="1.1" width="13" height="16" role="img">
            <path fill-rule="evenodd"
                  d="M1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM13 7.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
          </svg>
        </a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="copy">复制</el-dropdown-item>
          <el-dropdown-item>引用</el-dropdown-item>
          <div v-if="owner === commenter">
            <div class="dropdown-divider"></div>
            <el-dropdown-item>编辑</el-dropdown-item>
            <el-dropdown-item class="comment-menu-delete">删除</el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="comment-bar-label">
        <span v-if="owner || owner === commenter" class="label-owner">Owner</span>
        <span v-if="host === commenter" class="label-author">Author</span>
      </div>
    </div>
    <div class="comment-content"></div>
  </div>
</template>

<script>
import {doMaked} from '../../assets/js/maked'

export default {
  name: 'CommentView',
  props: {
    host: String,
    owner: String,
    commenter: String,
    time: String,
    content: String
  },
  data() {
    return {}
  },
  mounted() {
    this.maked = doMaked()
    document.getElementsByClassName('comment-content')[0].innerHTML = this.maked(this.content)
    console.log(this.content)
  },
  methods: {
    toUser(user) {
      this.$router.push({
        name: 'overview', params: {
          username: user
        }
      })
    },
    copyTocClipboard() {
      let obj = document.createElement('textarea')
      obj.value = this.content
      document.body.appendChild(obj)
      obj.select()
      document.execCommand('Copy')
      document.body.removeChild(obj)
    }
  }
}
</script>

<style scoped>
.comment-mini {
  border: 1px solid #c0d3eb;
  border-radius: 3px;
  min-width: 500px;
}

.comment-bar {
  border-bottom: 1px solid #c0d3eb;
  padding: auto 0;
  height: 36px;
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
  padding: 20px;
}

/* 其他*/
.dropdown-divider {
  border-top: 1px solid #d1d5da;
}
</style>