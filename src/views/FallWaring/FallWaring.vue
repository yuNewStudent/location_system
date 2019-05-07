<template>
  <div class="FallWaring">
    <div>
      <el-row class="header">
        <div class="search">
          <input
            type="text"
            placeholder="请输入人名或车辆编号"
            class="searchInput">
          <span class="searchBtn"><img src="@/assets/img/icon/搜索IC.png" alt=""></span>
        </div>
      </el-row>
      <el-main>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @row-click='handleRow'
          size='mini'>
          <el-table-column
            prop="warningPerson"
            label="报警人">
          </el-table-column>
          <el-table-column
            prop="deviceId"
            label="设备ID">
          </el-table-column>
          <el-table-column
            prop="warningTime"
            label="报警时间">
          </el-table-column>
          <el-table-column
            prop="contactPhone"
            label="联系电话">
          </el-table-column>
          <el-table-column
            prop="warningAddress"
            label="报警地点">
          </el-table-column>
        </el-table>
      </el-main>
    </div>
    <waring-info v-if='isShowWarningInfo'></waring-info>
  </div>
</template>

<script>
import WaringInfo from '@/components/FallWaring/FallWaringInfo'
export default {
  data () {
    return {
      tableData: [
        {
          warningPerson: '谢老大',
          deviceId: '12345',
          warningTime: '2018-05-06-10:20',
          contactPhone: '12345678912',
          warningAddress: '四川省成都市锦江区华为路'
        },
        {
          warningPerson: '谢老大',
          deviceId: '12345',
          warningTime: '2018-05-06-10:20',
          contactPhone: '12345678912',
          warningAddress: '四川省成都市锦江区华为路'
        },
        {
          warningPerson: '谢老大',
          deviceId: '12345',
          warningTime: '2018-05-06-10:20',
          contactPhone: '12345678912',
          warningAddress: '四川省成都市锦江区华为路'
        },
        {
          warningPerson: '谢老大',
          deviceId: '12345',
          warningTime: '2018-05-06-10:20',
          contactPhone: '12345678912',
          warningAddress: '四川省成都市锦江区华为路'
        }
      ],
      isShowWarningInfo: false
    }
  },
  components: {
    WaringInfo
  },
  methods: {
    handleRow (row, column) {
      console.log(row, column)
      this.isShowWarningInfo = true
    }
  }
}
</script>

<style lang="scss" scoped>
.FallWaring {
  .header {
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
}
</style>
