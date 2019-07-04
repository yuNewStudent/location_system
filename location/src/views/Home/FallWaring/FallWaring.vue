<template>
  <div class="FallWaring">
    <div>
      <el-header>
        <el-input clearable class="name" placeholder="请输入设备ID" v-model="query.id"></el-input>
        <el-select v-model="query.type" clearable placeholder="请选择报警类型">
          <el-option
            v-for="item in Warningtypes"
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
          align="right"
          class="date_picker">
        </el-date-picker>
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
            align='center'
            label="报警人"
            width='150'>
            <template slot-scope="scope">
              {{scope.row.alarminformationName||'无报警人信息'}}
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            prop="alarminformationWearid"
            label="设备ID"
            width='140'>
          </el-table-column>
          <el-table-column
            align='center'
            prop="fall_message"
            label="报警类型"
            width='130'>
            <template slot-scope="scope">
              <span>{{getType(scope.row.alarminformationType)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            prop="alarminformationDate"
            label="报警时间"
            width='170'>
          </el-table-column>
          <el-table-column
            align='center'
            label="联系电话"
            width='120'>
            <template slot-scope="scope">
              {{scope.row.alarminformationNumber||'无联系电话'}}
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            prop='alarminformationLatandlong'
            label="报警地点">
          </el-table-column>
        </el-table>
        <el-pagination
          v-if='fallWarnings.length'
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-count='fallsInfo.pageSize'
          :page-size='pageSize'
          layout="total, prev, pager, next, jumper"
          :total="fallsInfo.count"></el-pagination>
      </el-main>
    </div>
    <waring-info :center='center' :currentDeviceId='currentDeviceId' @close='isShowWarningInfo = !isShowWarningInfo' v-if='isShowWarningInfo'></waring-info>
  </div>
</template>

<script>
import AMap from 'AMap'
import WaringInfo from '@/components/FallWaring/FallWaringInfo'
export default {
  data () {
    return {
      fallWarnings: [],
      Warningtypes: [
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
      isShowWarningInfo: false,
      // 分页
      currentPage: 1,
      pageSize: 8,
      currentDeviceId: '',
      query: {
        id: '',
        type: '',
        date: ''
      },
      fallsInfo: {
        count: 158,
        pageSize: 20
      },
      center: []
    }
  },
  components: {
    WaringInfo
  },
  methods: {
    // 进入报警信息详情页
    handleRow (row, column) {
      this.isShowWarningInfo = true
      this.currentDeviceId = row.alarminformationWearid
      this.center = row.lnglat
    },
    // 获取摔倒预警
    getFallWarnings (data) {
      this.$http.get(`${config.httpBaseUrl}/fall/getAll`, {
        params: data
      }).then((res) => {
        if (res.code === 200) {
          // 清空报警信息
          if (this.fallWarnings.length) {
            this.fallWarnings = []
          }
          // 设置分页信息
          this.fallsInfo.count = Number(res.totol)
          this.fallsInfo.pageSize = res.count
          // 处理位置信息
          const len = res.date.falls.length
          let i = 0
          const that = this
          async function getFalls () { // eslint-disable-line
            if (i > len - 1) return
            let item = res.date.falls[i]
            if (!item.alarminformationLatandlong || item.alarminformationLatandlong === '0') {
              item.alarminformationLatandlong = '无位置信息'
              return that.fallWarnings.push(item)
            }
            const lng = item.alarminformationLatandlong.split('-')[0]
            const lat = item.alarminformationLatandlong.split('-')[1]
            const data = await that.translateGps(lng, lat)
            item.lnglat = [data[0].lng, data[0].lat]
            item.alarminformationLatandlong = await that.getAddress(data[0].lng, data[0].lat)
            that.fallWarnings.push(item)
            i += 1
            getFalls()
          }
          getFalls()
          // res.date.falls.forEach(async (item, index) => {
          //   if (!item.alarminformationLatandlong || item.alarminformationLatandlong === '0') {
          //     item.alarminformationLatandlong = '无位置信息'
          //     return this.fallWarnings.push(item)
          //   }
          //   const lng = item.alarminformationLatandlong.split('-')[0]
          //   const lat = item.alarminformationLatandlong.split('-')[1]
          //   const data = await this.translateGps(lng, lat)
          //   item.lnglat = [data[0].lng, data[0].lat]
          //   const data_1 = await this.getAddress(data[0].lng, data[0].lat)
          //   item.alarminformationLatandlong = data_1
          //   this.fallWarnings.push(item)
          //   // this.translateGps(lng, lat).then(async data => {
          //   //   item.lnglat = await [data[0].lng, data[0].lat]
          //   //   this.getAddress(data[0].lng, data[0].lat).then(async data => {
          //   //     item.alarminformationLatandlong = await data
          //   //     this.fallWarnings.push(item)
          //   //   })
          //   // })
          // })
        }
      })
    },
    // 搜索符合条件的报警信息
    handleSearch () {
      this.currentPage = 1
      const data = {
        startdate: this.query.date ? this.moment(this.query.date[0]).format('YYYY-MM-DD HH:mm:ss') : '',
        enddate: this.query.date ? this.moment(this.query.date[1]).format('YYYY-MM-DD HH:mm:ss') : '',
        userId: this.query.id,
        page: this.currentPage - 1,
        type: this.query.type
      }
      this.getFallWarnings(data)
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
    // 跳转至对应分页
    handleCurrentChange (val) {
      this.currentPage = val
      // 获取报警
      const data = {
        startdate: this.query.date ? this.moment(this.query.date[0]).format('YYYY-MM-DD HH:mm:ss') : '',
        enddate: this.query.date ? this.moment(this.query.date[1]).format('YYYY-MM-DD HH:mm:ss') : '',
        userId: this.query.id,
        page: this.currentPage - 1,
        type: this.query.type
      }
      this.getFallWarnings(data)
    },
    // 获取报警类型
    getType (type) {
      switch (type) {
        case 'fence':
          return '电子围栏报警'
        case 'electricity':
          return '低电量报警'
        case 'sos':
          return 'sos报警'
      }
    },
    // 根据经纬度获取地址
    getAddress (lng, lat) {
      const lnglat = [lng, lat]
      return new Promise((resolve, reject) => {
        this.geocoder.getAddress(lnglat, (status, result) => {
          console.log(2)
          if (status === 'complete' && result.regeocode) {
            resolve(result.regeocode.formattedAddress)
          } else {
            alert(JSON.stringify(result))
          }
        })
      })
    },
    // gps转高德坐标
    translateGps (lng, lat) {
      const gps = [lng, lat]
      return new Promise((resolve, reject) => {
        AMap.convertFrom(gps, 'gps', (status, result) => {
          console.log(1)
          if (result.info === 'ok') {
            resolve(result.locations)
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
    // 获取报警
    const data = {
      startdate: '',
      enddate: '',
      userId: '',
      page: this.currentPage - 1,
      type: ''
    }
    this.getFallWarnings(data)
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
      width: 150px;
    }
    .date_picker {
      margin-right: 10px;
    }
  }
  .el-main {
    padding: 0 20px 0;
    margin-top: -5px;
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
