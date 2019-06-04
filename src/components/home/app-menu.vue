<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    :mode="mode"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <!-- <el-submenu
      index="1">
      <template slot="title">实时监控</template>
      <el-menu-item
        v-for='(item, index) in menus.arr.RealTimeMonitor.group'
        :key='index'
        :index="'1-'+index"
        :route='goRoute(item.name)'
        @click='handleRoute(item.name)'>{{item.title}}</el-menu-item>
    </el-submenu> -->
    <el-menu-item
      v-for='(item, index) in menus'
      :index="index + ''"
      :key='index'
      :route='goRoute(item.name)'
      ref='menuItem'
      @click='handleRoute(item.name)'>
      <span>{{item.title}}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  props: ['menus', 'mode'],
  data () {
    return {
      activeIndex: '0'
    }
  },
  methods: {
    goRoute (name) {
      return {
        name: name
      }
    },
    handleRoute (name) {
      this.$router.push({
        name: name
      })
    },
    handleRouteHead (name) {
      this.$router.push({
        name: 'RealTimeLocation'
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  display: inline-block;
  border: none;
  background: transparent !important;
  // width: 80%;
  .el-menu-item {
    background: transparent !important;
  }
}
</style>
