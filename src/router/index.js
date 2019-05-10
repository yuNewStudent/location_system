import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Home = () => import('@/views/Home')
const Login = () => import('@/views/Login')
const RealTimeMonitor = name => () => import('@/views/RealTimeMonitor/' + name)
const PersonManagement = name => () => import('@/views/PersonManagement/' + name)
const FallWaring = name => () => import('@/views/FallWaring/' + name)
const CarsManagement = name => () => import('@/views/CarsManagement/' + name)
const DeviceManagement = name => () => import('@/views/DeviceManagement/' + name)
const AccountManagement = name => () => import('@/views/AccountManagement/' + name)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/realTimeMonitor',
      children: [
        // 实时监控
        {
          path: '/realTimeMonitor',
          name: 'RealTimeMonitor',
          component: RealTimeMonitor('RealTimeLocation')
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
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
