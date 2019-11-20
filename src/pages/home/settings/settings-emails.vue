<template>
  <div class="settings-item">
    <h2>邮箱设置</h2>
    <div class="box">
      <div v-for="email in emails" class="box-row">
        <span>{{email.email}}</span>
        <span v-if="email.type & 32" class="tab-primary">主要的</span>
      </div>
    </div>
    <div class="block">
      <h4>添加新的邮箱</h4>
      <input id="add-email" type="text" v-model="settings.addEmail" placeholder="">
      <button @click="modifyEmail('add')">添加</button>
    </div>
    <div class="block">
      <h4>主邮箱设置</h4>
      <select @change="modifyEmail('primary_change')" v-model="settings.primaryEmail">
        <option v-for="email in emails" :value="email.id">{{email.email}}</option>
      </select>
    </div>
  </div>
</template>

<script>
import {verify} from '@/assets/js/commons'

export default {
  name: 'emails',
  data() {
    return {
      settings: {
        primaryEmail: 0,
        addEmail: ''
      },
      emails: []
    }
  },
  created() {
    this.emailInfo()
  },
  methods: {
    emailInfo() {
      this.$http.get('/user/settings/email', {params: {user: this.$parent.user.id}}).then(({data}) => {
        this.emails = data
        for (let i = 0; i < data.length; i++)
          if (this.emails[i].type & 32) {
            this.settings.primaryEmail = this.emails[i].id
            break
          }
      })
    },
    modifyEmail(key, value) {
      let data = {
        user: this.$parent.user.id,
        key: key
      }

      if (key === 'add') {
        const e = document.getElementById('add-email')
        if (!verify(this.settings.addEmail, 'email')) {
          e.className = 'error'
          return
        }
        e.className = ''
        data.value = this.settings.addEmail
      } else if (key === 'primary_change') {
        data.value = this.settings.primaryEmail
      } else {
        return
      }

      this.$http.put('/user/settings/email', data).then(({data}) => {
        if (!data) return

        if (key === 'add') {
          this.emailInfo()
          this.settings.addEmail = ''
          this.$message.success({message: '添加成功!', duration: 1200})
        } else if (key === 'primary_change') {
          this.$message.success({message: '修改成功!', duration: 1200})
        }
      })
    }
  }
}
</script>

<style scoped>
.tab-primary {
  margin-left: 10px;
  border-radius: 3px;
  padding: 3px 4px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background-color: #28a745;
  box-shadow: inset 0 -1px 0 rgba(27, 31, 35, .12);
}


</style>