<template>
  <div class='MessageBox'>
    <div class='add_user_wrapper'>
      <div class="header">
        <label for="">时间段查询</label>
        <el-date-picker
          v-model="timeLine.date"
          type="date"
          size='small'
          placeholder="选择日期">
        </el-date-picker>
        <el-time-picker
          is-range
          size='small'
          v-model="timeLine.time"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围">
        </el-time-picker>
        <el-button
          size='small'
          @click='handlepersonLine'>搜索</el-button>
        <el-button @click='handleClose' type="danger" icon="el-icon-close" circle class="close"></el-button>
      </div>
      <div id='Amap'></div>
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
      ],
      timeLine: {
        date: '',
        time: ''
      }
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
    },
    // 搜索时间段内的路径
    handlepersonLine () {
      console.log(this.timeLine)
    },
    // 绘制路径
    drawLine () {
      var path = []
      this.lines.forEach(item => {
        path.push(new AMap.LngLat(item.lng, item.lat))
      })
      var polyline = new AMap.Polyline({
        path: path,
        strokeColor: '#3366FF',
        strokeWeight: 4,
        lineJoin: 'round',
        lineCap: 'round'
      })
      this.map.add(polyline)
    },
    // 绘制起点坐标
    drawStartMark () {
      var marker
      const longitude = this.lines[0].lng
      const latitude = this.lines[0].lat
      marker = new AMap.Marker({
        icon: require('@/assets/img/icon/起点IC.png'),
        position: [longitude, latitude]
      })
      this.map.add(marker)
    },
    // 绘制终点坐标
    drawEndMark () {
      var marker
      const longitude = this.lines.slice(-1)[0].lng
      const latitude = this.lines.slice(-1)[0].lat
      marker = new AMap.Marker({
        icon: require('@/assets/img/icon/终点IC.png'),
        position: [longitude, latitude]
      })
      this.map.add(marker)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initMap()
      this.drawLine()
      this.drawStartMark()
      this.drawEndMark()
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
    margin: 2vh 2vw 0;
    color: white;
    .header {
      font-size: 14px;
      background: rgba(0, 0, 0, 0.9);
      width: 95vw;
      .el-input {
        width: 200px;
      }
      .close {
        position: absolute;
        top: 10px;
        right: 30px;
        padding: 4px;
        font-size: 30px;
        z-index: 2;
      }
    }
    #Amap {
      margin-top: 5px;
      width: 95vw;
      height: 92vh;
    }
  }
}
</style>
