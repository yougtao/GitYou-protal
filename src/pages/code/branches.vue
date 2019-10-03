<template>
  <div>
    <div class="default-branch">
      <div class="branch-title">
        <span>Default branch</span>
      </div>
      <ul class="branch-ul">
        <li v-for="branch in branches" :key="branch.name" class="branch-li">
          <div class="branch-info">
            <span class="branch-name"><a @click="toBranch(branch.name)" href="javascript:void(0)">{{ branch.name }}</a></span>
            <span class="branch-time">最后更新于 {{ showTime(branch.time) }}</span>
            <span class="branch-author"><a @click="toUser(branch.author)" href="javascript:void(0)">{{ branch.author }}</a></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'branches',
  data() {
    return {
      repository: {
        user: '',
        name: ''
      },
      branches: []
    }
  },
  mounted() {
    this.repository.user = this.$route.params.username
    this.repository.name = this.$route.params.repository

    this.$http.get('/repo/branch/list', {
      params: {
        user: this.repository.user,
        name: this.repository.name
      }
    }).then(({data}) => {
      this.branches = data
    })
  },
  methods: {
    toBranch(name) {},
    toUser(name) {}
  },
  computed: {
    showTime() {
      const Day = ['周末', '周一', '周二', '周三', '周四', '周五', '周六']
      const Month = ['jan', 'feb', '三月', '四月', '五月', 'June', 'July', '八月', '九月', 'Oct', '十一月', '十二月']
      return (time) => {
        let dateBegin = new Date(time * 1000)
        let dateEnd = new Date()
        let seconds = (dateEnd - dateBegin) / 1000 // 秒数
        if (seconds < 0) return ' never'
        // 0 - 6分钟 =>just now
        else if (seconds < 600) return 'just now'
        // 6 - 60分钟
        else if (seconds < 3600)
          return Math.floor(seconds / 60) + 'mintues ago'

        // 小时计数
        let hours = Math.floor(seconds / 3600)
        if (hours < 24) return hours + ' 小时前'

        // 天
        const days = dateEnd.getDate() - dateBegin.getDate()
        if (days == 1) return '昨天'
        else if (days == 2) '前天'

        if (days < 7) {
          const day = dateEnd.getDay() - (dateBegin.getDay() === 0 ? 7 : dateBegin.getDay())
          if (day < 0) return '上' + Day[dateBegin.getDay()]
          else return Day[dateBegin.getDay()]
        } else if (days < 30) return days + ' 天前'

        // 年
        if (days > 365) return (dateEnd.getFullYear - dateBegin.getFullYear()) + ' 年前'

        // 月
        const months = dateEnd.getMonth() - dateBegin.getMonth()
        if (months <= 0) return '去年' + Month[dateBegin.getMonth()]
        else return months + ' 个月前'
      }
    }
  }
}
</script>

<style scoped>
a {
  text-decoration-line: none;
  color: #0366d6;
}

a:hover {
  text-decoration-line: underline;
  color: #0366d6;
}

.branch-title {
  border: 1px solid #dfe2e5;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  padding: 8px 10px;
  text-align: left;
  background-color: #f6f8fa;
  font-weight: 600;
}

.branch-ul {
  margin: 0;
  border-left: 1px solid #dfe2e5;
  border-right: 1px solid #dfe2e5;
  padding-left: 0;
}

.branch-li {
  border-bottom: 1px solid #dfe2e5;
  padding: 8px 10px;
  list-style: none;
  text-align: left;
}

.branch-info {
  display: inline-block;
  width: 360px;
  text-align: left;
}


.branch-name {
  border-radius: 3px;
  padding: 3px 5px;
  background-color: #eaf5ff;
  
}

.branch-time {
  margin-left: 10px;
  text-align: left;
  font-size: 12px;
}

.branch-author {
  margin-left: 10px;
  font-size: 14px;
}
</style>