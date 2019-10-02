import axios from 'axios'
import qs from 'qs'

const HttpServer = {}

HttpServer.install = Vue => {
  axios.defaults.baseURL = 'http://gityou.com/api'
  axios.defaults.timeout = 6000
  axios.defaults.withCredentials = true // 携带cookie

  axios.interceptors.request.use(config => {
    if (config.method === 'get' || config.method === 'post' || config.method === 'put' || config.method === 'delete') {
      config.data = qs.stringify(config.data)
    }
    return config
  }, error => {
    console.error(error)
    return Promise.reject(error)
  })

  Vue.prototype.$http = axios
  Vue.prototype.$qs = qs
}

export default HttpServer