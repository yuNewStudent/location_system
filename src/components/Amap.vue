<template>
  <div class="amap">
    <div id="container"></div>
    <div class="layer">
      <button @click='handleSatelliteLayer'
              :class="{active: isSatelliteLayer}">卫星地图</button>
      <!-- <button @click='handleStandLayer'>标准图层</button>
      <button @click='handleSetSafe'>设置安全区域</button>-->
    </div>
    <!--个人信息人员信息-->
    <div class="information"
         v-if="informationx">
      <div class="information_h">
        <div class="information_hl">
          <h1><img src="@/assets/img/人员信息详情_IC.png">人员信息</h1>
        </div>
      </div>
      <div class="information_c">
        <el-table :data="tableData"
                  :row-style="carInqwqwfo"
                  height="250"
                  width="250"
                  size="mini"
                  style="background: transparent;"
                  :header-cell-style="tableHeaderColor"
                  @row-click='personRowClick'>
          <el-table-column align='center'
                           prop="userName"
                           label="姓名"></el-table-column>
          <el-table-column :filters="[{ text: '男', value: '1' }, { text: '女', value: '0' }]"
                           :filter-method="filterSex"
                           label="性别"
                           prop="userGender"
                           align="center">
            <template slot-scope="scope">
              <span type="success"
                    v-if="scope.row.userGender==1">男</span>
              <span type="success"
                    v-if="scope.row.userGender==0">女</span>
            </template>
          </el-table-column>
          <el-table-column align='center'
                           :filters="ages"
                           :filter-method="filterAge"
                           prop="userBirth"
                           label="年龄">
            <template slot-scope="scope">
              <span type="success">{{getAge(scope.row.userBirth)}}</span>
            </template>
          </el-table-column>
          <el-table-column align='center'
                           :filters="[{ text: '在线', value: 1 }, { text: '离线', value: 0 }]"
                           :filter-method="filterStatus"
                           prop="userStatus"
                           label="状态">
            <template slot-scope="scope">
              <span type="success"
                    v-if="scope.row.userStatus==1">在线</span>
              <span type="success"
                    v-if="scope.row.userStatus==0">离线</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--个人信息车辆信息-->
    <div class="Vinformation"
         v-if="vinformationx">
      <div class="Vinformation_h">
        <div class="Vinformation_hl">
          <h1><img src="@/assets/img/车辆信息—IC.png">车辆信息</h1>
        </div>
      </div>
      <div class="Vinformation_c">
        <el-table :data="tableData1"
                  :row-style="carInqwqwfo"
                  height="250"
                  width="250"
                  size="mini"
                  style="background: transparent;"
                  :header-cell-style="tableHeaderColor"
                  :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column align='center'
                           prop="vehiclesTypeof"
                           label="型号"
                           show-overflow-tooltip></el-table-column>
          <el-table-column align='center'
                           prop="vehiclesUseunit"
                           label="使用单位"
                           show-overflow-tooltip></el-table-column>
          <el-table-column align='center'
                           prop="vehiclesNsumber"
                           label="联系电话"
                           show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="dinformation"
         v-if="dinformationx">
      <div class="dinformation_h">
        <div class="dinformation_hl">
          <h1><img src="@/assets/img/人员信息—IC.png">人员信息详情</h1>
        </div>
      </div>
      <div class="dinformation_c">
        <div class="dinformation_cl">
          <ul>
            <li class="userinfo">
              <span>姓名:{{personInfo.name}}</span>
              <span>性别:
                <span v-if="personInfo.userGender===1">男</span>
                <span v-if="personInfo.userGender===0">女</span>
              </span>
              <span>年龄:{{personInfo.age}}</span>
              <span>状态:
                <span v-if="personInfo.userStatus===0">离线</span>
                <span v-if="personInfo.userStatus===1">在线</span>
              </span>
            </li>
            <li>
              <span class="left">设备ID:{{personInfo.userDeviceId}}</span>
              <span class="right">联系电话:{{personInfo.userNumber}}</span>
            </li>
            <li>
              <span class="left">是否有病历:是<font @click="open4"
                      style="border-bottom: 1px solid;cursor:pointer;color: #ff6500;margin-left: 10px;">查看</font></span>
              <span class="right">是否存在过敏原:<font @click="open4"
                      style="border-bottom: 1px solid;cursor:pointer;color: #ff6500;margin-left: 10px;">查看</font></span>
            </li>
            <li>家庭地址:{{personInfo.address}}</li>
            <!-- <li>
              紧急联系人:苏姗(父女)
              <span>紧急联系人电话:15828658729</span>
            </li> -->
          </ul>
        </div>
      </div>
    </div>
    <div class="pinformation"
         v-if="pinformationx">
      <div class="pinformation_h">
        <div class="pinformation_hl">
          <h1><img src="@/assets/img/报警信息_IC.png">报警信息</h1>
        </div>
      </div>
      <div class="pinformation_c">
        <ul class="pinformation_cl"
            v-if="fallWarnings.length>0">
          <li v-for="(item, index) in fallWarnings"
              :key="index">
            {{item.alarminformationDate}}
            <span>{{item.alarminformationName || '无人员信息'}}进行{{getType(item.alarminformationType)}}</span>
            {{item.alarminformationLatandlong}}
          </li>
        </ul>
        <ul v-else>
          <li style="text-align: center;">
            <h1>无数据</h1>
          </li>
        </ul>
      </div>
    </div>
    <div class="informationx">
      <ul>
        <li @click="informationh">
          <img src="@/assets/img/人员信息收缩.png">
        </li>
        <li @click="vinformation">
          <img src="@/assets/img/车辆信息收缩.png">
        </li>
        <li @click="dinformation">
          <img src="@/assets/img/人员信息详情收缩IC.png">
        </li>
        <li @click="pinformation">
          <img src="@/assets/img/报警信息收缩IC.png">
        </li>
      </ul>
    </div>
    <div ref="personInfo"
         class="windowinfo">
      <h1>人员信息</h1>
      <!-- <p>姓名：{{personInfo.name}}</p> -->
      <!-- <p>年龄：{{personInfo.age}}</p> -->
      <!-- <p>所在时长：2h20min</p> -->
      <p>所在位置：{{personInfo.address}}</p>
      <p class="icon">
        <span style="margin-right: 10px"
              @click="getLngLat(personInfo.userDeviceId)">
          <img src="@/assets/img/icon/行动轨迹IC.png">
        </span>
      </p>
    </div>
    <div ref="carInfo"
         class="windowinfo">
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
export default {
  name: 'amap',
  props: ['center', 'cars', 'persons'],
  data () {
    return {
      timer: null,
      map: null,
      informationx: false,
      vinformationx: false,
      pinformationx: false,
      dinformationx: false,
      tableData: [
      ],
      tableData1: [],
      // 卫星图层
      satelliteLayer: null,
      // 路网图层
      roadNetLayer: null,
      geocoder: null,
      isSatelliteLayer: false,
      personInfo: {
        name: '',
        age: '',
        address: '',
        userGender: '',
        userNumber: '',
        userDeviceId: '',
        userStatus: '',
        personInfo: ''
      },
      fallWarnings: [],
      carInfo: {
        carModel: '',
        carNum: '',
        phone: '',
        address: ''
      },
      currentCenter: null,
      ages: [
        { text: '0 - 10 岁', value: [0, 10] },
        { text: '11 - 20 岁', value: [11, 20] },
        { text: '21 - 50 岁', value: [21, 40] },
        { text: '51 - 60 岁', value: [51, 60] },
        { text: '61 - 70 岁', value: [61, 70] },
        { text: '71 - 80 岁', value: [71, 80] },
        { text: '81 岁及以上', value: [81] }
      ]
      // satellite: null
    }
  },
  components: {
    SetSafe
  },
  methods: {
    // 人员信息隐藏
    informationh () {
      this.informationx = !this.informationx
    },
    open4 () {
      this.$message.error('功能模块还在开发中...')
    },
    // 车辆信息隐藏
    vinformation () {
      this.vinformationx = !this.vinformationx
    },
    // 报警信息隐藏
    pinformation () {
      this.pinformationx = !this.pinformationx
    },
    // 人员信息隐藏
    dinformation () {
      this.dinformationx = !this.dinformationx
    },
    // 报警信息
    getFallWarnings () {
      // 获取报警
      const data = {
        startdate: '',
        enddate: '',
        userId: '',
        page: 0,
        type: ''
      }
      this.$http.get(`${config.httpBaseUrl}/fall/getAll`, {
        params: data
      }).then((res) => {
        if (res.code === 200) {
          // 处理位置信息
          res.date.falls.map(item => {
            if (!item.alarminformationLatandlong || item.alarminformationLatandlong === '0') {
              item.alarminformationLatandlong = '无位置信息'
              return this.fallWarnings.push(item)
            }
            const lng = item.alarminformationLatandlong.split('-')[0]
            const lat = item.alarminformationLatandlong.split('-')[1]
            this.translateGps(lng, lat).then(data => {
              this.getAddress(data[0].lng, data[0].lat).then(data => {
                item.alarminformationLatandlong = data
                this.fallWarnings.push(item)
              })
            })
          })
        }
      })
    },
    getPersons () {
      // // 获取所有人员
      this.$http.get(`${config.httpBaseUrl}/user/getAll`).then(res => {
        if (res.code === 200) {
          this.tableData = res.date.users
        }
      })
    },
    // 获取车辆
    getCars () {
      // 服务器获取车辆
      this.$http
        .get(`${config.httpBaseUrl}/vehucle/getAllVehucle`)
        .then(res => {
          if (res.code === 200) {
            this.tableData1 = res.date.vhucles
          }
        })
    },
    filterTag (value, row) {
      return row.tag === value
    },
    carInqwqwfo (row, rowIndex) {
      return 'background:transparent;color:#FFFFFF;font-size:14px'
    },
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'height: 40px;background:rgba(6,50,110,0.8);color:#FFFFFF;border:1px solid rgba(0,160,233,1);font-size:14px'
      }
    },
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
      // 添加卫星地图层
      this.satellite = new AMap.TileLayer.Satellite()
      this.satellite.setMap(this.map)
      this.satellite.hide()
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
        this.translateGps(
          item.locationBean.longitude,
          item.locationBean.latitude
        ).then(data => {
          this.drawMarker(data[0].lng, data[0].lat, 'person', index)
        })
      })
      // 绘制车辆
      this.cars.forEach((item, index) => {
        this.translateGps(
          item.locationBean.longitude,
          item.locationBean.latitude
        ).then(data => {
          this.drawMarker(data[0].lng, data[0].lat, 'car', index)
        })
      })
    },
    // 获取报警类型
    getType (type) {
      switch (type) {
        case 'fence':
          return '电子围栏报警'
        case 'electricity':
          return '低电量报警'
        case 'sos':
          return 'sos报警'
      }
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
      marker.on('click', event => {
        // 生成信息窗体
        // 改变中心点
        // this.map.setZoomAndCenter(15, [longitude, latitude])
        const address = this.getAddress(longitude, latitude)
        this.currentCenter = [longitude, latitude]
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
        const info = this.tableData[index]
        this.personInfo = {
          name: info.userName,
          age: this.getAge(info.userBirth),
          userGender: info.userGender,
          userNumber: info.userNumber,
          userDeviceId: info.userDeviceId,
          userStatus: info.userStatus,
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
      this.$emit('showPersonLine', userDeviceId, this.currentCenter)
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
      if (
        d.getFullYear() == r[1] && //eslint-disable-line
        d.getMonth() + 1 == r[3] && //eslint-disable-line
        d.getDate() == r[4] //eslint-disable-line
      ) {
        //eslint-disable-line
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
    },
    // 通过性别筛选
    filterSex (value, row, column) {
      return row.userGender == value // eslint-disable-line
    },
    // 通过年龄筛选
    filterAge (value, row, column) {
      let birth = this.getAge(row.userBirth)
      let age = birth.slice(0, birth.length - 1)
      if (value.length === 1) {
        return age >= value[0]
      }
      return age >= value[0] && age <= value[1]
    },
    // 通过状态筛选
    filterStatus (value, row, column) {
      return row.userStatus === value
    },
    personRowClick (row, column, event) {
      console.log(row, column, event)
    },
    // 切换卫星图层
    handleSatelliteLayer () {
      console.log(this.isSatelliteLayer)
      if (this.isSatelliteLayer) {
        this.satellite.hide()
        this.isSatelliteLayer = false
      } else {
        this.satellite.show()
        this.isSatelliteLayer = true
      }
    }
  },
  watch: {
    // center变化，地图中心改变
    center (value) {
      this.translateGps(value[0], value[1]).then(data => {
        console.log(data)
        this.map.setZoomAndCenter(15, [data[0].lng, data[0].lat])
      })
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
    this.getFallWarnings()
    this.getCars()
    this.getPersons()
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.amap-logo {
  display: none;
}
.amap-copyright {
  opacity: 0;
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
    z-index: 3;
    h1 {
      font-size: 18px;
      color: #ffbf05;
      line-height: 30px;
      margin-bottom: 10px;
    }
    p {
      line-height: 25px;
    }
    .icon {
      text-align: right;
      > span {
        display: inline-block;
        text-align: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid #3393a3;
        img {
          margin-top: 7px;
          width: 12px;
          height: 15px;
        }
      }
    }
  }
  .information {
    width: 250px;
    top: 10px;
    left: 10px;
    position: absolute;
    z-index: 3;
    .information_hl {
      width: 250px;
      line-height: 50px;
      line-height: 50px;
      text-align: center;
      float: left;
      color: #ffffff;
      background: rgba(14, 73, 118, 1);
    }
    .information_hl h1 img {
      margin-right: 5px;
      height: 15px;
      width: 15px;
    }
    .information_hr {
      width: 30px;
      float: right;
      text-align: center;
      line-height: 50px;
      color: #ffffff;
      background: rgba(14, 73, 118, 1);
    }
    .information_c {
      font-size: 14px;
      width: 250px;
      margin-top: 50px;
      background: rgba(6, 50, 110, 0.8);
      box-shadow: 0px 0px 50px #267cf2 inset;
      .el-table th,
      .el-table tr {
        background: rgba(6, 50, 110, 0.8) !important;
      }
    }
    .information_cl {
      padding: 5px;
    }
  }
  .Vinformation {
    width: 320px;
    top: 10px;
    right: 10px;
    position: absolute;
    z-index: 3;
    .Vinformation_hl {
      width: 320px;
      line-height: 50px;
      text-align: center;
      float: left;
      color: #ffffff;
      background: rgba(14, 73, 118, 1);
      h1 img {
        margin-right: 5px;
        height: 15px;
        width: 15px;
      }
    }
    .Vinformation_c {
      width: 320px;
      margin-top: 50px;
      background: rgba(6, 50, 110, 0.8);
      box-shadow: 0px 0px 50px #267cf2 inset;
      // .el-table th,
      // .el-table tr {
      //   background: rgba(6, 50, 110, 0.8) !important;
      // }
      .Vinformation_cl {
        padding: 5px;
      }
    }
  }
  .dinformation {
    // width: 58%;
    bottom: 0px;
    left: 10px;
    position: absolute;
    z-index: 3;
    .dinformation_hl {
      width: 520px;
      line-height: 50px;
      text-align: center;
      float: left;
      color: #ffffff;
      background: rgba(14, 73, 118, 1);
      h1 img {
        margin-right: 5px;
        height: 15px;
        width: 15px;
      }
    }
    .dinformation_c {
      width: 520px;
      margin-top: 50px;
      background: rgba(6, 50, 110, 0.8);
      box-shadow: 0px 0px 50px #267cf2 inset;
      font-size: 14px;
      .dinformation_cl {
        padding: 5px;
        line-height: 25px;
        color: #ffffff;
        // li > span {
        //   margin-left: 70px;
        //   text-align: left;
        // }
        // li {
        //   display: flex;
        //   justify-content: space-between;
        //   >span {
        //     margin-right: 20px;
        //   }
        // }
        .userinfo {
          // display: flex;
          // justify-content: space-between;
          > span {
            display: inline-block;
            width: 24%;
            // margin-right: 20px;
          }
        }
        .left {
          display: inline-block;
          // margin-left: 0;
          width: 250px;
        }
        .right {
          // margin-left: 150px;
        }
      }
    }
  }
  .pinformation {
    position: absolute;
    width: 40%;
    bottom: 0px;
    height: 160px;
    right: 10px;
    z-index: 3;
    .pinformation_hl {
      width: 100%;
      line-height: 50px;
      text-align: center;
      float: left;
      color: #ffffff;
      background: rgba(14, 73, 118, 1);
      img {
        margin-right: 5px;
        height: 15px;
        width: 15px;
      }
    }
    .pinformation_c {
      font-size: 14px;
      width: 100%;
      margin-top: 50px;
      background: rgba(6, 50, 110, 0.8);
      box-shadow: 0px 0px 50px #267cf2 inset;
      .pinformation_cl {
        width: 100%;
        color: #ffffff;
        padding: 5px;
        height: 110px;
        box-sizing: border-box;
        overflow-y: scroll;
        li {
          width: 95%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 5px 0;
          line-height: 20px;
        }
      }
    }
  }
  .informationx {
    width: 50px;
    bottom: 10px;
    right: 10px;
    position: absolute;
    z-index: 3;
  }
  .informationx li {
    cursor: pointer;
  }
}
.layer {
  position: absolute;
  top: 5px;
  right: 5px;
  color: red;
  z-index: 2;
  // button {
  //   background: white;
  //   outline: none;
  //   border: none;
  // }
  button.active {
    color: #009cf9;
  }
}
</style>
