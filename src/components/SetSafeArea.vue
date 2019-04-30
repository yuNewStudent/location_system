<template>
  <div class="amap">
    <div id="container"></div>
    <button @click='handleStandLayer'>设置安全区域</button>
  </div>
</template>

<script>
import AMap from 'AMap'
export default {
  data () {
    return {
      map: null,
      areas: [
        {
          text: '纯文本',
          longitude: '',
          latitude: '',
          radius: ''
        }
      ]
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
    },
    // 绑定点击事件
    handleStandLayer () {
      this.map.on('click', this.drawArea)
    },
    // 划范围
    drawArea (ev) {
      const longitude = ev.lnglat.lng
      const latitude = ev.lnglat.lat
      // 绘制标记点
      this.drawMarker(longitude, latitude)
      // 绘制圆形
      this.drawCircle(longitude, latitude, 200)
      // 创建纯文本标记
      this.drawText(longitude, latitude, '标记')
    },
    // 添加标记点
    drawMarker (longitude, latitude) {
      var marker = new AMap.Marker({
        position: [longitude, latitude]
      })
      this.map.add(marker)
    },
    // 绘制圆形范围
    drawCircle (longitude, latitude, radius) {
      var circle = new AMap.Circle({
        center: [longitude, latitude],
        radius: radius, // 半径
        strokeOpacity: 0,
        fillOpacity: 0.3,
        // 线样式还支持 'dashed'
        fillColor: '#1791fc',
        zIndex: 50
      })
      circle.setMap(this.map)
      // 缩放至合适位置
      this.map.setFitView([circle])
    },
    // 创建纯文本标记
    drawText (longitude, latitude, title) {
      var text = new AMap.Text({
        text: title,
        style: {
          'padding': '5px 10px',
          'margin-top': '-3rem',
          'border-radius': '.45rem',
          'background-color': 'white',
          'text-align': 'center',
          'font-size': '14px',
          'color': 'red'
        },
        position: [longitude, latitude]
      })
      text.setMap(this.map)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.amap {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  #container {
    width:100vw;
    height: 80vh;
  }
}
</style>
