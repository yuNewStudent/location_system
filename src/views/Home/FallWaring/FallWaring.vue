<template>
  <div class="FallWaring">
    <div>
      <el-header>
        <el-input clearable class="name" placeholder="请输入设备ID" v-model="query.id"></el-input>
        <el-select v-model="query.type" clearable placeholder="请选择报警类型">
          <el-option
            v-for="item in WarningNames"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker
          v-model="query.date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
        <!-- <el-date-picker
          v-model="query.date"
          type="date"
          placeholder="选择日期"
          class="date_picker picker">
        </el-date-picker>
        <el-time-picker
          is-range
          v-model="query.time"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          class="time_picker picker">
        </el-time-picker> -->
        <el-button @click='handleSearch'>搜索</el-button>
      </el-header>
      <el-main>
        <el-table
          :data="fallWarnings"
          border
          style="width: 100%"
          @row-click='handleRow'
          :row-style="tableRowStyle"
          :header-cell-style="tableHeaderColor"
          size='mini'>
          <el-table-column
            prop="fallNpeople"
            label="报警人"
            width='150'>
          </el-table-column>
          <el-table-column
            prop="fallUserid"
            label="设备ID"
            width='140'>
          </el-table-column>
          <el-table-column
            prop="fall_message"
            label="报警类型"
            width='130'>
          </el-table-column>
          <!-- <el-table-column
            prop="fall_message"
            label="报警信息">
          </el-table-column> -->
          <el-table-column
            prop="fallTime"
            label="报警时间"
            width='170'>
          </el-table-column>
          <el-table-column
            prop="fall_number"
            label="联系电话"
            width='120'>
          </el-table-column>
          <el-table-column
            prop='fallAddress'
            label="报警地点">
            <!-- <template slot-scope="scope">
              <span>{{address(scope.row.fallAddress)}}</span>
              <span>{{fallAddress}}</span>
            </template> -->
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
import AMap from 'AMap'
import WaringInfo from '@/components/FallWaring/FallWaringInfo'
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      fallWarnings: [
        // {
        //   fallNpeople: '谢老大',
        //   fallUserid: '12345',
        //   fallTime: '2018-05-06-10:20',
        //   fall_number: '12345678912',
        //   fall_message: '摔倒报警',
        //   fallAddress: '四川省成都市锦江区华为路'
        // }
      ],
      WarningNames: [
        {
          label: 'SOS报警',
          value: 'sos'
        },
        {
          label: '低电量报警',
          value: 'electricity'
        },
        {
          label: '电子围栏报警',
          value: 'fence'
        }
      ],
      geocoder: null,
      fallAddress: [],
      isShowWarningInfo: false,
      // 分页
      currentPage: 1,
      paginationData: [],
      pageSize: 8,
      currentDeviceId: '',
      query: {
        id: '',
        type: '',
        date: ''
        // time: ''
      }
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
      const data = {
        startdate: '',
        enddate: '',
        userId: '',
        page: 0,
        type: ''
      }
      this.$http.get(`${config.httpBaseUrl}/fall/getAll`, {
        params: {
          ...data
        }
      }).then((res) => {
          console.log(res)
        if (res.code === 200) {
          console.log(res)
          // 处理信息
          // res.date.falls.map(item => {
          //   const lng = item.fallAddress.split('-')[0]
          //   const lat = item.fallAddress.split('-')[1]
          //   this.getAddress(lng, lat).then(data => {
          //     item.fallAddress = data
          //     this.fallWarnings.push(item)
          //   })
          // })
        }
      })
      this.handleCurrentChange(this.currentPage)
    },
    handleSearch () {
      const data = {
        startdate: this.moment(this.query.date[0]).format('YYYY-MM-DD HH:mm:ss'),
        enddate: this.moment(this.query.date[1]).format('YYYY-MM-DD HH:mm:ss'),
        userId: this.query.id,
        page: 0,
        type: this.query.type
      }
      console.log(data)
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
    // // 分页
    // getPaginationData (pageIndex) {
    //   const start = (pageIndex - 1) * this.pageSize
    //   const end = pageIndex * this.pageSize
    //   this.paginationData = this.fallWarnings.slice(start, end)
    // },
    // // 跳转至对应分页
    // handleCurrentChange (val) {
    //   this.currentPage = val
    //   this.getPaginationData(val)
    // },
    // 根据经纬度获取地址
    getAddress (lng, lat) {
      const lnglat = [lng, lat]
      return new Promise((resolve, reject) => {
        this.geocoder.getAddress(lnglat, (status, result) => {
          if (status === 'complete' && result.regeocode) {
            resolve(result.regeocode.formattedAddress)
          } else {
            alert(JSON.stringify(result))
          }
        })
      })
    }
  },
  created () {
    AMap.plugin(['AMap.Geocoder'], () => {
      this.geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: 'all'
      })
    })
    this.getFallWarnings()
  }
}
</script>

<style lang="scss" scoped>
.FallWaring {
  .el-header {
    text-align: left;
    line-height: 40px;
    .name {
      width: 140px;
    }
    .el-select {
      margin-left: 10px;
      width: 150px;
    }
    .date_picker {
      margin-left: 10px;
      width: 140px;
    }
    .picker {
      // margin-left: 10px;
    }
    .time_picker {
      width: 250px;
    }
  }
  .el-main {
    padding: 0 20px;
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
