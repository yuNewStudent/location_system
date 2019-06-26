<template>
  <div class='MessageBox'>
    <div class='add_user_wrapper'>
      <div class="user">
        <header><img src="@/assets/img/icon/人员信息IC.png" alt=""> 人员信息</header>
        <div class="userInfo">
          <p>
            <span>姓名: {{person.userName}}</span>
            <span>性别: {{person.userGender === 0 ? '女': '男'}}</span>
          </p>
          <p>
            <span>年龄: {{getAge(person.birth||'2011-10-20')}}</span>
            <span>所处状态: 报警</span>
          </p>
          <p v-if='DeviceInfo.locationBean'>
            所在位置: {{currentAddress}}{{getCurAddress(DeviceInfo.locationBean.longitude, DeviceInfo.locationBean.latitude)}}
          </p>
          <!-- <p>
            所在时长: 2h30min
          </p> -->
          <p>
            电话号码: {{person.userNumber}}
          </p>
          <div class="img">
            <div class="action_track">
              <span @click='handleShowLine'>
                <img src="@/assets/img/icon/行动轨迹IC.png" alt="">
              </span>
              <p>行动轨迹</p>
            </div>
            <!-- <div class="warning_num">
              <span>
                <img src="@/assets/img/icon/报警次数IC.png" alt="">
              </span>
              <p>报警次数</p>
            </div> -->
          </div>
        </div>
        <header><img src="@/assets/img/icon/人员信息IC.png" alt=""> 紧急联系人</header>
        <div class="contact" v-if='person.emergencycs'>
          <p>
            <span>姓名: {{person.emergencycs[0].emergencycsName}}</span>
            <span>关系: {{person.emergencycs[0].emergencycsRelationShip}}</span>
          </p>
          <p>联系电话: {{person.emergencycs[0].emergencycsNumber}}</p>
          <p>辅助电话: {{person.emergencycs[0].emergencycrsNumber1}}</p>
        </div>
      </div>
      <div class="map">
        <div id="container"></div>
        <el-button type='warning' size='mini' @click="hnadleRanging">测距</el-button>
      </div>
      <el-button @click='handleClose' type="danger" icon="el-icon-close" circle></el-button>
    </div>
    <person-line
      v-if='isPersonLine'
      @close='close'
      :userDeviceId='currentDeviceId'></person-line>
    <div ref='carInfo' class='windowinfo'>
      <h1>车辆信息</h1>
      <p>车辆型号：{{currentcarinfo.vehiclesTypeof}}</p>
      <p>车辆编号：{{currentcarinfo.vehiclesNumBering}}</p>
      <p>紧急呼叫：{{currentcarinfo.vehiclesNsumber}}</p>
      <p>所在位置：{{currentAddress}}</p>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap'
import PersonLine from '@/components/PersonLine'
export default {
  props: ['currentDeviceId'],
  data () {
    return {
      map: null,
      ranging: null,
      isPersonLine: false,
      person: {
        // lng: 104.06406,
        // lat: 30.54311,
        // type: 'person'
      },
      cars: [
        // {
        //   lng: 104.06006,
        //   lat: 30.54311,
        //   id: 1,
        //   type: 'car'
        // }
      ],
      DeviceInfo: {},
      geocoder: null,
      currentAddress: '',
      currentcarinfo: {}
    }
  },
  components: {
    PersonLine
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
      AMap.plugin(['AMap.Geocoder'], () => {
        this.geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: 'all'
        })
      })
      // 默认样式测距
      this.ranging = new AMap.RangingTool(this.map)
    },
    // 关闭窗口
    handleClose () {
      this.$emit('close')
    },
    handleShowLine () {
      this.isPersonLine = true
    },
    close () {
      this.isPersonLine = false
    },
    // 绘制icon
    drawMarker (longitude, latitude, type, index) {
      this.translateGps(longitude, latitude).then(data => {
        const lnglat = [data[0].lng, data[0].lat]
        this.hhh(lnglat).then(data => {
          var marker
          if (type === 'person') {
            marker = new AMap.Marker({
              icon: require('@/assets/img/icon/定位icon.png'),
              position: lnglat
            })
          } else {
            marker = new AMap.Marker({
              icon: require('@/assets/img/icon/车辆IC.png'),
              position: lnglat
            })
            // 鼠标点击marker弹出自定义的信息窗体
            marker.on('click', (event) => {
              // 生成信息窗体
              // 改变中心点
              // this.map.setZoomAndCenter(15, [longitude, latitude])
              // const address = this.getAddress(longitude, latitude)
              // address.then(data => {
              let hh = this.creatInfo(index)
              hh.open(this.map, marker.getPosition())
              // })
            })
          }
          this.map.add(marker)
        })
      })
    },
    // 生成信息窗体
    creatInfo (index) {
      var infoWindow
      // 获取车辆信息
      this.currentcarinfo = this.cars[index]
      this.$refs.carInfo.style.display = 'block'
      infoWindow = new AMap.InfoWindow({
        // 使用默认信息窗体框样式，显示信息内容
        content: this.$refs.carInfo,
        offset: new AMap.Pixel(5, -30)
      })
      return infoWindow
    },
    // 附近车辆
    handleNeberCar () {
      // const nebercar = this.cars.slice()
    },
    // 测距
    hnadleRanging () {
      this.ranging.turnOn()
    },
    // 获取人员信息
    getPersonInfo () {
      this.$http.get(`${config.httpBaseUrl}/user/get`, {
        params: {
          userDeviceId: this.currentDeviceId
        }
      }).then(res => {
        if (res.code === 200) {
          this.person = res.date.user[0]
        }
      })
    },
    // 获取单个设备
    getDeviceInfo () {
      this.$http.get(`${config.httpBaseUrl}/map/getMapuser`, {
        params: {
          userId: this.currentDeviceId
        }
      }).then(res => {
        if (res.code === 200) {
          this.DeviceInfo = res.date.pos
          // 绘制当前人
          this.map.setZoomAndCenter(14, [this.DeviceInfo.locationBean.longitude, this.DeviceInfo.locationBean.latitude])
          this.drawMarker(this.DeviceInfo.locationBean.longitude, this.DeviceInfo.locationBean.latitude, 'person')
        }
      })
    },
    // 获取车辆
    getCars () {
      this.$http.get(`${config.httpBaseUrl}/map/getVuPositioning`).then((res) => {
        if (res.code === 200) {
          this.cars = res.date.maplocaltions.filter(item => {
            return item.locationBean.longitude && true
          })
          this.cars.forEach((item, index) => {
            this.drawMarker(item.locationBean.longitude, item.locationBean.latitude, 'car', index)
          })
        }
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
    // 根据经纬度获取地址
    getCurAddress (lng, lat) {
      this.translateGps(lng, lat).then(data => {
        const lnglat = [data[0].lng, data[0].lat]
        this.hhh(lnglat).then(data => {
          this.currentAddress = data
        })
      })
    },
    hhh (lnglat) {
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
  mounted () {
    this.$nextTick(() => {
      this.initMap()
      this.getPersonInfo()
      this.getDeviceInfo()
      this.getCars()
    })
  }
}
</script>

<style lang="scss" scoped>
.MessageBox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3;
  border-radius: 10px;
  .add_user_wrapper {
    position: relative;
    margin: 60px 30px 0;
    border-radius: 10px;
    background: black;
    padding: 20px 10px;
    display: flex;
    >.el-button {
      position: absolute;
      top: 3px;
      right: -7px;
      padding: 6px;
      font-size: 30px;
    }
    .user {
      color: white;
      font-size: 14px;
      width: 400px;
      background-color: rgb(84, 92, 100);
      padding: 5px 10px 0;
      .userInfo {
        padding: 10px 50px 20px 20px;
        border-bottom: 2px solid #3F3F3F;
        p {
          display: flex;
          line-height: 30px;
          span:first-child  {
            flex: 1
          }
          span:last-child  {
            width: 100px;
          }
        }
        .img {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          > div {
            text-align: center;
            font-size: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            span {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
            &.action_track {
              color: #3393A3;
              span {
                border: 1px solid #3393A3;
              }
            }
            &.warning_num {
             color: #F23D3D;
              span {
                border: 1px solid #F23D3D;
              }
            }
            &.nearby_cars {
              color: #1E92E0;
              span {
                border: 1px solid #1E92E0;
              }
            }
            img {
              width: 20px;
              height: 20px;
              margin-top: 10px;
            }
          }
        }
      }
      .contact {
        padding: 10px 50px 10px 20px;
        p {
          line-height: 30px;
          display: flex;
          span:first-child  {
            flex: 1
          }
          span:last-child  {
            width: 100px;
          }
        }
      }
      header {
        padding-top: 5px;
        font-size: 16px;
        color: #FFBF05;
        line-height: 30px;
        img {
          width: 14px;
          height: 14px;
        }
      }
    }
    .map {
      flex: 1;
      position: relative;
      #container {
        height: 80vh;
      }
      .el-button {
        position: absolute;
        top: 10px;
        left: 10px;
      }
    }
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
