<template>
  <div class="RealTimeLocation">
    <el-row class="header">
      <div class="search">
        <input type="text"
               v-model="filterQuery"
               placeholder="请输入人名或车辆编号"
               class="searchInput">
        <span class="searchBtn"
              @click='handleFilter'>
          <img src="@/assets/img/icon/搜索IC.png"
               alt="">
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
      <map-page @showPersonLine='showPersonLine'
                :center='currentCenter'
                :persons='persons'
                :cars='cars'></map-page>
    </el-main>
    <person-line v-if='isPersonLine'
                 @close='closePersonLine'
                 :userDeviceId='userDeviceId'
                 :center='currentCenter'></person-line>
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
    showPersonLine (userDeviceId, currentCenter) {
      this.userDeviceId = userDeviceId
      this.currentCenter = currentCenter
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
          if (item.user.userName === this.filterQuery) {
            this.currentCenter = [item.locationBean.longitude, item.locationBean.latitude]
          }
        })
      } else {
        this.cars.forEach(item => {
          if (item.carNum === this.filterQuery) {
            this.currentCenter = [item.locationBean.longitude, item.locationBean.latitude]
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
    padding: 0px;
    > div {
      display: inline-block;
    }
    .search {
      border: 1px solid rgba(54, 153, 255, 1);
      border-radius: 40px;
    }
    .searchInput {
      box-sizing: border-box;
      font-size: 16px;
      width: 250px;
      height: 35px;
      border-radius: 35px;
      outline: none;
      background: transparent;
      padding: 0 10px;
      color: white;
    }
    .searchBtn {
      display: inline-block;
      width: 50px;
      line-height: 35px;
      text-align: center;
      background: rgba(0, 123, 201, 1);
      vertical-align: top;
      margin-left: -50px;
      border-radius: 0 40px 40px 0;
      img {
        width: 24px;
        height: 20px;
        position: relative;
        top: 3px;
      }
    }
    .legends {
      margin-left: 20px;
      color: white;
      .old_man {
        display: inline-block;
        > span {
          display: inline-block;
          width: 16px;
          height: 16px;
          background: #0c4f62;
        }
      }
      .car {
        margin-left: 30px;
        display: inline-block;
        line-height: 19px;
        > span {
          display: inline-block;
          width: 16px;
          height: 16px;
          background: #f06749;
        }
      }
    }
  }
  .el-main {
    margin-top: -15px;
    padding: 0;
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0px;
  }
  .information {
    width: 300px;
    height: 50px;
    position: absolute;
    top: 10px;
    background: rgba(14, 73, 118, 1);
  }
}
</style>
