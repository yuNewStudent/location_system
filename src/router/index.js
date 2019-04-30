import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/views/Home')
const My = () => import('@/views/My')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/my',
      name: 'My',
      component: My
    }
  ]
})
