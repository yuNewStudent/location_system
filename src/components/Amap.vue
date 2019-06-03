<template>
  <div class="amap">
    <div id="container"></div>
    <div v-if='!isSetSafe'>
      <!-- <button @click='handleSatelliteLayer'>卫星图层</button>
      <button @click='handleStandLayer'>标准图层</button>
      <button @click='handleSetSafe'>设置安全区域</button> -->
    </div>
    <div ref='personInfo' class='windowinfo'>
      <h1>人员信息</h1>
      <p>姓名：{{personInfo.name}}</p>
      <p>年龄：{{personInfo.age}}</p>
      <p>所在位置：{{personInfo.address}}</p>
      <!-- <p>所在时长：2h20min</p> -->
      <p class="icon">
        <span style="margin-right: 10px" @click="getLngLat(personInfo.userDeviceId)">
          <img src="@/assets/img/icon/行动轨迹IC.png"/>
        </span>
      </p>
    </div>
    <div ref='carInfo' class='windowinfo'>
      <h1>车辆信息</h1>
      <p>车辆型号：{{carInfo.carModel}}</p>
      <p>车辆编号：{{carInfo.carNum}}</p>
      <p>紧急呼叫：{{carInfo.phone}}</p>
      <p>所在位置：{{carInfo.address}}</p>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap'
import SetSafe from './SetSafeArea'
import { setTimeout } from 'timers';
export default {
  name: 'amap',
  props: ['center', 'cars', 'persons'],
  data () {
    return {
      timer: null,
      map: null,
      // 卫星图层
      satelliteLayer: null,
      // 路网图层
      roadNetLayer: null,
      geocoder: null,
      isSetSafe: false,
      personInfo: {
        name: '',
        age: '',
        address: '',
        personInfo: ''
      },
      carInfo: {
        carModel: '',
        carNum: '',
        phone: '',
        address: ''
      }
    }
  },
  mounted () {
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
        center: this.center,
        // 地图显示范围
        zoom: 15
      })
      // 添加缩放标尺控件
      AMap.plugin(['AMap.Scale'], () => {
        this.map.addControl(new AMap.Scale())
      })
      AMap.plugin(['AMap.Geocoder'], () => {
        this.geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: 'all'
        })
      })
    },
    // 创建标记点位置
    drawArea () {
      // 绘制人员
      this.persons.forEach((item, index) => {
        this.translateGps(item.locationBean.longitude, item.locationBean.latitude).then(data => {
          
          this.drawMarker(data[0].lng, data[0].lat, 'person', index)
        })
      })
      // 绘制车辆
      this.cars.forEach((item, index) => {
        this.translateGps(item.locationBean.longitude, item.locationBean.latitude).then(data => {
          this.drawMarker(data[0].lng, data[0].lat, 'car', index)
        })
      })
    },
    // 绘制icon
    drawMarker (longitude, latitude, type, index) {
      this.map.setZoomAndCenter(15, [longitude, latitude])
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
        // 生成信息窗体
        // 改变中心点
        // this.map.setZoomAndCenter(15, [longitude, latitude])
        const address = this.getAddress(longitude, latitude)
        address.then(data => {
          let hh = this.creatInfo(type, index, data)
          hh.open(this.map, marker.getPosition())
        })
      })
    },
    // 生成信息窗体
    creatInfo (type, index, address) {
      var infoWindow
      if (type === 'person') {
        // 获取用户信息
        const info = this.persons[index]
        this.personInfo = {
          name: info.user.userName,
          age: this.getAge(info.user.userBirth),
          userDeviceId: info.user.userDeviceId,
          address
        }
        this.$refs.personInfo.style.display = 'block'
        infoWindow = new AMap.InfoWindow({
          // 使用默认信息窗体框样式，显示信息内容
          content: this.$refs.personInfo,
          offset: new AMap.Pixel(5, -30)
        })
      } else {
        // 获取车辆信息
        const info = this.cars[index]
        this.carInfo = {
          carModel: info.vehiclesTypeof,
          carNum: info.vehiclesNumBering,
          phone: info.vehiclesNsumber,
          address
        }
        this.$refs.carInfo.style.display = 'block'
        infoWindow = new AMap.InfoWindow({
          // 使用默认信息窗体框样式，显示信息内容
          content: this.$refs.carInfo,
          offset: new AMap.Pixel(5, -30)
        })
      }
      return infoWindow
    },
    getLngLat (userDeviceId) {
      this.$emit('showPersonLine', userDeviceId)
    },
    // 根据经纬度获取地址
    getAddress (lng, lat) {
      const lnglat = [lng, lat]
      return new Promise((resolve, reject) => {
        this.geocoder.getAddress(lnglat, (status, result) => {
          if (status === 'complete' && result.regeocode) {
            resolve(result.regeocode.formattedAddress)
          } else {
            alert(JSON.stringify(result))
          }
        })
      })
    },
    // 计算年龄
    getAge (str) {
      var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
      if (r === null) return false
      var d = new Date(r[1], r[3] - 1, r[4])
      if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {//eslint-disable-line
        var Y = new Date().getFullYear()
        return Y - r[1] + '岁'
      }
      return '输入的日期格式错误!'
    },
    // gps转高德坐标
    translateGps (lng, lat) {
      const gps = [lng, lat]
      return new Promise((resolve, reject) => {
        AMap.convertFrom(gps, 'gps', (status, result) => {
          if (result.info === 'ok') {
            resolve(result.locations)
          }
        })
      })
    }
  },
  watch: {
    // center变化，地图中心改变
    center (value) {
      this.map.setZoomAndCenter(18, value)
    },
    persons (value) {
      this.drawArea()
    } 

  },
  created () {
    this.$nextTick(() => {
      this.initMap()
      setTimeout(() => {
        this.drawArea()
      }, 2000)
    })
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.amap-logo{
  display: none;
}
.amap-copyright{
  opacity:0;
}
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
