<template>
  <div class='MessageBox'>
    <div class='add_user_wrapper'>
      <div class="user">
        <div class="userInfo">
          <header>人员信息</header>
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
            <img src="" alt="">
            <img src="" alt="">
            <img src="" alt="">
          </div>
        </div>
        <div class="contact">
          <header>紧急联系人</header>
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
  </div>
</template>

<script>
import AMap from 'AMap'
export default {
  data () {
    return {
      map: null
    }
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
      // 添加缩放标尺控件
      AMap.plugin(['AMap.Scale'], () => {
        this.map.addControl(new AMap.Scale())
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initMap()
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
      width: 400px;
      background-color: rgb(84, 92, 100);
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

