export default {
  install(Vue, options) {
    Vue.prototype.showTime = function (time) {
      const Day = ['周末', '周一', '周二', '周三', '周四', '周五', '周六']
      const Month = ['jan', 'feb', '三月', '四月', '五月', 'June', 'July', '八月', '九月', 'Oct', '十一月', '十二月']

      let dateBegin = new Date(time * 1000)
      let dateEnd = new Date()
      let seconds = (dateEnd - dateBegin) / 1000 // 秒数
      if (seconds < 0) return ' never'
      // 0 - 6分钟 =>just now
      else if (seconds < 600) return 'just now'
      // 6 - 60分钟
      else if (seconds < 3600)
        return Math.floor(seconds / 60) + ' mintues ago'

      // 小时计数
      let hours = Math.floor(seconds / 3600)
      if (hours < 24) return hours + ' 小时前'

      // 天
      const days = dateEnd.getDate() - dateBegin.getDate()
      if (days === 1) return '昨天'
      else if (days === 2) '前天'

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
