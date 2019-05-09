<template>
  <div class="amap">
    <div id="container"></div>
    <div v-if='!isSetSafe'>
      <!-- <button @click='handleSatelliteLayer'>卫星图层</button>
      <button @click='handleStandLayer'>标准图层</button>
      <button @click='handleSetSafe'>设置安全区域</button> -->
    </div>
    <!-- <set-safe v-else></set-safe> -->
    <div ref='info' class='windowinfo'>
      <h1>人员信息</h1>
      <p>姓名：苏老大</p>
      <p>年龄：57</p>
      <p>所在位置：四川成都锦江区春熙路</p>
      <p>所在时长：2h20min</p>
      <p class="icon">
        <span style="margin-right: 10px" @click="getLngLat">
          <img src="@/assets/img/icon/行动轨迹IC.png"/>
        </span>
        <!-- <span>
          <img style = "width: 16px" src="@/assets/img/icon/报警次数IC.png"/>
        </span> -->
      </p>
    </div>
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
          type: 'person'
        },
        {
          lng: 104.06306,
          lat: 30.54411,
          id: 1,
          type: 'person'
        },
        {
          lng: 104.07606,
          lat: 30.54111,
          id: 2,
          type: 'person'
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
      ],
      cars: [
        {
          lng: 104.06106,
          lat: 30.55111,
          id: 0,
          type: 'car'
        },
        {
          lng: 104.06706,
          lat: 30.54611,
          id: 1,
          type: 'car'
        },
        {
          lng: 104.07406,
          lat: 30.54311,
          id: 2,
          type: 'car'
        },
        {
          lng: 104.06206,
          lat: 30.54411,
          id: 1,
          type: 'car'
        },
        {
          lng: 104.06106,
          lat: 30.54811,
          id: 2,
          type: 'car'
        },
        {
          lng: 104.06806,
          lat: 30.54711,
          id: 3,
          type: 'car'
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
      // 绘制人员
      this.persons.forEach((item, index) => {
        this.drawMarker(item.lng, item.lat, item.type, index)
      })
      // 绘制车辆
      this.cars.forEach((item, index) => {
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
          icon: require('@/assets/img/icon/车辆IC.png'),
          position: [longitude, latitude]
        })
      }
      this.map.add(marker)
      // 鼠标点击marker弹出自定义的信息窗体
      marker.on('click', (event) => {
        // 获取用户信息
        const info = this.persons[index]
        // 生成信息窗体
        let hh = this.creatInfo(info)
        hh.open(this.map, marker.getPosition())
      })
    },
    // 生成信息窗体
    creatInfo () {
      this.$refs.info.style.display = 'block'
      var infoWindow = new AMap.InfoWindow({
        // 使用默认信息窗体框样式，显示信息内容
        content: this.$refs.info,
        offset: new AMap.Pixel(0, -30)
      })
      return infoWindow
    },
    getLngLat () {
      this.$emit('showPersonLine')
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
  .windowinfo {
    display: none;
    padding: 5px 0 0;
    font-size: 15px;
    z-index: 6;
    h1 {
      font-size: 18px;
      color: #FFBF05;
      line-height: 30px;
      margin-bottom: 10px;
    }
    p {
      line-height: 25px;
    }
    .icon {
      text-align: right;
      >span {
        display: inline-block;
        text-align: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid #3393A3;
        img {
          margin-top: 7px;
          width: 12px;
          height: 15px;
        }
      }
    }
  }
}
</style>
