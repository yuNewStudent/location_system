<template>
  <div class="amap">
    <div id="container"></div>
    <!--个人信息人员信息-->
    <div class="information" v-if="informationx">
      <div class="information_h">
        <div class="information_hl">
          <h1><img src="@/assets/img/人员信息详情_IC.png">人员信息</h1>
        </div>
        <div class="information_hr">
        </div>
      </div>
      <div class="information_c">
        <el-table
          :data="tableData"
          :row-style="carInqwqwfo"
          height="250"
          width="250"
          size="mini"
          style="background: transparent;"
          :header-cell-style="tableHeaderColor"
          :default-sort = "{prop: 'date', order: 'descending'}"
          >
          <el-table-column prop="userName" label="姓名" fixed></el-table-column>
          <el-table-column label="性别" prop="userGender" sortable align="center">
            <template slot-scope="scope">
              <span type="success" v-if="scope.row.userGender==1">男</span>
              <span type="success" v-if="scope.row.userGender==0">女</span>
            </template>
          </el-table-column>
          <el-table-column prop="userBirth" label="年龄" sortable>
            <template slot-scope="scope">
              <span type="success">{{getAge(scope.row.userBirth)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userStatus" label="状态" sortable>
            <template slot-scope="scope">
              <span type="success" v-if="scope.row.userStatus==1">在线</span>
              <span type="success" v-if="scope.row.userStatus==0">离线</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--个人信息车辆信息-->
    <div class="Vinformation" v-if="vinformationx">
      <div class="Vinformation_h">
        <div class="Vinformation_hl">
          <h1><img src="@/assets/img/车辆信息—IC.png">车辆信息</h1>
        </div>
        <div class="Vinformation_hr">
          <h1>
            <!-- <i class="el-icon-arrow-down"></i> -->
          </h1>
        </div>
      </div>
      <div class="Vinformation_c">
        <el-table
          :data="tableData1"
          :row-style="carInqwqwfo"
          height="250"
          width="250"
          size="mini"
          style="background: transparent;"
          :header-cell-style="tableHeaderColor"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="vehiclesTypeof" label="型号"></el-table-column>
          <el-table-column prop="vehiclesUseunit" label="使用单位"></el-table-column>
          <el-table-column prop="vehiclesNsumber" label="联系电话"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="dinformation" v-if="dinformationx">
      <div class="dinformation_h">
        <div class="dinformation_hl">
          <h1><img src="@/assets/img/人员信息—IC.png">人员信息详情</h1>
        </div>
        <div class="dinformation_hr">
          <h1>
            <!-- <i class="el-icon-arrow-down"></i> -->
          </h1>
        </div>
      </div>
      <div class="dinformation_c">
        <div class="dinformation_cl">
          <ul>
            <li>
              <h1>
                姓名:{{personInfo.name}}
                <span v-if="personInfo.userGender==1">性别:男</span>
                <span v-if="personInfo.userGender==0">性别:女</span>
                <span>年龄:{{personInfo.age}}</span>
                <span v-if="personInfo.userStatus==0">状态:离线</span>
                <span v-if="personInfo.userStatus==1">状态:在线</span>
              </h1>
              <h1>
                设备ID:{{personInfo.userDeviceId}}
                <span>联系电话:{{personInfo.userNumber}}</span>
              </h1>
              <h1>
                是否有病历:是<font @click="open4" style="border-bottom: 1px solid;cursor:pointer;color: #ff6500;margin-left: 10px;">查看</font>
                <span>是否存在过敏原:对花粉过敏</span>
              </h1>
              <h1>家庭地址:{{personInfo.address}}</h1>
              <!-- <h1>
                紧急联系人:苏姗(父女)
                <span>紧急联系人电话:15828658729</span>
              </h1> -->
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="pinformation" v-if="pinformationx">
      <div class="pinformation_h">
        <div class="pinformation_hl">
          <h1><img src="@/assets/img/报警信息_IC.png">报警信息</h1>
        </div>
        <div class="pinformation_hr">
          <h1>
            <!-- <i class="el-icon-arrow-down"></i> -->
          </h1>
        </div>
      </div>
      <div class="pinformation_c">
        <div class="pinformation_cl">
          <ul v-if="fallWarnings.length>0">
            <li v-for="(item, index) in fallWarnings" :key="index">
              <h1>
                {{item.fallTime}}
                <span>{{item.fallAddress}}进行{{item.fallNpeople}}报警</span>
              </h1>
            </li>
          </ul>
          <ul v-else>
            <li style="text-align: center;">
              <h1>无数据</h1>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="informationx">
      <ul>
        <li @click="dinformation">
          <img src="@/assets/img/人员信息收缩.png">
        </li>
        <li @click="vinformation">
          <img src="@/assets/img/车辆信息收缩.png">
        </li>
        <li @click="informationh">
          <img src="@/assets/img/人员信息详情收缩IC.png">
        </li>
        <li @click="pinformation">
          <img src="@/assets/img/报警信息收缩IC.png">
        </li>
      </ul>
    </div>
    <div v-if="!isSetSafe">
      <!-- <button @click='handleSatelliteLayer'>卫星图层</button>
      <button @click='handleStandLayer'>标准图层</button>
      <button @click='handleSetSafe'>设置安全区域</button>-->
    </div>
    <div ref="personInfo" class="windowinfo">
      <h1>人员信息</h1>
      <p>姓名：{{personInfo.name}}</p>
      <p>年龄：{{personInfo.age}}</p>
      <p>所在位置：{{personInfo.address}}</p>
      <!-- <p>所在时长：2h20min</p> -->
      <p class="icon">
        <span style="margin-right: 10px" @click="getLngLat(personInfo.userDeviceId)">
          <img src="@/assets/img/icon/行动轨迹IC.png">
        </span>
      </p>
    </div>
    <div ref="carInfo" class="windowinfo">
      <h1>车辆信息</h1>
      <p>车辆型号：{{carInfo.carModel}}</p>
      <p>车辆编号：{{carInfo.carNum}}</p>
      <p>紧急呼叫：{{carInfo.phone}}</p>
      <p>所在位置：{{carInfo.address}}</p>
    </div>
  </div>
</template>

<script>
import AMap from "AMap";
import SetSafe from "./SetSafeArea";
import { setTimeout } from "timers";
export default {
  name: "amap",
  props: ["center", "cars", "persons"],
  data() {
    return {
      timer: null,
      map: null,
      informationx:true,
      vinformationx:true,
      pinformationx:true,
      dinformationx:true,
      tableData: [
      ],
      tableData1: [],
      // 卫星图层
      satelliteLayer: null,
      // 路网图层
      roadNetLayer: null,
      geocoder: null,
      isSetSafe: false,
      personInfo: {
        name: "",
        age: "",
        address: "",
        userGender: "",
        userNumber: "",
        userDeviceId: "",
        userStatus: "",
        personInfo: ""
      },
      fallWarnings: [],
      carInfo: {
        carModel: "",
        carNum: "",
        phone: "",
        address: ""
      }
    };
  },
  components: {
    SetSafe
  },
  methods: {
    //人员信息隐藏
    informationh() {
      this.informationx = !this.informationx;
    },
    open4() {
      this.$message.error('功能模块还在开发中...');
    },
    //车辆信息隐藏
    vinformation(){
      this.vinformationx=!this.vinformationx;
    },
    //报警信息隐藏
    pinformation(){
      this.pinformationx=!this.pinformationx;
    },
    //人员信息隐藏
    dinformation(){
      this.dinformationx=!this.dinformationx;
    },
    //报警信息
    getFallWarnings() {
      this.$http.get(`${config.httpBaseUrl}/fall/getAll`).then(res => {
        if (res.code === 200) {
          this.fallWarnings = res.date.falls;
        }
      });
    },
    getPersons() {
      // // 获取所有人员
      this.$http.get(`${config.httpBaseUrl}/user/getAll`).then(res => {
        if (res.code === 200) {
          this.tableData = res.date.users
          console.log(this.tableData)
        }
      });
    },
    // 获取车辆
    getCars() {
      // 服务器获取车辆
      this.$http
        .get(`${config.httpBaseUrl}/vehucle/getAllVehucle`)
        .then(res => {
          if (res.code === 200) {
            this.tableData1 = res.date.vhucles;
          }
        });
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    carInqwqwfo(row, rowIndex) {
      return "background:transparent;color:#FFFFFF;border-bottom: 1px solid rgba(6,50,110,0.8)";
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background:rgba(6,50,110,0.8);color:#FFFFFF;border:1px solid rgba(0,160,233,1);";
      }
    },
    // 初始化地图
    initMap() {
      this.map = new AMap.Map("container", {
        // 调整窗口大小
        resizeEnable: true,
        // 设置中心点
        center: this.center,
        // 地图显示范围
        zoom: 15
      });
      // 添加缩放标尺控件
      AMap.plugin(["AMap.Scale"], () => {
        this.map.addControl(new AMap.Scale());
      });
      AMap.plugin(["AMap.Geocoder"], () => {
        this.geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all"
        });
      });
    },
    // 创建标记点位置
    drawArea() {
      // 绘制人员
      this.persons.forEach((item, index) => {
        this.translateGps(
          item.locationBean.longitude,
          item.locationBean.latitude
        ).then(data => {
          this.drawMarker(data[0].lng, data[0].lat, "person", index);
        });
      });
      // 绘制车辆
      this.cars.forEach((item, index) => {
        this.translateGps(
          item.locationBean.longitude,
          item.locationBean.latitude
        ).then(data => {
          this.drawMarker(data[0].lng, data[0].lat, "car", index);
        });
      });
    },
    // 绘制icon
    drawMarker(longitude, latitude, type, index) {
      this.map.setZoomAndCenter(15, [longitude, latitude]);
      var marker;
      if (type === "person") {
        marker = new AMap.Marker({
          icon: require("@/assets/img/icon/定位icon.png"),
          position: [longitude, latitude]
        });
      } else {
        marker = new AMap.Marker({
          icon: require("@/assets/img/icon/车辆IC.png"),
          position: [longitude, latitude]
        });
      }
      this.map.add(marker);
      // 鼠标点击marker弹出自定义的信息窗体
      marker.on("click", event => {
        // 生成信息窗体
        // 改变中心点
        // this.map.setZoomAndCenter(15, [longitude, latitude])
        const address = this.getAddress(longitude, latitude);
        address.then(data => {
          let hh = this.creatInfo(type, index, data);
          hh.open(this.map, marker.getPosition());
        });
      });
    },
    // 生成信息窗体
    creatInfo(type, index, address) {
      var infoWindow;
      if (type === "person") {
        // 获取用户信息
        const info = this.persons[index];
        this.personInfo = {
          name: info.user.userName,
          age: this.getAge(info.user.userBirth),
          userGender: info.user.userGender,
          userNumber: info.user.userNumber,
          userDeviceId: info.user.userDeviceId,
          userStatus: info.user.userStatus,
          address
        };
        this.$refs.personInfo.style.display = "block";
        infoWindow = new AMap.InfoWindow({
          // 使用默认信息窗体框样式，显示信息内容
          content: this.$refs.personInfo,
          offset: new AMap.Pixel(5, -30)
        });
      } else {
        // 获取车辆信息
        const info = this.cars[index];
        this.carInfo = {
          carModel: info.vehiclesTypeof,
          carNum: info.vehiclesNumBering,
          phone: info.vehiclesNsumber,
          address
        };
        this.$refs.carInfo.style.display = "block";
        infoWindow = new AMap.InfoWindow({
          // 使用默认信息窗体框样式，显示信息内容
          content: this.$refs.carInfo,
          offset: new AMap.Pixel(5, -30)
        });
      }
      return infoWindow;
    },
    getLngLat(userDeviceId) {
      this.$emit("showPersonLine", userDeviceId);
    },
    // 根据经纬度获取地址
    getAddress(lng, lat) {
      const lnglat = [lng, lat];
      return new Promise((resolve, reject) => {
        this.geocoder.getAddress(lnglat, (status, result) => {
          if (status === "complete" && result.regeocode) {
            resolve(result.regeocode.formattedAddress);
          } else {
            alert(JSON.stringify(result));
          }
        });
      });
    },
    // 计算年龄
    getAge(str) {
      var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
      if (r === null) return false;
      var d = new Date(r[1], r[3] - 1, r[4]);
      if (
        d.getFullYear() == r[1] &&
        d.getMonth() + 1 == r[3] &&
        d.getDate() == r[4]
      ) {
        //eslint-disable-line
        var Y = new Date().getFullYear();
        return Y - r[1] + "岁";
      }
      return "输入的日期格式错误!";
    },
    // gps转高德坐标
    translateGps(lng, lat) {
      const gps = [lng, lat];
      return new Promise((resolve, reject) => {
        AMap.convertFrom(gps, "gps", (status, result) => {
          if (result.info === "ok") {
            resolve(result.locations);
          }
        });
      });
    }
  },
  watch: {
    // center变化，地图中心改变
    center(value) {
      this.map.setZoomAndCenter(18, value);
    },
    persons(value) {
      this.drawArea();
    }
  },
  created() {
    this.$nextTick(() => {
      this.initMap();
      setTimeout(() => {
        this.drawArea();
      }, 2000);
    });
    this.getFallWarnings();
    this.getCars();
    this.getPersons();
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
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
    z-index: 6;
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
    top: 30px;
    left: 10px;
    position: absolute;
    z-index: 9999;
    .information_hl {
      width: 250px;
      line-height:50px;
      line-height: 50px;
      text-align: center;
      float: left;
      color: #ffffff;
      background: rgba(14, 73, 118, 1);
    }
    .information_hl h1 img{
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
      width: 250px;
      margin-top: 50px;
      background: rgba(6, 50, 110, 0.8);
      border: 1px solid rgba(0, 160, 233, 1);
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
    width: 250px;
    top: 30px;
    right: 10px;
    position: absolute;
    z-index: 9999;
    .Vinformation_hl {
      width: 250px;
      line-height: 50px;
      text-align: center;
      float: left;
      color: #ffffff;
      background: rgba(14, 73, 118, 1);
    }
    .Vinformation_hl h1 img{
      margin-right: 5px;
      height: 15px;
      width: 15px;
    }
    .Vinformation_hr {
      width: 30px;
      float: right;
      text-align: center;
      line-height: 50px;
      color: #ffffff;
      background: rgba(14, 73, 118, 1);
    }
    .Vinformation_c {
      width: 250px;
      margin-top: 50px;
      background: rgba(6, 50, 110, 0.8);
      border: 1px solid rgba(0, 160, 233, 1);
      box-shadow: 0px 0px 50px #267cf2 inset;
      .el-table th,
      .el-table tr {
        background: rgba(6, 50, 110, 0.8) !important;
      }
    }
    .Vinformation_cl {
      padding: 5px;
    }
  }
  .dinformation {
    width: 600px;
    bottom: 0px;
    left: 10px;
    position: absolute;
    z-index: 9999;
    .dinformation_hl {
      width: 600px;
      line-height: 50px;
      text-align: center;
      float: left;
      color: #ffffff;
      background: rgba(14, 73, 118, 1);
    }
    .dinformation_hl h1 img{
      margin-right: 5px;
      height: 15px;
      width: 15px;
    }
    .dinformation_hr {
      width: 30px;
      float: right;
      text-align: center;
      line-height: 50px;
      color: #ffffff;
      background: rgba(14, 73, 118, 1);
    }
    .dinformation_c {
      width: 600px;
      margin-top: 50px;
      background: rgba(6, 50, 110, 0.8);
      // border:1px solid rgba(0,160,233,1);
      box-shadow: 0px 0px 50px #267cf2 inset;
    }
    .dinformation_cl {
      padding: 5px;
    }
    .dinformation_cl li h1{
      line-height: 25px;
    }
    .dinformation_cl li h1 {
      color: #ffffff;
    }
    .dinformation_cl li span {
      margin-left: 100px;
      text-align: left;
    }
  }
  .pinformation {
    width: 300px;
    bottom: 0px;
    height: 160px;
    right: 10px;
    position: absolute;
    z-index: 9999;
    .pinformation_hl {
      width: 300px;
      line-height: 50px;
      text-align: center;
      float: left;
      color: #ffffff;
      background: rgba(14, 73, 118, 1);
    }
    .pinformation_hl h1 img{
      margin-right: 5px;
      height: 15px;
      width: 15px;
    }
    .pinformation_hr {
      width: 30px;
      float: right;
      text-align: center;
      line-height: 50px;
      color: #ffffff;
      background: rgba(14, 73, 118, 1);
    }
    .pinformation_c {
      width: 300px;
      margin-top: 50px;
      background: rgba(6, 50, 110, 0.8);
      // border:1px solid rgba(0,160,233,1);
      box-shadow: 0px 0px 50px #267cf2 inset;
    }
    .pinformation_cl {
      padding: 5px;
    }
    .pinformation_cl li {
      line-height: 20px;
    }
    .pinformation_cl li h1 {
      color: #ffffff;
      width: 300px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .pinformation_cl li span {
      margin-left: 2px;
      text-align: left;
    }
  }
  .informationx{
    width: 50px;
    bottom:10px;
    right:0px;
    position: absolute;
    z-index: 9999;
  }
  .informationx li{
    cursor:pointer;
  }
}
</style>
