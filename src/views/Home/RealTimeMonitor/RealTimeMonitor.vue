<template>
  <div class="box">
    <div class="RealTimeMonitor">
      <el-main>
        <div class='video_wrapper'>
          <!-- <el-header>
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
          </el-header> -->
          <div class="video">
            <video ref='video' autoplay src="http://hls01open.ys7.com/openlive/9006facdc13a4611a36700fd7486515a.hd.m3u8"></video>
          </div>
        </div>
        <div class="vide_call">
          <div class="login" v-if='!isLogin'>
            <el-input placeholder="账号" v-model="account"></el-input>
            <el-input placeholder="密码" v-model="password"></el-input>
            <el-input type='submit' @focus='handleLogin'></el-input>
          </div>
          <div class="call" v-else>
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
          </div>
        </div>
      </el-main>
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
      // isShowAcceptDiv: false,
      isShowHangup: false,
      isLogin: false,
      account: '',
      password: ''
    }
  },
  methods: {
    initNim () {
      this.nim = NIM.getInstance({
        // debug:true,
        appKey: '1664477a1216e189119905d3e752f86b',
        account: this.account,
        token: this.password,
        onconnect: onConnect,
        onwillreconnect: onWillReconnect,
        ondisconnect: onDisconnect,
        onerror: onError
      })
      const self = this
      function onConnect () {
        // hasLogined1 = true
        self.$message({
          type: 'success',
          message: '网易云信登录成功!'
        })
        self.isLogin = true
        self.initNetCall()
      }
      function onWillReconnect (obj) {
        // console.log(obj.retryCount)
        // console.log(obj.duration)
      }
      function onDisconnect (error) {
        // console.log('Lost Connection')
        // console.log(error)
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
        // console.log(error)
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
        debug: false
      })
      // 被呼叫
      this.netcall.on('beCalling', obj => {
        this.showAcceptUI(obj, null, this)
        this.beCalledInfo = obj
      })
      // 被叫接受的通知
      this.netcall.on('callAccepted', obj => {
        // console.log('on callAccepted', obj)
        // this.isShowAcceptDiv = false
        this.isShowAccepting = true
        this.isShowCallWarpper = false
        // console.log(obj)
        that.startConnect(obj)
      })
      this.netcall.on('hangup', obj => {
        // console.log('on callAccepted', obj)
        that.$message({
          showClose: true,
          message: '电话被挂断',
          type: 'error'
        })
        // resetWhenHangup()
        // this.isShowAcceptDiv = false
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
        // console.log('call success', obj)
        // remoteContainer1.style.display = 'block'
        this.isShowCallWarpper = false
        that.isShowHangup = true
        that.isCalling = true
      }).catch(err => {
        // console.log(err)
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
        // console.log('on callAccepted', obj)
        // 取消呼叫倒计时
        that.isShowHangup = false
        that.isShowCallWarpper = false
        that.isShowAccepting = true
        // this.targetAccid = obj.account
        that.startConnect(obj)
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
      this.$confirm(`${obj.account}来电`, '提示', {
        confirmButtonText: '接听',
        cancelButtonText: '挂断',
        type: 'info '
      }).then(() => {
        this.$message({
          type: 'success',
          message: '接听电话!'
        })
        this.handleAnswer()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已挂断电话'
        })
        this.handleHangUp()
      })
    },
    // 开始通话
    startConnect (obj) {
      const netcall = this.netcall
      const that = this
      // this.$refs.accepting.style.
      // 连接媒体网关
      netcall.startRtc()
        .then(() => {
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
          // netcall.setCaptureVolume(255)
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
            cut: false
          })
        })
        // 播放对方声音
        netcall.on('remoteTrack', obj => {
          console.log(obj)
          // 开启本地音频播放
          netcall.startDevice({
            type: that.Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT
          }).catch(err => {
            console.log('播放对方的声音失败')
            console.log(err)
          })
          // 开启远程视频预览
          netcall.startRemoteStream({
            account: obj.account,
            // node: that.$refs.remoteContainer
            // poster: 'http://dev.netease.im/images/logo2.png'
          })
          // 设置对端视频画面大小
          netcall.setVideoViewRemoteSize({
            account: obj.account,
            width: 500,
            height: 500,
            cut: false
          })
        })
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
    },
    initVideo () {
      if (Hls.isSupported()) {
        var video = this.$refs.video
        var hls = new Hls()
        hls.loadSource('http://hls01open.ys7.com/openlive/9006facdc13a4611a36700fd7486515a.hd.m3u8')
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play()
        })
      }
    },
    // 登录网易云信
    handleLogin () {
      if (!this.account || !this.password) {
        return this.$message({
          showClose: true,
          message: '登录信息不能为空',
          type: 'error'
        })
      }
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
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.initVideo()
    })
  }
}
</script>

<style lang='scss' scoped>
.RealTimeMonitor {
  .el-main {
    padding: 0;
    height: 100%;
    .video_wrapper {
      // position: fixed;
      // top: 115px;
      // bottom: 0;
      width: 500px;
      float: left;
      overflow: hidden;
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
    .vide_call {
      float: right;
      .login {
        width: 200px;
        .el-input {
          margin: 5px 0;
        }
      }
      .call_wrapper {
        // width: 550px;
        // display: none;
        .el-input {
          width: 200px;
        }
      }
      .video_contanier {
        > div {
          // width: 500px;
          // height: 500px;
          // border: 1px solid red;
          // display: inline-block;
        }
      }
      .accept_wrapper {
        .name {
          color: white;
        }
      }
    }
  }
}
</style>
