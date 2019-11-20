<template>
  <div class="settings-item">
    <h2>通知</h2>
    <div class="box">
      <div class="box-row">
        <h4>参与中的</h4>
        <p>Notifications for the conversations you are participating in, or if someone cites you with an @mention.</p>
        <div class="d-flex">
          <label>
            <input type="checkbox" @change="changeItem('participating')" v-model="settings.participating.web"/>Web
          </label>
          <label>
            <input type="checkbox" @change="changeItem('participating')" v-model="settings.participating.email"/>Email
          </label>
          <span class="update-status">
            <svg v-if="settings.participating.status ==='waiting'" class="waiting" width="16px" height="16px" viewBox="0 0 100 100"
                 preserveAspectRatio="xMidYMid" style="background: none;" aria-hidden="true">
              <circle cx="50" cy="50" fill="none" stroke="#eca611" stroke-width="10" r="35" stroke-dasharray="164.9 56.9"
                      transform="rotate(59.5912 50 50)">
                <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1"
                                  dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
              </circle>
            </svg>
            <svg v-else-if="settings.participating.status ==='success'" class="success" width="12" height="16" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
            </svg>
            <svg v-else-if="settings.participating.status ==='fail'" class="fail" width="12" height="16" aria-hidden="true">
              <svg width="12" height="16" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path>
              </svg>
            </svg>
          </span>
        </div>
      </div>
      <div class="box-row">
        <h4>Watching</h4>
        <p>Notifications for all repositories, teams, or conversations you’re watching.</p>
        <div class="d-flex">
          <label>
            <input type="checkbox" @change="changeItem('watching')" v-model="settings.watching.web"/>Web
          </label>
          <label>
            <input type="checkbox" @change="changeItem('watching')" v-model="settings.watching.email"/>Email
          </label>
          <span class="update-status">
            <svg v-if="settings.watching.status ==='waiting'" class="waiting" width="16px" height="16px" viewBox="0 0 100 100"
                 preserveAspectRatio="xMidYMid" style="background: none;" aria-hidden="true">
              <circle cx="50" cy="50" fill="none" stroke="#eca611" stroke-width="10" r="35" stroke-dasharray="164.9 56.9"
                      transform="rotate(59.5912 50 50)">
                <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1"
                                  dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
              </circle>
            </svg>
            <svg v-else-if="settings.watching.status ==='success'" class="success" width="12" height="16" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
            </svg>
            <svg v-else-if="settings.watching.status ==='fail'" class="fail" width="12" height="16" aria-hidden="true">
              <svg width="12" height="16" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path>
              </svg>
            </svg>
          </span>
        </div>
      </div>
      <div class="box-row">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notifications',
  data() {
    return {
      settings: {
        participating: {
          web: false,
          email: false,
          status: 'none'
        },
        watching: {
          web: false,
          email: false,
          status: 'none'
        }
      }
    }
  },
  mounted() {
    this.settingsInfo()
  },
  methods: {
    settingsInfo() {
      this.$http.get('/user/settings', {params: {user: this.$parent.user.id}}).then(({data}) => {
        console.log(typeof data.notificationParticipating)
        this.settings.participating.web = data.notificationParticipating & 1
        this.settings.participating.email = data.notificationParticipating & 2

        this.settings.watching.web = data.notificationWatching & 1
        this.settings.watching.email = data.notificationWatching & 2
      })
    },
    changeItem(item) {
      this.settings[item].status = 'waiting'
      let data = {
        user: this.$parent.user.id,
        key: 'notification_' + item
      }

      if (item === 'participating')
        data.value = (this.settings.participating.web ? 1 : 0) + (this.settings.participating.email ? 2 : 0)
      else if (item === 'watching')
        data.value = (this.settings.watching.web ? 1 : 0) + (this.settings.watching.email ? 2 : 0)
      else
        return

      this.$http.put('/user/settings/notification', data).then(({data}) => {
        this.settings[item].status = 'success'
      }).catch(() => {
        this.settings[item].status = 'fail'
      })
    }
  },
  computed: {}
}
</script>

<style>
@import "../../../assets/css/commons.css";
</style>
<style scoped>

</style>