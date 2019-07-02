<template>
  <el-container>
    <el-header>
      <span class="name">智慧社区康养系统</span>
      <app-menu class="menu" :menus='menus[currentPage].group' :mode='mode.row'></app-menu>
      <div class="header_right">
        <span class="user_name" @click='handleResetPassword'>{{user.administratorAccount}}</span>
        <span class="dividing_line"></span>
        <span class="exit" @click="handleExit">退出</span>
      </div>
    </el-header>
    <el-container>
      <div class="nav">
        <p
          v-for='(item, index) in menus'
          :key='index'
          class="nav_item"
          :class='{active:index===currentPage}'
          @click='changeMenu(index)'><img :src="item.icon" alt=""><span>{{item.title}}</span></p>
      </div>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
    <reset-password
      :type='type'
      v-if='isShowResetPassword'
      @resetPassword='resetPassword'></reset-password>
    <!-- <footer>
      <p>崇州市大雨村</p>
      <p>版权所有©成都棋照科技有限公司</p>
    </footer> -->
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
      isShowResetPassword: false,
      type: '修改密码',
      currentPage: 0
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
    },
    changeMenu (index) {
      this.currentPage = index
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
    background-color: #313131;
    justify-content: space-between;
    font-size: 16px;
    .name {
      vertical-align: top;
      color: white;
      font-size: 24px;
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
    position: relative;
    .nav {
      display: none;
      position: absolute;
      width: 200px;
      background-color: #313131;
      text-align: center;
      cursor: pointer;
      .nav_item {
        display: flex;
        align-items: center;
        font-size: 20px;
        color: white;
        height: 60px;
        width: 200px;
        text-align: center;
        justify-content: center;
        &.active {
          background: #767676;
          position: relative;
        }
        img {
          width: 16px;
          height: 20px;
          margin-right: 10px;
        }
      }
      .active:after {
        content: '';
        position: absolute;
        display: inline-block;
        border: 10px solid transparent;
        border-left: 10px solid #767676;
        right: -20px;
      }
    }
    .el-main {
      // padding-left: 200px;
      width: 100vw;
      height: 100%;
      background: #010101;
      padding-top: 10px;
    }
  }
  footer {
    background: black;
    text-align: center;
    color: #FFFFFF;
    border-top: 3px solid #7B7B7B;
    padding: 10px 0;
    p {
      margin: 10px;
    }
  }
}
</style>
