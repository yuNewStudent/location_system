<template>
  <div class="RealTimeLocation">
    <el-row class="header">
      <div class="search">
        <input
          type="text"
          placeholder="请输入人名或车辆编号"
          class="searchInput">
        <span class="searchBtn"><img src="@/assets/img/icon/搜索IC.png" alt=""></span>
      </div>
      <div class="legends">
        <span class="old_man">
          <span></span>
          老人
        </span>
        <span class="car">
          <span></span>
          车辆
        </span>
      </div>
    </el-row>
    <el-main>
      <map-page @showPersonLine='showPersonLine'></map-page>
    </el-main>
    <person-line
      v-if='isPersonLine'
      @close='close'></person-line>
  </div>
</template>

<script>
import MapPage from '@/components/Amap'
import PersonLine from '@/components/PersonLine'
export default {
  data () {
    return {
      isPersonLine: false
    }
  },
  methods: {
    showPersonLine () {
      this.isPersonLine = true
    },
    close () {
      this.isPersonLine = false
    }
  },
  components: {
    MapPage,
    PersonLine
  }
}
</script>

<style lang="scss" scoped>
.RealTimeLocation {
  position: relative;
  height: 100%;
  .header {
    padding: 0 20px;
    >div {
      display: inline-block;
    }
    .searchInput {
      box-sizing: border-box;
      font-size: 16px;
      width: 250px;
      height: 40px;
      border-radius: 40px;
      outline: none;
      background: transparent;
      border: 2px solid #313131;
      padding: 0 10px;
      color: white;
    }
    .searchBtn {
      display: inline-block;
      width: 50px;
      line-height: 40px;
      text-align: center;
      border-radius: 0 40px 40px 0;
      color: red;
      background: #313131;
      vertical-align: top;
      margin-left: -50px;
      img {
        width: 24px;
        height: 20px;
        position: relative;
        top: 3px;
      }
    }
    .legends {
      margin-left: 160px;
      .old_man {
        display: inline-block;
        color: #0C4F62;
        >span {
          display: inline-block;
          width: 16px;
          height: 16px;
          background: #0C4F62;
        }
      }
      .car {
        margin-left: 60px;
        display: inline-block;
        color: #F06749;
        line-height: 19px;
        >span {
          display: inline-block;
          width: 16px;
          height: 16px;
          background: #F06749;
        }
      }
    }
  }
  .el-main {
    padding: 0 20px;
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0px;
  }
}
</style>
