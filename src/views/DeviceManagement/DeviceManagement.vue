<template>
  <div class="DeviceManagement">
    <el-row class="header">
      <div class="search">
        <input
          type="text"
          placeholder="请输入人名或车辆编号"
          class="searchInput">
        <span class="searchBtn"><img src="@/assets/img/icon/搜索IC.png" alt=""></span>
      </div>
      <div class="radio">
        <div
          v-for='(item, index) in selects'
          :key='index'
          :class="{active:currentStatu===index+1}"
          @click='handleSelect(index)'>
          <span class="radius"></span>
          <span class="title all">{{item.title}}</span>
        </div>
      </div>
      <div class="legends">
        <span @click='handleAddDevice'>
          <img src="@/assets/img/icon/新增IC.png" alt="">
          新增
        </span>
      </div>
    </el-row>
    <el-main>
      <el-table
        :data="paginationData"
        border
        style="width: 100%"
        :row-style="tableRowStyle"
        :header-cell-style="tableHeaderColor"
        size='mini'><el-table-column
          prop="WearerPerson"
          label="佩戴人">
        </el-table-column>
        <el-table-column
          prop="deviceID"
          label="设备ID">
        </el-table-column>
        <el-table-column
          prop="activeTime"
          label="激活时间">
        </el-table-column>
        <el-table-column
          prop="emergencyCall"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEditorDevice(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              @click="handleDeleteDevice(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-count='devices.length/5'
        :page-size='pageSize'
        layout="total, prev, pager, next, jumper"
        :total="devices.length"></el-pagination>
    </el-main>
    <change-device
      :type='type.add'
      v-if='isShowAddDevice'
      @addDevice='addDevice'></change-device>
    <change-device
      :type='type.editor'
      v-if='isShowEditorDevice'
      :selectDevice='selectDevice'
      @editorDevice='editorDevice'></change-device>
  </div>
</template>

<script>
import ChangeDevice from '@/components/DeviceManagement/ChangeDevice'
export default {
  data () {
    return {
      type: {
        add: '新增设备',
        editor: '修改设备'
      },
      devices: [
        {
          WearerPerson: '苏大爷',
          deviceID: '1234',
          activeTime: '2018-08-09',
          emergencyCall: 13418854312,
          status: '离线'
        },
        {
          WearerPerson: '苏大爷',
          deviceID: '1234',
          activeTime: '2018-08-09',
          emergencyCall: 13418854312,
          status: '离线'
        },
        {
          WearerPerson: '苏大爷',
          deviceID: '1234',
          activeTime: '2018-08-09',
          emergencyCall: 13418854312,
          status: '离线'
        },
        {
          WearerPerson: '苏大爷',
          deviceID: '1234',
          activeTime: '2018-08-09',
          emergencyCall: 13418854312,
          status: '离线'
        },
        {
          WearerPerson: '苏大爷',
          deviceID: '1234',
          activeTime: '2018-08-09',
          emergencyCall: 13418854312,
          status: '离线'
        },
        {
          WearerPerson: '苏大爷',
          deviceID: '1234',
          activeTime: '2018-08-09',
          emergencyCall: 13418854312,
          status: '离线'
        }
      ],
      isShowAddDevice: false,
      isShowEditorDevice: false,
      selectDevice: {
        index: '',
        row: []
      },
      selects: [
        {
          title: '全部',
          statu: 1
        },
        {
          title: '离线',
          statu: 2
        },
        {
          title: '在线',
          statu: 3
        }
      ],
      currentStatu: 1,
      // 分页
      currentPage: 1,
      paginationData: [],
      pageSize: 5
    }
  },
  components: {
    ChangeDevice
  },
  created () {
    this.getDevices()
  },
  methods: {
    // 获取设备
    getDevices () {
      // 服务器获取信息
      // 分页
      this.handleCurrentChange(this.currentPage)
    },
    // 新增设备
    handleAddDevice () {
      this.isShowAddDevice = true
    },
    addDevice (bol, deviceInfo) {
      if (bol) {
        for (let k in deviceInfo) {
          if (!deviceInfo[k]) {
            return this.$message.error('所填信息不能为空')
          }
        }
        deviceInfo.status = '离线'
        this.devices.push(deviceInfo)
        // 分页
        this.currentPage = 1
        this.handleCurrentChange(this.currentPage)
      }
      this.isShowAddDevice = false
    },
    // 修改设备
    handleEditorDevice (index, row) {
      this.selectDevice.index = index
      this.selectDevice.row = row
      this.isShowEditorDevice = true
    },
    editorDevice (bol, deviceInfo) {
      if (bol) {
        this.devices.splice(this.selectDevice.index, 1, deviceInfo)
      }
      this.isShowEditorDevice = false
    },
    // 删除设备
    handleDeleteDevice (index, row) {
      this.$confirm(`此操作将永久删除该设备, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.devices.splice(index, 1)
        // 分页
        this.currentPage = 1
        this.handleCurrentChange(this.currentPage)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 筛选状态
    handleSelect (index) {
      this.currentStatu = index + 1
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
      this.paginationData = this.devices.slice(start, end)
    },
    // 跳转至对应分页
    handleCurrentChange (val) {
      this.currentPage = val
      this.getPaginationData(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.DeviceManagement {
  .header {
    padding: 0 20px;
    >div {
      display: inline-block;
    }
    .search {
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
    }
    .radio {
      color: white;
      width: 300px;
      margin-left: 200px;
      > div {
        display: inline-block;
        cursor: pointer;
      }
      .active {
        background: #F8BF12;
        border-radius: 20px;
        color: black;
        .radius {
          border: 2px solid black;
          display: inline-block;
          border-radius: 50%;
          width: 5px;
          height: 5px;
          background: white;
        }
      }
      >div {
        width: 90px;
        height: 40px;
        line-height: 40px;
        text-align: center;
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
      color: #606266;
      font-size: 13px;
    }
    .el-pagination {
      text-align: right;
      margin-top: 10px;
    }
  }
}
</style>
