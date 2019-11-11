<template>
  <div class="settings-frame group-line">
    <div class="vertical-menu left">
      <ul>
        <li class="disabled">个人设置</li>
        <router-link to="/settings/profile" tag="li" active-class="selected">个人资料</router-link>
        <router-link to="/settings/account" tag="li" active-class="selected">账户</router-link>
        <router-link to="/settings/security" tag="li" active-class="selected">安全</router-link>
        <router-link to="/settings/emails" tag="li" active-class="selected">邮箱</router-link>
        <router-link to="/settings/notifications" tag="li" active-class="selected">通知</router-link>
        <router-link to="/settings/keys" tag="li" active-class="selected">密钥管理</router-link>
        <router-link to="/settings/blocked" tag="li" active-class="selected">黑名单</router-link>
      </ul>
      <ul>
        <router-link to="/settings/developer" tag="li" active-class="selected">开发设置</router-link>
      </ul>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {getUser} from '@/assets/js/commons'

export default {
  name: 'settings',
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.user = getUser()
    if (this.user.id == null || this.user.id == '')
      this.$router.push({name: 'login'})
  },
  methods: {}
}
</script>


<style>
@import "../../assets/css/nav.css";
</style>
<style scoped>
.settings-frame {
  margin: 0 auto;
  width: 1024px;
}

.settings-frame .left {
  width: 25%
}

.settings-frame .right {
  width: 75%;
  font-size: 14px;
}
</style>