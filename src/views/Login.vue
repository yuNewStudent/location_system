<template>
  <div class="login_page">
    <div class="login_wrapper">
      <div class="login_box">
        <div class="login">
          <header>社区定位系统</header>
          <h3>欢迎回来</h3>
          <el-input placeholder="请输入账号" v-model="user.administratorAccount">
            <template slot="prepend"><img src="@/assets/img/icon/账号IC.png" alt=""></template>
          </el-input>
          <el-input placeholder="请输入密码" v-model="user.administratorPassword" type='password'>
            <template slot="prepend"><img src="@/assets/img/icon/矢量智能对象.png" alt=""></template>
          </el-input>
          <el-button type="warning" @click='handleLogin'>登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Loading } from 'element-ui'
import { setTimeout, clearInterval } from 'timers';
export default {
  name: 'login',
  data () {
    return {
      user: {
        administratorAccount: '',
        administratorPassword: ''
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    // 登录
    handleLogin () {
      // 判断账号和密码不能为空
      for (let k in this.user) {
        if (!this.user[k]) {
          return this.$message({
            showClose: true,
            message: '账号和密码不能为空',
            type: 'error'
          })
        }
      }
      // 向后台登录,登录成功将用户信息存在本地
      let loading = Loading.service({
        lock: true,
        text: '正在登陆中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let timer = setTimeout(() => {
        this.$message.error('服务器出错')
      }, 5000)
      this.$http.post(`${config.httpBaseUrl}/admin/login`, this.user).then(res => {
        loading.close()
        clearInterval(timer)
        if (res.code === 200) {
          this.$message({
            showClose: true,
            message: '登陆成功',
            type: 'success'
          })
          // 将用户信息存至本地
          const userInfo = {
            token: res.date.ok,
            ...this.user
          }
          this.$cookie.set('user', JSON.stringify(userInfo))
          this.setUser(userInfo)
          // 登录成功跳转子页面
          this.$router.push({
            name: 'Page'
          })
        } else {
          this.$message({
            showClose: true,
            message: '账号或密码错误',
            type: 'error'
          })
        }
      })
    }
  },
  computed: {
  },
  destroyed () {
    console.log(this.timer)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.login_page {
  width: 100vw;
  height: 100vh;
  background: url('../assets/img/icon/bg.png') no-repeat;
  background-size: cover;
  position: relative;
  .login_wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .login_box {
      background:rgba(66, 94, 212, .8);
      width: 408px;
      border-radius: 10px;
      padding: 10px;
      .login {
        opacity: 1;
        background: #324FC7;
        border-radius: 10px;
        padding: 20px 30px 30px;
        position: relative;
        header {
          position: absolute;
          top: -40px;
          color: #E6EBFE;
          right: 20px;
          font-size: 20px;
        }
        h3 {
          color: #F8BF12;
          font-size: 22px;
          text-align: center;
          margin: 15px 0;
        }
        .el-input {
          margin: 15px 0;
          outline: none;
          img {
            width: 16px;
          }
        }
        .el-button {
          width: 100%;
          margin: 15px 0;
        }
      }
    }
  }
}
</style>
