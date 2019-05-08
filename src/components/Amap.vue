<template>
  <div class="amap">
    <div id="container"></div>
    <div v-if='!isSetSafe'>
      <!-- <button @click='handleSatelliteLayer'>卫星图层</button>
      <button @click='handleStandLayer'>标准图层</button>
      <button @click='handleSetSafe'>设置安全区域</button> -->
    </div>
    <!-- <set-safe v-else></set-safe> -->
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
          lat: 30.55311,
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
          lng: 104.07606,
          lat: 30.54111,
          id: 2,
          type: 'car'
        },
        {
          lng: 104.06006,
          lat: 30.54311,
          id: 1,
          type: 'person'
        },
        {
          lng: 104.06206,
          lat: 30.54911,
          id: 2,
          type: 'person'
        },
        {
          lng: 104.06906,
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
        zoom: 15
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
      this.map.add(marker)
      // 鼠标点击marker弹出自定义的信息窗体
      AMap.event.addListener(marker, 'click', (event) => {
        // 获取用户信息
        const info = this.persons[index]
        // 生成信息窗体
        let hh = this.creatInfo(info)
        hh.open(this.map, marker.getPosition())
      })
    },
    // 生成信息窗体
    creatInfo () {
      var warning = require('@/assets/img/icon/报警次数IC.png')
      var line = require('@/assets/img/icon/行动轨迹IC.png')
      var info = `<div style = 'padding: 5px 0 0; font-size: 15px;'>
        <h1 style = 'font-size: 18px; color: #FFBF05; line-height: 30px; margin-bottom: 10px;'>人员信息</h1>
        <p style = 'line-height: 25px'>姓名：苏老大</p>
        <p style = 'line-height: 25px'>年龄：57</p>
        <p style = 'line-height: 25px'>所在位置：四川成都锦江区春熙路</p>
        <p style = 'line-height: 25px'>所在时长：2h20min</p>
        <p style = 'line-height: 25px; text-align: right'>
          <span style = "display: inline-block; margin-right: 10px" onclick = "${getLngLat(event, this)}">
            <img style = "width:12px" src="${line}"/>
          </span>
          <span style="display:inline-block">
            <img style = "width: 16px" src="${warning}"/>
          </span>
        </p>
      </div>`
      function getLngLat (event, self) {
        self.$emit('showPersonLine')
      }
      // width:30px;height:30px;border-radius:50%;text-align:center;
      var infoWindow = new AMap.InfoWindow({
        // 使用默认信息窗体框样式，显示信息内容
        content: info,
        offset: new AMap.Pixel(0, -30)
      })
      return infoWindow
    },
    ggg () {
      console.log(1)
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
  async mounted () {
    await this.$nextTick(() => {
      this.initMap()
    })
    this.drawArea()
    // this.timer = setInterval(this.getData, 2000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.amap {
  position: relative;
  height: 100%;
  #container {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
  }
}
</style>
