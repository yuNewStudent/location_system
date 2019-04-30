<template>
  <!-- <map-page></map-page> -->
  <el-container>
    <el-header>
      <span class="name">防丢失系统</span>
      <app-menu class="menu" :menus='menus' :mode='mode.row'></app-menu>
      <div class="header_right">
        <img src="@/assets/img/userImg.png" alt="">
        <span class="user_name">{{user.name||'余建'}}</span>
        <span class="dividing_line"></span>
        <span class="user_role">{{user.department||'管理员'}}</span>
        <span class="exit" @click="handleExit">退出</span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="160px">
        <app-menu class="menu" :mode='mode.colum' :menus='menusGroup'></app-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import MapPage from '@/components/Amap'
import AppMenu from '@/components/home/app-menu'
import menus from '@/assets/js/menu.js'
export default {
  name: 'home',
  data () {
    return {
      user: {},
      menus: [],
      mode: {
        row: 'horizontal',
        colum: ''
      },
      menusGroup: []
    }
  },
  methods: {
    async getData () {
      const res = await this.$http.get('http://jsonplaceholder.typicode.com/posts')
      console.log(res.data)
    },
    // 退出
    handleExit () {}
  },
  components: {
    MapPage,
    AppMenu
  },
  mounted () {
    // this.timer = setInterval(this.getData, 2000)
    this.menus = menus
    this.menusGroup = this.menus[0].group
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.el-container {
  .el-header {
    display: flex;
    padding: 0 10px;
    line-height: 60px;
    background-color: rgb(84, 92, 100);
    justify-content: space-between;
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
      font-size: 14px;
      color: white;
      img {
        width: 65px;
        height: 60px;
        border-radius: 50%;
        vertical-align: top;
        cursor:pointer
      }
      .user_role {
        color: rgb(181,181,181);
        font-size: 13px;
        cursor: pointer
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
    .el-aside {}
    .el-main {
    }
  }
}
</style>
