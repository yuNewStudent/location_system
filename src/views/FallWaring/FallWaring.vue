<template>
  <div class="FallWaring">
    <div>
      <!-- <el-row class="header">
        <div class="search">
          <input
            type="text"
            placeholder="请输入人名或车辆编号"
            class="searchInput">
          <span class="searchBtn"><img src="@/assets/img/icon/搜索IC.png" alt=""></span>
        </div>
      </el-row> -->
      <el-main>
        <el-table
          :data="paginationData"
          border
          style="width: 100%"
          @row-click='handleRow'
          :row-style="tableRowStyle"
          :header-cell-style="tableHeaderColor"
          size='mini'>
          <el-table-column
            prop="fallNpeople"
            label="报警人">
          </el-table-column>
          <el-table-column
            prop="fallUserid"
            label="设备ID">
          </el-table-column>
          <el-table-column
            prop="fall_message"
            label="报警信息">
          </el-table-column>
          <el-table-column
            prop="fallTime"
            label="报警时间">
          </el-table-column>
          <el-table-column
            prop="fall_number"
            label="联系电话">
          </el-table-column>
          <el-table-column
            prop="fallAddress"
            label="报警地点">
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-count='fallWarnings.length/5'
          :page-size='pageSize'
          layout="total, prev, pager, next, jumper"
          :total="fallWarnings.length"></el-pagination>
      </el-main>
    </div>
    <waring-info :currentDeviceId='currentDeviceId' @close='isShowWarningInfo = !isShowWarningInfo' v-if='isShowWarningInfo'></waring-info>
  </div>
</template>

<script>
import WaringInfo from '@/components/FallWaring/FallWaringInfo'
export default {
  data () {
    return {
      fallWarnings: [
        {
          fallNpeople: '谢老大',
          fallUserid: '12345',
          fallTime: '2018-05-06-10:20',
          fall_number: '12345678912',
          fall_message: '摔倒报警',
          fallAddress: '四川省成都市锦江区华为路'
        }
      ],
      isShowWarningInfo: false,
      // 分页
      currentPage: 1,
      paginationData: [],
      pageSize: 8,
      currentDeviceId: ''
    }
  },
  components: {
    WaringInfo
  },
  methods: {
    handleRow (row, column) {
      this.isShowWarningInfo = true
      this.currentDeviceId = row.fallUserid
    },
    // 获取摔倒预警
    getFallWarnings () {
      this.$http.get(`${config.httpBaseUrl}/fall/getAll`).then((res) => {
        if (res.code === 200) {
          this.fallWarnings = res.date.falls
          // 刚打开页面时加载前5项、且自动生成分页数量
          this.getPaginationData(this.currentPage)
        }
      })
      this.handleCurrentChange(this.currentPage)
    },
    // 修改table tr行的背景色
    tableRowStyle (row, rowIndex) {
      return 'background-color: black;'
    },
    // 修改table header的背景色
    tableHeaderColor ({row, column, rowIndex, columnIndex}) {
      if (rowIndex === 0) {
        return 'background-color: black; color: white'
      }
    },
    // 分页
    getPaginationData (pageIndex) {
      const start = (pageIndex - 1) * this.pageSize
      const end = pageIndex * this.pageSize
      this.paginationData = this.fallWarnings.slice(start, end)
    },
    // 跳转至对应分页
    handleCurrentChange (val) {
      this.currentPage = val
      this.getPaginationData(val)
    }
  },
  created () {
    this.getFallWarnings()
  }
}
</script>

<style lang="scss" scoped>
.FallWaring {
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
    .total {
      font-size: 14px;
      color: #7E7E7E;
      >span {
        color: white;
      }
    }
    .legends {
      float: right;
      >span {
        display: inline-block;
        background: #F8BF12;
        padding: 0 20px;
        width: 60px;
        height: 40px;
        display: flex;
        align-items: center;
        color: black;
        font-size: 16px;
        border-radius: 20px;
        img {
          width: 21px;
          margin-right: 6px;
        }
      }
    }
  }
  .el-main {
    .el-table {
      color: #fff;
      font-size: 13px;
    }
    .el-pagination {
      text-align: right;
      margin-top: 10px;
    }
  }
}
</style>
