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
        :persons='persons'
        :center='currentCenter'
        :cars='cars'></map-page>
    </el-main>
    <person-line
      v-if='isPersonLine'
      @close='closePersonLine'></person-line>
  </div>
</template>

<script>
import MapPage from '@/components/Amap'
import PersonLine from '@/components/PersonLine'
export default {
  data () {
    return {
      isPersonLine: false,
      persons: [
        {
          name: 'yujian',
          age: '23',
          lng: 104.06406,
          lat: 30.55311,
          id: 0,
          type: 'person'
        },
        {
          name: 'ss',
          age: '23',
          lng: 104.06306,
          lat: 30.54411,
          id: 1,
          type: 'person'
        },
        {
          name: 'ff',
          age: '23',
          lng: 104.07606,
          lat: 30.54111,
          id: 2,
          type: 'person'
        },
        {
          name: 'ggg',
          age: '23',
          lng: 104.06006,
          lat: 30.54311,
          id: 1,
          type: 'person'
        },
        {
          name: '是是',
          age: '23',
          lng: 104.06206,
          lat: 30.54911,
          id: 2,
          type: 'person'
        },
        {
          name: '日日日',
          age: '23',
          lng: 104.06906,
          lat: 30.54611,
          id: 3,
          type: 'person'
        }
      ],
      cars: [
        {
          carModel: '大众33',
          carNum: '1223',
          phone: '12455',
          lng: 104.06106,
          lat: 30.55111,
          id: 0,
          type: 'car'
        },
        {
          carModel: '夏普33',
          carNum: '2344',
          phone: '12455',
          lng: 104.06706,
          lat: 30.54611,
          id: 1,
          type: 'car'
        },
        {
          carModel: '大众33',
          carNum: '456',
          phone: '12455',
          lng: 104.07406,
          lat: 30.54311,
          id: 2,
          type: 'car'
        },
        {
          carModel: '大众33',
          carNum: '789',
          phone: '12455',
          lng: 104.06206,
          lat: 30.54411,
          id: 1,
          type: 'car'
        },
        {
          carModel: '大众33',
          carNum: '451',
          phone: '12455',
          lng: 104.06106,
          lat: 30.54811,
          id: 2,
          type: 'car'
        },
        {
          carModel: '大众33',
          carNum: '2543',
          phone: '12455',
          lng: 104.06806,
          lat: 30.54711,
          id: 3,
          type: 'car'
        }
      ],
      currentCenter: [104.06406, 30.54311],
      filterQuery: '',
      websock: null
    }
  },
  created () {
    // 页面刚进入时开启长连接
    // this.initWebSocket()
  },
  destroyed () {
    // 页面销毁时关闭长连接
    // this.websocketclose()
  },
  methods: {
    // 展示人员路径页面
    showPersonLine () {
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
    }
    // 初始化weosocket
    // initWebSocket () {
    //   // ws地址
    //   this.websock = new WebSocket('ws://localhost:5000/ifc/user')
    //   console.log(this.websock)
    //   this.websocket.onopen = this.websocketonopen()
    //   this.websocket.onerror = this.websocketonerror()
    //   this.websock.onmessage = this.websocketonmessage()
    //   this.websock.onclose = this.websocketclose
    // },
    // websocketonopen () {
    //   console.log('WebSocket连接成功')
    // },
    // // 错误
    // websocketonerror (e) {
    //   console.log('WebSocket连接发生错误')
    // },
    // // 数据接收
    // websocketonmessage (e) {
    //   const redata = JSON.parse(e.data)
    //   // 注意：长连接我们是后台直接1秒推送一条数据
    //   // 但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
    //   // 这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
    //   console.log(redata.value)
    // },
    // // 数据发送
    // websocketsend (agentData) {
    //   this.websock.send(agentData)
    // },
    // // 关闭
    // websocketclose (e) {
    //   console.log('connection closed (" + e.code + ")')
    // }
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
