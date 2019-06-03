<template>
  <div class="RealTimeLocation">
    <el-row class="header">
      <div class="search">
        <input
          type="text"
          v-model="filterQuery"
          placeholder="请输入人名或车辆编号"
          class="searchInput">
        <span
          class="searchBtn"
          @click='handleFilter'>
          <img src="@/assets/img/icon/搜索IC.png" alt="">
        </span>
      </div>
      <div class="legends">
        <span class="old_man">
          <span></span>
          老人
        </span>
        <span class="car">
          <span></span>
          车辆
        </span>
      </div>
    </el-row>
    <el-main>
      <map-page
        @showPersonLine='showPersonLine'
        :center='currentCenter'
        :persons='persons'
        :cars='cars'></map-page>
    </el-main>
    <person-line
      v-if='isPersonLine'
      @close='closePersonLine'
      :userDeviceId='userDeviceId'></person-line>
  </div>
</template>

<script>
import MapPage from '@/components/Amap'
import PersonLine from '@/components/PersonLine'
export default {
  data () {
    return {
      isPersonLine: false,
      currentCenter: [104.0574050, 30.540512],
      filterQuery: '',
      websock: null,
      userDeviceId: '',
      persons: [],
      cars: []
    }
  },
  created () {
    this.getPersonPosition()
    this.getCarPosition()
    this.timer = setInterval(() => {
      this.getPersonPosition()
      this.getCarPosition()
    }, 60000)
  },
  destroyed () {
    // 页面销毁时关闭长连接
    // this.websocketclose()
  },
  methods: {
    // 展示人员路径页面
    showPersonLine (userDeviceId) {
      this.userDeviceId = userDeviceId
      this.isPersonLine = true
    },
    // 关闭人员路径页面
    closePersonLine () {
      this.isPersonLine = false
    },
    // 搜索人员或车辆，将结果展示在地图中心
    handleFilter () {
      if (isNaN(this.filterQuery)) {
        this.persons.forEach(item => {
          if (item.name === this.filterQuery) {
            this.currentCenter = [item.lng, item.lat]
          }
        })
      } else {
        this.cars.forEach(item => {
          if (item.carNum === this.filterQuery) {
            this.currentCenter = [item.lng, item.lat]
          }
        })
      }
    },
    // 获取车辆和用户信息
    getPersonPosition () {
      this.$http.get(`${config.httpBaseUrl}/map/getPositioning`).then((res) => {
        if (res.code === 200) {
          this.persons = res.date.maplocaltions.filter(item => {
            return item.locationBean.longitude && true
          })
        }
      })
    },
    getCarPosition () {
      this.$http.get(`${config.httpBaseUrl}/map/getVuPositioning`).then((res) => {
        if (res.code === 200) {
          this.cars = res.date.maplocaltions.filter(item => {
            return item.locationBean.longitude && true
          })
        }
      })
    }
  },
  components: {
    MapPage,
    PersonLine
  }
}
</script>

<style lang="scss" scoped>
.RealTimeLocation {
  position: relative;
  height: 100%;
  .header {
    padding: 0 20px;
    >div {
      display: inline-block;
    }
    .searchInput {
      box-sizing: border-box;
      font-size: 16px;
      width: 250px;
      height: 40px;
      border-radius: 40px;
      outline: none;
      background: transparent;
      border: 2px solid #313131;
      padding: 0 10px;
      color: white;
    }
    .searchBtn {
      display: inline-block;
      width: 50px;
      line-height: 40px;
      text-align: center;
      border-radius: 0 40px 40px 0;
      color: red;
      background: #313131;
      vertical-align: top;
      margin-left: -50px;
      img {
        width: 24px;
        height: 20px;
        position: relative;
        top: 3px;
      }
    }
    .legends {
      margin-left: 160px;
      .old_man {
        display: inline-block;
        color: #0C4F62;
        >span {
          display: inline-block;
          width: 16px;
          height: 16px;
          background: #0C4F62;
        }
      }
      .car {
        margin-left: 60px;
        display: inline-block;
        color: #F06749;
        line-height: 19px;
        >span {
          display: inline-block;
          width: 16px;
          height: 16px;
          background: #F06749;
        }
      }
    }
  }
  .el-main {
    padding: 0 20px;
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0px;
  }
}
</style>
