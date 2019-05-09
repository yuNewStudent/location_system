<template>
  <div class='MessageBox'>
    <div class='add_user_wrapper'>
      <div id='Amap'></div>
      <el-button @click='handleClose' type="danger" icon="el-icon-close" circle></el-button>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap'
export default {
  data () {
    return {
      map: null,
      lines: [
        {
          lng: 104.06406,
          lat: 30.55311,
          id: 0,
          type: 'car'
        },
        {
          lng: 104.06306,
          lat: 30.54411,
          id: 1,
          type: 'car'
        },
        {
          lng: 104.07606,
          lat: 30.54111,
          id: 2,
          type: 'car'
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
      ]
    }
  },
  methods: {
    // 初始化地图
    initMap () {
      this.map = new AMap.Map('Amap', {
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
    // 关闭窗口
    handleClose () {
      this.$emit('close')
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initMap()
      var path = []
      this.lines.forEach(item => {
        path.push(new AMap.LngLat(item.lng, item.lat))
      })
      var polyline = new AMap.Polyline({
        path: path,
        strokeColor: '#3366FF',
        strokeWeight: 4,
        strokeDasharray: [10, 5],
        lineJoin: 'round',
        lineCap: 'round',
        zIndex: 50
      })
      this.map.add(polyline)
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
  z-index: 5;
  border-radius: 10px;
  .add_user_wrapper {
    position: relative;
    color: white;
    #Amap {
      width: 95vw;
      height: 92vh;
      margin: 7vh auto 3vh;
    }
    .el-button {
      position: absolute;
      top: -15px;
      right: 15px;
      padding: 6px;
      font-size: 30px;
    }
  }
}
</style>
