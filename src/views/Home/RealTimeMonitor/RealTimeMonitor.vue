<template>
  <div class="RealTimeMonitor" v-if='false'>
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
        <!-- <div class="video">
          <video autoplay controls src="http://vt1.doubanio.com/201906171724/81ef8962656c6613f8568d32e66f9f1c/view/movie/M/402430698.mp4"></video>
        </div>
        <div class="video">
          <video autoplay controls src="http://vt1.doubanio.com/201906171724/81ef8962656c6613f8568d32e66f9f1c/view/movie/M/402430698.mp4"></video>
        </div>
        <div class="video">
          <video autoplay controls src="http://vt1.doubanio.com/201906171724/81ef8962656c6613f8568d32e66f9f1c/view/movie/M/402430698.mp4"></video>
        </div> -->
      </div>
    </el-main>
  </div>
  <div class="vide_call" v-else>
    <div class="call_wrapper" v-if='isShowCallWarpper'>
      <el-input v-model="targetAccid" type='text' placeholder='请输入呼叫id'></el-input>
      <el-button @click="startCalling">呼叫</el-button>
    </div>
    <el-button ref='hangupbtn' class="hangupbtn" @click="cancelCalling" v-if='isShowHangup'>挂断</el-button>
    <div class="video_contanier" ref='accepting' v-if='isShowAccepting'>
      <div class="self" ref='container'></div>
      <el-button @click="hangupbtnaccepted">挂断</el-button>
      <div class="you" ref='remoteContainer'></div>
    </div>
    <div class="accept_wrapper" ref='acceptDiv' v-if='isShowAcceptDiv'>
      <span class="name">{{targetAccid}}来电</span>
      <el-button @click="handleAnswer" size='mini'>接听</el-button>
      <el-button @click="handleHangUp" size='mini'>挂断</el-button>
    </div>
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
      },
      targetAccid: '',
      nim: null,
      Netcall: null,
      netcall: null,
      beCalledInfo: null,
      sessionConfig: null,
      beCalling: false,
      isShowAccepting: false,
      isShowCallWarpper: true,
      isShowAcceptDiv: false,
      isShowHangup: false
    }
  },
  methods: {
    initNim () {
      this.nim = NIM.getInstance({
        // debug:true,
        appKey: '45c6af3c98409b18a84451215d0bdd6e',
        account: 'yj1020',
        token: '46f94c8de14fb36680850768ff1b7f2a',
        onconnect: onConnect,
        onwillreconnect: onWillReconnect,
        ondisconnect: onDisconnect,
        onerror: onError
      })
      const self = this
      function onConnect () {
        console.log('SDK Connected')
        // hasLogined1 = true
        self.initNetCall()
      }
      function onWillReconnect (obj) {
        console.log('SDK is reconnecting')
        console.log(obj.retryCount)
        console.log(obj.duration)
      }
      function onDisconnect (error) {
        console.log('Lost Connection')
        console.log(error)
        if (error) {
          switch (error.code) {
            case 302: alert('Password or account not matched')
              break
            case 417: break
            case 'kicked': break
            default: break
          }
        }
        // window.location.href = './login.html'
        // delCookie('accid')
        // delCookie('token')
      }
      function onError (error) {
        console.log(error)
        alert('Login error:' + error)
        // window.location.href = './login.html'
        // delCookie('accid')
        // delCookie('token')
      }
    },
    initNetCall () {
      NIM.use(WebRTC)
      const that = this
      this.netcall = this.Netcall.getInstance({
        nim: that.nim,
        container: that.$refs.container,
        remoteContainer: that.$refs.remoteContainer,
        // chromeId: '',
        // 是否开启日志打印
        debug: true
      })
      // 被呼叫
      this.netcall.on('beCalling', obj => {
        this.targetAccid = obj.account
        this.showAcceptUI(obj, null, this)
        this.beCalledInfo = obj
      })
      // 被叫接受的通知
      this.netcall.on('callAccepted', obj => {
        console.log('on callAccepted', obj)
        this.isShowAcceptDiv = false
        this.isShowAccepting = true
        this.isShowCallWarpper = false
        // console.log(obj)
        that.startConnect(obj)
      })
      this.netcall.on('hangup', obj => {
        console.log('on callAccepted', obj)
        that.$message({
          showClose: true,
          message: '电话被挂断',
          type: 'error'
        })
        // resetWhenHangup()
        this.isShowAcceptDiv = false
        this.isShowAccepting = false
        this.isShowCallWarpper = true
        this.netcall.hangup()
      })
    },
    // 拨打电话
    startCalling () {
      const pushConfig = {
        enable: true,
        needBadge: true,
        needPushNick: true,
        pushContent: '',
        custom: '测试自定义数据',
        pushPayload: '',
        sound: '',
        forceKeepCalling: 0
      }
      const that = this
      this.netcall.call({
        type: that.Netcall.NETCALL_TYPE_VIDEO,
        account: that.targetAccid,
        pushConfig: pushConfig,
        sessionConfig: that.sessionConfig,
        webrtcEnable: true
      }).then(obj => {
        // 成功发起呼叫
        console.log('call success', obj)
        // remoteContainer1.style.display = 'block'
        this.isShowCallWarpper = false
        that.isShowHangup = true
        that.isCalling = true
      }).catch(err => {
        console.log(err)
        // 被叫不在线
        if (err.event.code === 11001) {
          console.log('callee offline', err)
          alert('对方不在线')
          // clearAcceptUI()
        }
      })
      // 对方拒绝接听
      that.netcall.on('callRejected', obj => {
        this.$message({
          showClose: true,
          message: '对方拒绝接听',
          type: 'error'
        })
        that.isShowHangup = false
        that.isShowCallWarpper = true
        that.netcall.hangup()
      })
      // 被叫接受的通知
      that.netcall.on('callAccepted', obj => {
        // 缓存呼叫类型，后面开启音视频连接需要用到
        console.log('on callAccepted', obj)
        // 取消呼叫倒计时
        that.isShowHangup = false
        that.isShowCallWarpper = false
        that.isShowAccepting = true
        this.targetAccid = obj.account
        that.startConnect()
      })
    },
    // 接听电话
    handleAnswer () {
      this.beCalling = false
      const that = this
      this.netcall.response({
        accepted: true,
        beCalledInfo: that.beCalledInfo,
        sessionConfig: that.sessionConfig
      })
        .catch(err => {
          console.log('接听失败', err)
        })
    },
    // 挂断电话
    handleHangUp () {
      const that = this
      this.netcall.control({
        channelId: that.beCalledInfo.channelId,
        command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
      })
      this.netcall.response({
        accepted: false,
        beCalledInfo: this.beCalledInfo
      })
      this.beCalledInfo = null
      this.beCalling = false
    },
    // 显示接听界面
    showAcceptUI (obj, accid, that) {
      this.isShowCallWarpper = false
      this.beCalling = true
      this.isShowAcceptDiv = true
    },
    // 开始通话
    startConnect () {
      const netcall = this.netcall
      const that = this
      // this.$refs.accepting.style.
      // 连接媒体网关
      netcall.startRtc().then(() => {
        // 开启麦克风
        return netcall.startDevice({
          type: that.Netcall.DEVICE_TYPE_AUDIO_IN
        }).catch(err => {
          console.log(err)
          that.$message({
            showClose: true,
            message: '启动麦克风失败',
            type: 'error'
          })
        })
      })
        .then(() => {
          // 设置采集音量
          netcall.setCaptureVolume(255)
          // 开启摄像头
          return netcall.startDevice({
            type: that.Netcall.DEVICE_TYPE_VIDEO
          })
            .catch(err => {
              console.log(err)
              that.$message({
                showClose: true,
                message: '启动摄像头失败',
                type: 'error'
              })
            })
        })
        .then(() => {
          // 开启本地视频预览
          netcall.startLocalStream(
            that.$refs.container
          )
          // 设置本地视频画面大小
          netcall.setVideoViewSize({
            width: 500,
            height: 500,
            cut: true
          })
          // 播放对方声音
          // 开启本地音频播放
          netcall.startDevice({
            type: that.Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT
          }).catch(err => {
            console.log('播放对方的声音失败')
            console.log(err)
          })
          // const target = that.targetAccid || obj
          // 开启远程视频预览
          netcall.startRemoteStream({
            account: that.targetAccid,
            node: that.$refs.remoteContainer
            // poster: 'http://dev.netease.im/images/logo2.png'
          })
          // 设置对端视频画面大小
          netcall.setVideoViewRemoteSize({
            account: that.targetAccid,
            width: 500,
            height: 500,
            cut: false
          })
        })
        .catch(err => {
          console.log('发生错误')
          console.log(err)
          netcall.hangup()
          // window.location.href = './callready.html'
        })
      // 在回调里监听对方加入通话，并显示对方的视频画面
      // netcall.on('remoteTrack', obj => {
        // console.log('user join', obj)
      // })
    },
    // 通话过程中的挂断按钮
    hangupbtnaccepted () {
      this.netcall.hangup()
      this.isShowAccepting = false
      this.isShowCallWarpper = true
      this.$message({
        showClose: true,
        message: '你挂断了电话',
        type: 'error'
      })
    },
    // 取消呼叫
    cancelCalling () {
      this.netcall.hangup()
      this.isShowHangup = false
      this.isShowCallWarpper = true
      this.$message({
        showClose: true,
        message: '已经取消呼叫',
        type: 'error'
      })
    }
  },
  created () {
    this.initNim()
    this.Netcall = WebRTC
    this.sessionConfig = {
      videoQuality: this.Netcall.CHAT_VIDEO_QUALITY_HIGH,
      videoFrameRate: this.Netcall.CHAT_VIDEO_FRAME_RATE_15,
      videoBitrate: 0,
      recordVideo: false,
      recordAudio: false,
      highAudio: false,
      bypassRtmp: false,
      rtmpUrl: '',
      rtmpRecord: false,
      splitMode: this.Netcall.LAYOUT_SPLITLATTICETILE
    }
  }
}
</script>

<style lang='scss' scoped>
.RealTimeMonitor {
  .el-header {
    text-align: left;
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
    padding: 0;
    .video_wrapper {
      position: fixed;
      top: 115px;
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
.vide_call {
  .call_wrapper {
    // display: none;
    .el-input {
      width: 200px;
    }
  }
  .video_contanier {
    > div {
      width: 500px;
      height: 500px;
      border: 1px solid red;
      display: inline-block;
    }
  }
  .accept_wrapper {
    .name {
      color: white;
    }
  }
}
</style>
