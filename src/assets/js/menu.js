const menus = {
  single: [
    {
      title: '人员管理',
      name: 'PersonManagement'
    },
    {
      title: '车辆管理',
      name: 'CarsManagement'
    },
    {
      title: '摔倒预警',
      name: 'FallWaring'
    },
    {
      title: '设备管理',
      name: 'DeviceManagement'
    }
  ],
  arr: {
    RealTimeMonitor: {
      title: '实时监控',
      name: 'RealTimeMonitor',
      group: [
        {
          title: '实时定位',
          name: 'RealTimeLocation'
        },
        {
          title: '监控围栏',
          name: 'MonitoringFence'
        }
      ]
    }
  }
}

export default menus
