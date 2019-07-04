import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// const Page = () => import('@/views/Page')
const Home = () => import('@/views/Home/Home')
const Login = () => import('@/views/Login')
const RealTimeMonitor = name => () => import('@/views/Home/RealTimeMonitor/' + name)
const RealTimeLocation = name => () => import('@/views/Home/RealTimeLocation/' + name)
const PersonManagement = name => () => import('@/views/Home/PersonManagement/' + name)
const FallWaring = name => () => import('@/views/Home/FallWaring/' + name)
const CarsManagement = name => () => import('@/views/Home/CarsManagement/' + name)
const DeviceManagement = name => () => import('@/views/Home/DeviceManagement/' + name)
const AccountManagement = name => () => import('@/views/Home/AccountManagement/' + name)
// const communitybuilding = name => () => import('@/views/communitybuilding/' + name)
// const News = name => () => import('@/views/News/' + name)
export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Page',
    //   component: Page
    // },
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/RealTimeLocation',
      children: [
        // 实时监控
        {
          path: '/RealTimeLocation',
          name: 'RealTimeLocation',
          component: RealTimeLocation('RealTimeLocation')
        },
        {
          path: '/RealTimeMonitor',
          name: 'RealTimeMonitor',
          component: RealTimeMonitor('RealTimeMonitor')
        },
        // {
        //   path: '/realTimemonitor/MonitoringFence',
        //   name: 'MonitoringFence',
        //   component: RealTimeMonitor('MonitoringFence')
        // },
        // 人员管理
        {
          path: '/personManagement',
          name: 'PersonManagement',
          component: PersonManagement('PersonManagement')
        },
        // 设备管理
        {
          path: '/deviceManagement',
          name: 'DeviceManagement',
          component: DeviceManagement('DeviceManagement')
        },
        // 车辆管理
        {
          path: '/carsManagement',
          name: 'CarsManagement',
          component: CarsManagement('CarsManagement')
        },
        // 摔倒预警
        {
          path: '/fallWaring',
          name: 'FallWaring',
          component: FallWaring('FallWaring')
        },
        // 账号管理
        {
          path: '/accountManagement',
          name: 'AccountManagement',
          component: AccountManagement('AccountManagement')
        }
        // {
        //   path: '/editor',
        //   name: 'Editor',
        //   component: News('NewsEditor')
        // }
        // {
        //   path: '/communitybuilding',
        //   name: 'communitybuilding',
        //   component: communitybuilding('communitybuilding')
        // }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
