<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  created () {
    const userInfo = JSON.parse(this.$cookie.get('user'))
    this.setUser(userInfo)
  },
  methods: {
    ...mapMutations(['setUser'])
  }
}
</script>

<style lang='scss'>
@import './assets/css/reset.css';
html,body,#app{
  height: 100%;
}
.el-table__body tr:hover>td{
  color: black;
}
</style>
