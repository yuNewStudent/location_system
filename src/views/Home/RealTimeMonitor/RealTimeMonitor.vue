<template>
  <div class="RealTimeMonitor">
    <el-header>
      <el-select v-model="query.videoName" clearable placeholder="请选择">
        <el-option
          v-for="item in videoNames"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
        v-model="query.date"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
      <el-time-picker
        is-range
        v-model="query.time"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围">
      </el-time-picker>
    </el-header>
    <el-main>
      <div class='video_wrapper'>
        <div class="video">
          <video autoplay controls src="http://vt1.doubanio.com/201906171724/81ef8962656c6613f8568d32e66f9f1c/view/movie/M/402430698.mp4"></video>
        </div>
        <div class="video">
          <video autoplay controls src="http://vt1.doubanio.com/201906171724/81ef8962656c6613f8568d32e66f9f1c/view/movie/M/402430698.mp4"></video>
        </div>
        <div class="video">
          <video autoplay controls src="http://vt1.doubanio.com/201906171724/81ef8962656c6613f8568d32e66f9f1c/view/movie/M/402430698.mp4"></video>
        </div>
        <div class="video">
          <video autoplay controls src="http://vt1.doubanio.com/201906171724/81ef8962656c6613f8568d32e66f9f1c/view/movie/M/402430698.mp4"></video>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      videoNames: [
        {
          label: '一号监控',
          value: '一号监控'
        },
        {
          label: '二号监控',
          value: '二号监控'
        },
        {
          label: '三号监控',
          value: '三号监控'
        },
        {
          label: '四号监控',
          value: '四号监控'
        }
      ],
      query: {
        videoName: '',
        date: '',
        time: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.RealTimeMonitor {
  .el-header {
    text-align: right;
    line-height: 40px;
    .el-select {
      width: 150px;
    }
    .el-date-picker {
      width: 100px;
    }
    .el-time-picker {
      width: 300px;
    }
  }
  .el-main {
    padding: 0 20px;
    .video_wrapper {
      position: fixed;
      top: 125px;
      bottom: 0;
      .video {
        background: black;
        width: 49%;
        height: 50%;
        display: inline-block;
        // margin: 0 5px 0;
        video {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
