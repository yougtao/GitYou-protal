let Common = {}

Common.install = function (Vue, options) {
  Vue.prototype.verifyUser = function () {
    this.$http.post('/user/auth/verify').then(({data}) => {
      console.log('verify验证成功')
    }).catch(() => {
      this.$router.push({name: 'login'})
    })
  }
}

export default Common