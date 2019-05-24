// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import Axios from 'axios'
import store from './store'
import Moment from 'moment'
var VueCookie = require('vue-cookie')
Vue.use(VueCookie)

Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.prototype.moment = Moment
Vue.use(ElementUI)

// 路由拦截
router.beforeEach((to, from, next) => {
  // 如果未登录， 只能跳转至登录页面或者注册页面
  const loginUser = JSON.parse(VueCookie.get('user'))
  if (!loginUser && to.name !== 'Login') {
    return next({ name: 'Login' })
  }
  next()
})
// 设置请求token
Axios.interceptors.request.use(config => {
  const user = JSON.parse(VueCookie.get('user'))
  if (user) {
    if (!config.params) {
      config.params = { token: user.token }
    } else if (config.url.indexOf('map/getAll') > -1) {
      config.params.userdecid = 9512494471
      config.params.token = user.token
    } else {
      config.params.token = user.token
    }
  }
  // config.headers['Authorization'] = 'bearer ' + token
  return config
})
// 请求返回拦截
Axios.interceptors.response.use(
  res => {
    // console.log(res)
    if (res.data.code === 400) {
      // app &&
      //   app.$message({
      //     type: 'warning',
      //     message: '登录身份过期，请重新登录。'
      //   })
      // sessionStorage.removeItem('token')
      // sessionStorage.removeItem('user')
      // // router.push({ name: 'login' })
      // return Promise.reject(new Error('身份过期'))
    } else {
      return res.data
    }
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
