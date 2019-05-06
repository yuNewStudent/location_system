<template>
  <div class="amap">
    <div v-if='!isSetSafe'>
      <div id="container"></div>
      <!-- <button @click='handleSatelliteLayer'>卫星图层</button>
      <button @click='handleStandLayer'>标准图层</button>
      <button @click='handleSetSafe'>设置安全区域</button> -->
    </div>
    <set-safe v-else></set-safe>
  </div>
</template>

<script>
import AMap from 'AMap'
import SetSafe from './SetSafeArea'
export default {
  name: 'amap',
  data () {
    return {
      map: null,
      // 卫星图层
      satelliteLayer: null,
      // 路网图层
      roadNetLayer: null,
      isSetSafe: false,
      persons: [
        {
          lng: 104.06406,
          lat: 30.54311,
          id: 0,
          type: 'car'
        },
        {
          lng: 104.06306,
          lat: 30.54411,
          id: 1,
          type: 'car'
        },
        {
          lng: 104.06606,
          lat: 30.54111,
          id: 2,
          type: 'car'
        },
        {
          lng: 104.06306,
          lat: 30.54311,
          id: 1,
          type: 'person'
        },
        {
          lng: 104.06206,
          lat: 30.54311,
          id: 2,
          type: 'person'
        },
        {
          lng: 104.06406,
          lat: 30.54611,
          id: 3,
          type: 'person'
        }
      ]
    }
  },
  components: {
    SetSafe
  },
  methods: {
    // 初始化地图
    initMap () {
      this.map = new AMap.Map('container', {
        // 调整窗口大小
        resizeEnable: true,
        // 设置中心点
        center: [104.06406, 30.54311],
        // 地图显示范围
        zoom: 16
      })
      // 添加缩放标尺控件
      AMap.plugin(['AMap.Scale'], () => {
        this.map.addControl(new AMap.Scale())
      })
    },
    // 创建标记点位置
    drawArea () {
      this.persons.forEach((item, index) => {
        this.drawMarker(item.lng, item.lat, item.type, index)
      })
    },
    // 绘制icon
    drawMarker (longitude, latitude, type, index) {
      var marker
      if (type === 'person') {
        marker = new AMap.Marker({
          icon: require('@/assets/img/icon/定位icon.png'),
          position: [longitude, latitude]
        })
      } else {
        marker = new AMap.Marker({
          icon: require('@/assets/img/icon/定位icon.png'),
          position: [longitude, latitude]
        })
      }
      // 鼠标点击marker弹出自定义的信息窗体
      AMap.event.addListener(marker, 'click', () => {
        // 获取用户信息
        const info = this.persons[index]
        console.log(info)
        // 生成信息窗体
        let hh = this.creatInfo(info)
        hh.open(this.map, this.map.getCenter())
      })
      this.map.add(marker)
    },
    // 生成信息窗体
    creatInfo () {
      let content = []
      content.push('<img src="http://tpc.googlesyndication.com/simgad/5843493769827749134">地址：北京市朝阳区阜通东大街6号院3号楼东北8.3公里')
      content.push('电话：010-64733333')
      content.push('<a href="https://ditu.amap.com/detail/B000A8URXB?citycode=110105">详细信息</a>')
      var infoWindow = new AMap.InfoWindow({
        isCustom: true,
        // 使用自定义窗体
        content: content.join(''),
        offset: new AMap.Pixel(16, -45)
      })
      return infoWindow
    }
    // 构造官方卫星、路网图层
    // initSatelliteLayer () {
    //   this.satelliteLayer = new AMap.TileLayer.Satellite()
    //   this.roadNetLayer = new AMap.TileLayer.RoadNet()
    //   this.map.add([this.satelliteLayer, this.roadNetLayer])
    // },
    // 显示卫星图层&路网图层
    // handleSatelliteLayer () {
    //   this.initSatelliteLayer()
    // },
    // 显示标准图层
    // handleStandLayer () {
    //   this.map.remove([this.satelliteLayer, this.roadNetLayer])
    // },
    // 显示设置安全区域
    // handleSetSafe () {
    //   this.isSetSafe = true
    // }
  },
  mounted () {
    this.$nextTick(() => {
      this.initMap()
      this.drawArea()
    })
    // this.timer = setInterval(this.getData, 2000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.amap {
  position: relative;
  #container {
    width: 100%;
    height: 80vh;
  }
}
</style>
