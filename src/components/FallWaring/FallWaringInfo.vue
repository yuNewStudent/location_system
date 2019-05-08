<template>
  <div class='MessageBox' @click='handleClose'>
    <div class='add_user_wrapper' @click.stop>
      <div class="user">
        <header><img src="@/assets/img/icon/人员信息IC.png" alt=""> 人员信息</header>
        <div class="userInfo">
          <p>
            <span>姓名: 老李</span>
            <span>性别: 男</span>
          </p>
          <p>
            <span>年龄: 80</span>
            <span>所处状态: 报警</span>
          </p>
          <p>
            所在位置: 四川成都市锦江区春熙路12号
          </p>
          <p>
            所在时长: 2h30min
          </p>
          <p>
            电话号码: 1234908732
          </p>
          <div class="img">
            <div class="action_track">
              <span @click='handleShowLine'>
                <img src="@/assets/img/icon/行动轨迹IC.png" alt="">
              </span>
              <p>行动轨迹</p>
            </div>
            <div class="warning_num">
              <span>
                <img src="@/assets/img/icon/报警次数IC.png" alt="">
              </span>
              <p>报警次数</p>
            </div>
            <div class="nearby_cars" @click='handleNeberCar'>
              <span>
                <img src="@/assets/img/icon/最近车辆IC.png" alt="">
              </span>
              <p>附近车辆</p>
            </div>
          </div>
        </div>
        <header><img src="@/assets/img/icon/人员信息IC.png" alt=""> 紧急联系人</header>
        <div class="contact">
          <p>
            <span>姓名: 苏大爷</span>
            <span>关系: 妇女</span>
          </p>
          <p>联系电话: 123345666</p>
          <p>辅助电话: 123345666</p>
        </div>
      </div>
      <div class="map">
        <div id="container"></div>
      </div>
    </div>
    <person-line
      v-if='isPersonLine'
      @close='close'></person-line>
  </div>
</template>

<script>
import AMap from 'AMap'
import PersonLine from '@/components/PersonLine'
export default {
  data () {
    return {
      map: null,
      isPersonLine: false,
      person: {
        lng: 104.06406,
        lat: 30.54311,
        type: 'person'
      },
      cars: [
        {
          lng: 104.06006,
          lat: 30.54311,
          id: 1,
          type: 'car'
        },
        {
          lng: 104.06206,
          lat: 30.54911,
          id: 2,
          type: 'car'
        },
        {
          lng: 104.06906,
          lat: 30.54611,
          id: 3,
          type: 'car'
        },
        {
          lng: 104.07006,
          lat: 30.54311,
          id: 1,
          type: 'car'
        },
        {
          lng: 104.05206,
          lat: 30.54911,
          id: 2,
          type: 'car'
        },
        {
          lng: 104.06906,
          lat: 30.55611,
          id: 3,
          type: 'car'
        }
      ]
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
        center: [this.person.lng, this.person.lat],
        // 地图显示范围
        zoom: 16
      })
      // 添加缩放标尺控件
      AMap.plugin(['AMap.Scale'], () => {
        this.map.addControl(new AMap.Scale())
      })
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
    // 创建标记点位置
    drawArea () {
      // 绘制当前人
      this.drawMarker(this.person.lng, this.person.lat, this.person.type)
      // 绘制车
      this.cars.forEach(item => {
        this.drawMarker(item.lng, item.lat, item.type)
      })
    },
    // 绘制icon
    drawMarker (longitude, latitude, type) {
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
    },
    // 附近车辆
    handleNeberCar () {
      const nebercar = this.cars.slice()
    }
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
    padding: 20px 0;
    color: white;
    display: flex;
    .user {
      font-size: 14px;
      width: 400px;
      background-color: rgb(84, 92, 100);
      padding: 10px;
      .userInfo {
        padding: 10px 50px 20px 20px;
        border-bottom: 2px solid #3F3F3F;
        margin-bottom: 10px;
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
        padding: 10px 50px 20px 20px;
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
      #container {
        height: 80vh;
      }
    }
  }
}
</style>
