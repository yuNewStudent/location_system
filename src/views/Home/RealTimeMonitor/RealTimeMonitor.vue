<template>
  <div class="box">
    <div class="RealTimeMonitor">
      <el-main>
        <div class="vide_call">
          <div class="persons_wrapper"
               v-if='persons.length'>
            <div class='tab'>
              <span :class='{active: currentList==="person"}'
                    @click='changeCurrentList("person")'>人员</span>
              <span :class='{active: currentList==="car"}'
                    @click='changeCurrentList("car")'>车辆</span>
            </div>
            <div class="search">
              <el-input v-model='query'
                        type='text'
                        placeholder='请输入人名'>
                <i slot="suffix"
                   class="el-input__icon el-icon-search"></i></el-input>
            </div>
            <ul class="persons_list">
              <li v-for='(item, index) in filterPerson'
                  :key='index'
                  class="person_item">
                <!-- <img class="headimg" :src="item.userAvatar" alt=""> -->
                <span class="name">{{item.userName}}</span>
                <!-- <span class="name">拨打视频</span> -->
                <img class="video—icon"
                     @click='startCall'
                     src="@/assets/img/video—icon.png"
                     alt="">
              </li>
            </ul>
            <!-- <div class="call_wrapper">
              <el-input v-model="targetAccid" type='text' placeholder='请输入呼叫id'></el-input>
              <el-button @click="startCalling">呼叫</el-button>
            </div> -->
          </div>
          <div class="calling"
               v-if='isShowHangup'>
            <p class="title">正在呼叫{{'yuian'+'sss'}}</p>
            <el-button class="hangupbtn"
                       @click="cancelCalling">挂断</el-button>
          </div>
          <div class="accept_wrapper calling"
               v-if='isShowAcceptView'>
            <p class="title">
              <span class="name">{{'y1j22s333y'}}</span>
              <br />
              <span>请求视频聊天</span>
            </p>
            <el-button size="medium"
                       type='danger'
                       class="hangupbtn"
                       @click="handleHangUp">挂断</el-button>
            <el-button size="medium"
                       type='primary'
                       @click="handleAnswer">接听</el-button>
          </div>
          <!-- <div class="login" v-if='!isLogin'>
            <el-input placeholder="账号" v-model="account"></el-input>
            <el-input placeholder="密码" v-model="password"></el-input>
            <el-input type='submit' @focus='handleLogin'></el-input>
          </div> -->
          <div class="video_contanier"
               v-if='isShowAccepting'>
            <div class="you large"
                 ref='remoteContainer'></div>
            <div class="self small"
                 ref='container'></div>
            <el-button type='danger'
                       size='mini'
                       class="handupbtn"
                       @click="hangupbtnaccepted">挂断</el-button>
          </div>
        </div>
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
            <video ref='video'
                   autoplay
                   src="http://hls01open.ys7.com/openlive/9006facdc13a4611a36700fd7486515a.hd.m3u8"></video>
          </div>
        </div>
      </el-main>
    </div>
  </div>
</template>

<script>
// import MD5 from '@/assets/js/md5.js'
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
      // query: {
      //   videoName: '',
      //   date: '',
      //   time: ''
      // },
      targetAccid: '',
      nim: null,
      netcall: null,
      beCalledInfo: null,
      sessionConfig: null,
      beCalling: false,
      isShowAcceptView: false,
      isShowAccepting: false,
      // isShowAcceptDiv: false,
      isShowHangup: false,
      isLogin: false,
      account: '',
      password: '',
      persons: [],
      query: '',
      currentList: 'person'
    }
  },
  methods: {
    initNim () {
      this.nim = NIM.getInstance({
        // debug:true,
        appKey: '1664477a1216e189119905d3e752f86b', // 45c6af3c98409b18a84451215d0bdd6e
        account: 'yj1', // this.account
        token: '123qwe', // this.password MD5('123qwe')
        onconnect: onConnect,
        onwillreconnect: onWillReconnect,
        ondisconnect: onDisconnect,
        onerror: onError
      })
      const self = this
      function onConnect () {
        // hasLogined1 = true
        self.$message({
          showClose: true,
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
            case 302:
              self.$message({
                type: 'error',
                message: '账号或者密码错误!'
              })
              this.isLogin = false
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
      this.netcall = WebRTC.getInstance({
        nim: that.nim,
        container: that.$refs.container,
        remoteContainer: that.$refs.remoteContainer,
        // chromeId: '',
        // 是否开启日志打印
        debug: true
      })
      // 被呼叫
      this.netcall.on('beCalling', obj => {
        this.showAcceptUI(obj, null, this)
        this.beCalledInfo = obj
      })
      this.netcall.on('callAccepted', obj => {
        // 缓存呼叫类型，后面开启音视频连接需要用到
        // console.log('on callAccepted', obj)
        // 取消呼叫倒计时
        this.isShowHangup = false
        this.isShowAccepting = true
        // this.targetAccid = obj.account
        this.startConnect(obj)
      })
      this.netcall.on('hangup', obj => {
        that.$message({
          showClose: true,
          message: '电话被挂断',
          type: 'error'
        })
        // resetWhenHangup()
        // this.isShowAcceptDiv = false
        this.isShowAccepting = false
        this.isShowAcceptView = false
        this.isCalling = false
        this.netcall.hangup()
      })
      // 被叫拒绝的通知
      this.netcall.on('callRejected', obj => {
        // 如果呼叫之前，启动了超时倒计时，这里可以取消呼叫倒计时
        // clearCallTimer();
        // 挂断
        that.netcall.hangup()
        // this.MessageBox.close()
        // 做清理工作
        // resetWhenHangup();
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
        type: WebRTC.NETCALL_TYPE_VIDEO,
        account: that.targetAccid,
        pushConfig: pushConfig,
        sessionConfig: that.sessionConfig,
        webrtcEnable: true
      }).then(obj => {
        // 成功发起呼叫
        // console.log('call success', obj)
        that.isShowHangup = true
        that.isCalling = true
      }).catch(err => {
        // 被叫不在线
        if (err.event.event.code === 11001) {
          this.$message('对方不在线')
          // clearAcceptUI()
        }
      })
      // 对方拒绝接听
      that.netcall.on('callRejected', obj => {
        this.$message({
          showClose: true,
          message: '对方挂断了电话',
          type: 'error'
        })
        that.isShowHangup = false
        that.netcall.hangup()
      })
    },
    // 接听电话
    handleAnswer () {
      this.$message({
        type: 'success',
        message: '接听电话!'
      })
      this.isShowAcceptView = false
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
      // this.$message({
      //   type: 'info',
      //   message: '已挂断电话'
      // })
      const that = this
      this.netcall.control({
        channelId: that.beCalledInfo.channelId,
        command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
      })
      this.netcall.response({
        accepted: false,
        beCalledInfo: this.beCalledInfo
      })
      this.isShowAcceptView = false
      this.beCalledInfo = null
      this.beCalling = false
    },
    // 显示接听界面
    showAcceptUI (obj, accid, that) {
      this.isShowAcceptView = true
      this.beCalling = true
    },
    // 开始通话
    startConnect (obj) {
      const netcall = this.netcall
      const that = this
      // 连接媒体网关
      netcall.startRtc()
        .then(() => {
          // 开启麦克风
          return netcall.startDevice({
            type: WebRTC.DEVICE_TYPE_AUDIO_IN
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
            type: WebRTC.DEVICE_TYPE_VIDEO
          }).catch(err => {
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
            width: 120,
            height: 140,
            cut: false
          })
          // 开启本地音频播放
          netcall.startDevice({
            type: WebRTC.DEVICE_TYPE_AUDIO_OUT_CHAT
          }).catch(err => {
            console.log('播放对方的声音失败')
            console.log(err)
          })
        })
      netcall.on('remoteTrack', obj => {
        console.log(obj)
        // 播放对方声音
        netcall.startDevice({
          type: WebRTC.DEVICE_TYPE_AUDIO_OUT_CHAT
        }).catch(function (err) {
          console.log('播放对方的声音失败')
          console.error(err)
        })
        // 预览对方视频
        netcall.startRemoteStream({
          account: obj.account,
          node: that.$refs.remoteContainer
        })
        // 设置对端视频画面大小
        netcall.setVideoViewRemoteSize({
          account: obj.account,
          width: 350,
          height: 410,
          cut: true
        })
      })
    },
    // 通话过程中的挂断按钮
    hangupbtnaccepted () {
      this.netcall.hangup()
      this.isShowAccepting = false
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
      // if (!this.account || !this.password) {
      //   return this.$message({
      //     showClose: true,
      //     message: '登录信息不能为空',
      //     type: 'error'
      //   })
      // }
      this.initNim()
      this.sessionConfig = {
        videoQuality: WebRTC.CHAT_VIDEO_QUALITY_HIGH,
        videoFrameRate: WebRTC.CHAT_VIDEO_FRAME_RATE_15,
        videoBitrate: 0,
        recordVideo: false,
        recordAudio: false,
        highAudio: false,
        bypassRtmp: false,
        rtmpUrl: '',
        rtmpRecord: false,
        splitMode: WebRTC.LAYOUT_SPLITLATTICETILE
      }
    },
    getPersons () {
      // // 获取所有人员
      this.$http.get(`${config.httpBaseUrl}/user/getAll`).then(res => {
        if (res.code === 200) {
          this.persons = res.date.users
        }
      })
    },
    startCall () {
      this.targetAccid = 'y1j22s333y'
      this.startCalling()
    },
    changeCurrentList (type) {
      this.currentList = type
    }
  },
  computed: {
    filterPerson () {
      return this.persons.filter((item, index) => {
        return item.userName.search(this.query) > -1
      })
    }
  },
  created () {
    this.getPersons()
  },
  mounted () {
    this.$nextTick(() => {
      this.initVideo()
      this.handleLogin()
    })
  }
}
</script>

<style lang='scss' scoped>
.RealTimeMonitor {
  .el-main {
    padding: 0;
    // display: flex;
    .video_wrapper {
      margin-left: 20px;
      float: left;
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
        // background: black;
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
      float: left;
      width: 560px;
      display: flex;
      .persons_wrapper {
        width: 200px;
        background: rgba(35, 97, 190, 1);
        color: rgba(204, 218, 245, 1);
        line-height: 40px;
        border-radius: 5px;
        .tab {
          overflow: hidden;
          span {
            float: left;
            width: 50%;
            text-align: center;
            &.active {
              color: #409eff;
              border-bottom: 2px solid #409eff;
            }
          }
        }
        .search {
          height: 40px;
          padding: 10px;
          border-bottom: 1px solid rgba(56, 121, 218, 1);
        }
        .persons_list {
          cursor: pointer;
          height: 360px;
          overflow-y: auto;
          .person_item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 10px;
            height: 40px;
            box-sizing: border-box;
            border-bottom: 1px solid rgba(56, 121, 218, 1);
            // &:last-child {
            //   border-bottom: none;
            // }
            .headimg {
              width: 30px;
              height: 30px;
              border-radius: 50%;
            }
            .video—icon {
              width: 29px;
              height: 15px;
            }
          }
        }
      }
      .accept_wrapper {
        .title {
          color: gray;
          .name {
            font-size: 20px;
            color: black;
          }
        }
      }
      .calling {
        background: white;
        height: 180px;
        text-align: center;
        padding-top: 80px;
        width: 200px;
        margin-left: 10px;
        height: 360px;
        box-sizing: border-box;
        border-radius: 5px;
        line-height: 25px;
        .title {
          margin-bottom: 10px;
        }
      }
      .video_contanier {
        margin-left: 10px;
        width: 350px;
        height: 400px;
        position: relative;
        border-radius: 5px;
        .large {
          position: absolute;
          // width: 100%;
          // height: 100%;
        }
        .small {
          position: absolute;
          // width: 120px;
          // height: 140px;
          top: 0;
          right: 0;
        }
        .handupbtn {
          position: absolute;
          bottom: 10px;
          left: 50%;
          margin-left: -28px;
        }
      }
      .call_wrapper {
        margin-top: 10px;
        .el-input {
          width: 125px;
        }
      }
    }
  }
}
</style>
