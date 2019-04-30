<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    :mode="mode"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item
      v-for='(item, index) in menus'
      :index="index+''"
      :key='index'
      ref='menuItem'>{{item.title}}
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
  mounted () {
    this.$nextTick(() => {
      if (!this.mode) {
        this.$refs.menuItem.forEach(item => {
          item.$el.style.width = 160 + 'px'
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  display: inline-block;
  border: none;
  // width: 80%;
}
</style>
