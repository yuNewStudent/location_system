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
  props: ['userDeviceId', 'center'],
  data () {
    return {
      map: null,
      lines: [],
      // defaultDate: new Date('2019-08-09'),
      timeLine: {
        date: new Date(),
        time: [
          new Date(0,0,0),
          new Date()
        ]
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
        center: this.center,
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
      this.getLines()
    },
    // 绘制路径
    drawLine () {
      var path = []
      this.lines.forEach(item => {
        this.translateGps(item.longitude, item.latitude).then(data => {
          path.push(new AMap.LngLat(data[0].lng, data[0].lat))
        })
      })
      setTimeout(() => {
        this.polyline = new AMap.Polyline({
          path: path,
          strokeColor: '#3366FF',
          strokeWeight: 4,
          lineJoin: 'round',
          lineCap: 'round'
        })
        this.map.add(this.polyline)
      }, 3000)
    },
    // 绘制起点坐标
    drawStartMark () {
      var marker
      const longitude = this.lines[0].longitude
      const latitude = this.lines[0].latitude
      this.translateGps(longitude, latitude).then(data => {
        marker = new AMap.Marker({
          icon: require('@/assets/img/icon/起点IC.png'),
          position: [data[0].lng, data[0].lat]
        })
        this.map.add(marker)
        this.map.setZoomAndCenter(14, [data[0].lng, data[0].lat])
      })
    },
    // 绘制终点坐标
    drawEndMark () {
      var marker
      const longitude = this.lines.slice(-1)[0].longitude
      const latitude = this.lines.slice(-1)[0].latitude
      this.translateGps(longitude, latitude).then(data => {
        marker = new AMap.Marker({
          icon: require('@/assets/img/icon/终点IC.png'),
          position: [data[0].lng, data[0].lat]
        })
        this.map.add(marker)
      })
    },
    // 获取路线
    getLines () {
      const data = {
        startTime: this.moment(this.timeLine.time[0]).format('HH'),
        endTime: this.moment(this.timeLine.time[1]).format('HH'),
        date: this.moment(this.timeLine.date).format('YYYY-MM-DD'),
        userId: this.userDeviceId
      }
      this.$http.get(`${config.httpBaseUrl}/map/getAll`, {
        params: data
      }).then(res => {
        if (res.code === 200 && res.date.maplocations) {
          this.lines = res.date.maplocations
          this.map && this.map.clearMap()
          this.polyline && this.map.remove(this.polyline)
          this.drawLine()
          this.drawStartMark()
          this.drawEndMark()
        } else {
          this.$message({
            showClose: true,
            message: '没有查询到数据',
            type: 'error'
          })
        }
      })
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
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initMap()
      this.getLines()
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
