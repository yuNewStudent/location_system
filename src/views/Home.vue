<template>
  <el-container>
    <el-header>
      <span class="name">防丢失系统</span>
      <app-menu class="menu" :menus='menus' :mode='mode.row'></app-menu>
      <div class="header_right">
        <!-- <img src="@/assets/img/userImg.png" alt=""> -->
        <span class="user_name" @click='handleResetPassword'>{{user.administratorAccount}}</span>
        <span class="dividing_line"></span>
        <span class="exit" @click="handleExit">退出</span>
      </div>
    </el-header>
    <el-container>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
    <reset-password
      :type='type'
      v-if='isShowResetPassword'
      @resetPassword='resetPassword'></reset-password>
  </el-container>
</template>

<script>
import AppMenu from '@/components/home/app-menu'
import ResetPassword from '@/components/home/ResetPassword'
import menus from '@/assets/js/menu.js'
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      user: [],
      menus: [],
      mode: {
        row: 'horizontal',
        colum: ''
      },
      menusGroup: [],
      isShowResetPassword: false,
      type: '修改密码'
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    // 退出
    handleExit () {
      // 退出页面，删除本地的用户信息
      this.$cookie.delete('user')
      this.$router.push({
        name: 'Login'
      })
    },
    // 修改密码
    handleResetPassword () {
      this.isShowResetPassword = true
    },
    resetPassword (bol, accountInfo) {
      if (bol) {
        const data = {
          acne: this.getUser.administratorAccount,
          ...accountInfo
        }
        this.$http.get(`${config.httpBaseUrl}/admin/updatepassword`, {
          params: data
        }).then(res => {
          if (res.code === 200) {
            this.$message({
              showClose: true,
              type: 'success',
              message: '密码修改成功，请重新登录!'
            })
            // 退出页面，删除本地的用户信息
            this.$cookie.delete('user')
            this.$router.push({
              name: 'Login'
            })
          }
        })
      }
      this.isShowResetPassword = false
    }
  },
  watch: {
    getUser (value) {
      this.user = value
    }
  },
  components: {
    AppMenu,
    ResetPassword
  },
  created () {
    this.user = this.getUser
    this.menus = menus
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.el-container {
  height: 100%;
  .el-header {
    display: flex;
    padding: 0 40px;
    line-height: 60px;
    background-color: rgb(84, 92, 100);
    justify-content: space-between;
    font-size: 16px;
    .name {
      vertical-align: top;
      color: white;
    }
    .menu {
      align-items: center;
    }
    .header_right {
      float: right;
      line-height: 60px;
      height: 60px;
      color: white;
      // img {
      //   width: 65px;
      //   height: 60px;
      //   border-radius: 50%;
      //   vertical-align: top;
      //   cursor:pointer
      // }
      .dividing_line {
        display: inline-block;
        width: 2px;
        height: 25px;
        background: #A0A0A0;
        position: relative;
        top: 6px;
        margin: 0 2px;
      }
      .user_name{
        cursor: pointer
      }
      .exit{
        cursor: pointer
      }
    }
  }
  .el-container {
    .el-main {
      width: 100vw;
      height: 100%;
      background: #010101;
    }
  }
}
</style>
