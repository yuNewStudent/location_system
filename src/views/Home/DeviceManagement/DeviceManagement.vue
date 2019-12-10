<template>
  <div class="DeviceManagement">
    <el-row class="header">
      <div class="search">
        <input type="text"
               placeholder="请输入人名设备ID"
               class="searchInput"
               v-model='deviceQuery'>
        <span class="searchBtn"
              @click='handleSearchDevice'><img src="@/assets/img/icon/搜索IC.png"
               alt=""></span>
      </div>
      <div class="radio">
        <div v-for='(item, index) in selects'
             :key='index'
             :class="{active:currentStatu===index+1}"
             @click='handleSelect(item.statu, index)'>
          <span class="radius"></span>
          <span class="title all">{{item.title}}</span>
        </div>
      </div>
      <div class="legends">
        <span @click='handleAddDevice'>
          <img src="@/assets/img/icon/新增IC.png"
               alt="">
          新增
        </span>
      </div>
    </el-row>
    <el-main>
      <el-table :data="paginationData"
                border
                style="width: 100%"
                :row-style="tableRowStyle"
                :header-cell-style="tableHeaderColor"
                size='mini'>
        <el-table-column align='center'
                         prop="userName"
                         label="佩戴人">
        </el-table-column>
        <el-table-column align='center'
                         prop="userDeviceId"
                         label="设备ID">
        </el-table-column>
        <el-table-column align='center'
                         prop="userActivationtime"
                         label="激活时间">
        </el-table-column>
        <el-table-column align='center'
                         prop="userNumber"
                         label="联系电话">
        </el-table-column>
        <el-table-column align='center'
                         label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.userStatus==0?'离线':'在线'}}</span>
          </template>
        </el-table-column>
        <el-table-column align='center'
                         label="操作">
          <template slot-scope="scope">
            <img src="@/assets/img/icon/修改IC.png"
                 @click="handleEditorDevice(scope.$index, scope.row)"
                 class="editor_img"
                 alt="">
            <img src="@/assets/img/icon/删除IC.png"
                 @click="handleDeleteDevice(scope.$index, scope.row.userDeviceId)"
                 class="del_img"
                 alt="">
            <!-- <el-button size="mini"
                       @click="handleEditorDevice(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini"
                       @click="handleDeleteDevice(scope.$index, scope.row.userDeviceId)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-count='devices.length/5'
                     :page-size='pageSize'
                     layout="total, prev, pager, next, jumper"
                     :total="devices.length"></el-pagination>
    </el-main>
    <change-device :type='type.add'
                   v-if='isShowAddDevice'
                   @addDevice='addDevice'></change-device>
    <change-device :type='type.editor'
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
      deviceQuery: '',
      devices: [
        // {
        //   activeTime: '2018-08-09',
        //   status: '离线',
        //   userName: '苏大爷',
        //   userDeviceId: '1222',
        //   userGender: '',
        //   userNumber: '1222',
        //   userBirth: '',
        //   userAddress: '',
        //   emergencycs: [
        //     {
        //       emergencycsName: '',
        //       emergencycsRelationShip: '',
        //       emergencycsNumber: '',
        //       emergencycrsNumber1: ''
        //     },
        //     {
        //       emergencycsName: '',
        //       emergencycsRelationShip: '',
        //       emergencycsNumber: '',
        //       emergencycrsNumber1: ''
        //     }
        //   ]
        // }
      ],
      filterDevices: [],
      isShowAddDevice: false,
      isShowEditorDevice: false,
      selectDevice: {
        index: '',
        row: []
      },
      selects: [
        {
          title: '全部',
          statu: -1
        },
        {
          title: '离线',
          statu: 0
        },
        {
          title: '在线',
          statu: 1
        }
      ],
      currentStatu: 1,
      // 分页
      currentPage: 1,
      paginationData: [],
      pageSize: 8
    }
  },
  components: {
    ChangeDevice
  },
  created () {
    this.getDevices()
  },
  watch: {
    deviceQuery (value) {
      if (!value) {
        this.currentStatu = 1
        this.getDevices()
      }
    }
  },
  methods: {
    // 获取设备
    getDevices () {
      // 服务器获取信息
      this.$http.get(`${config.httpBaseUrl}/user/getAll`).then((res) => {
        if (res.code === 200) {
          this.devices = res.date.users
          this.filterDevices = res.date.users
          // 分页
          this.handleCurrentChange(this.currentPage)
        }
      })
    },
    // 新增设备
    handleAddDevice () {
      this.isShowAddDevice = true
    },
    addDevice (bol, deviceInfo) {
      deviceInfo.userDeviceId = deviceInfo.userDeviceId.split('').filter((item, index) => {
        return index !== 0 && index !== 3 && index !== 6 && index !== 10 && index !== 14
      }).join('')
      if (bol) {
        this.$http.post(`${config.httpBaseUrl}/user/insertuser`, deviceInfo
        ).then((res) => {
          if (res.code === 200) {
            this.getDevices()
            this.$message({
              showClose: true,
              type: 'success',
              message: '添加设备成功!'
            })
          } else if (res.code === 210) {
            this.$message({
              showClose: true,
              type: 'error',
              message: '对不起，设备id已经存在!'
            })
          }
        })
      }
      this.isShowAddDevice = false
    },
    // 修改设备
    handleEditorDevice (index, row) {
      this.selectDevice.index = index
      this.selectDevice.row = row
      delete this.selectDevice.row.userAvatar
      delete this.selectDevice.row.maplocation
      delete this.selectDevice.row.userActivationtime
      delete this.selectDevice.row.userId
      delete this.selectDevice.row.userStatus
      this.isShowEditorDevice = true
    },
    editorDevice (bol, deviceInfo) {
      this.isShowEditorDevice = false
      if (!bol) {
        return
      }
      // for (let k in deviceInfo) {
      //   if (!deviceInfo[k]) {
      //     return this.$message({
      //       showClose: true,
      //       type: 'error',
      //       message: '所填信息不能为空!'
      //     })
      //   }
      // }
      this.$http.post(`${config.httpBaseUrl}/user/update`, deviceInfo)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              showClose: true,
              type: 'success',
              message: '修改成功!'
            })
            this.getDevices()
          }
        })
    },
    // 删除设备
    handleDeleteDevice (index, userDeviceId) {
      this.$confirm(`此操作将永久删除该设备, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get(`${config.httpBaseUrl}/user/deleteUser`, {
          params: {
            userDeviceId
          }
        }).then(res => {
          this.devices.splice(index, 1)
          // 分页
          this.currentPage = 1
          this.handleCurrentChange(this.currentPage)
          this.$message({
            showClose: true,
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          showClose: true,
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 筛选状态
    handleSelect (status, index) {
      this.currentStatu = index + 1
      this.filterDevices = []
      this.deviceQuery = ''
      switch (status) {
        case -1:
          this.filterDevices = this.devices
          break
        case 0:
          this.filterDevices = this.devices.filter(item => {
            return item.userStatus === 0
          })
          break
        case 1:
          this.filterDevices = this.devices.filter(item => {
            return item.userStatus === 1
          })
          break
      }
      // 分页
      this.handleCurrentChange(this.currentPage)
    },
    handleSearchDevice () {
      this.currentStatu = 1
      this.filterDevices = []
      this.filterDevices = this.devices.filter(item => {
        return item.userName.indexOf(this.deviceQuery) !== -1 || item.userDeviceId.indexOf(this.deviceQuery) !== -1
      })
      // 分页
      this.handleCurrentChange(this.currentPage)
      // this.$http.get(`${config.httpBaseUrl}/user/get`, {
      //   params: {
      //     userDeviceId: this.deviceQuery
      //   }
      // }).then((res) => {
      //   if (res.date.user.length) {
      //     this.devices = res.date.user
      //     // 分页
      //     this.handleCurrentChange(this.currentPage)
      //   } else {
      //     this.$message({
      //       showClose: true,
      //       type: 'info',
      //       message: '没有相关的设备'
      //     })
      //   }
      // })
    },
    // 修改table tr行的背景色
    tableRowStyle ({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'background-color: rgb(47,141,213); color: black'
      } else {
        return 'background-color: rgb(0,94,167); color:white'
      }
    },
    // 修改table header的背景色
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: rgb(0,94,167); color: white'
      }
    },
    // 分页
    getPaginationData (pageIndex) {
      const start = (pageIndex - 1) * this.pageSize
      const end = pageIndex * this.pageSize
      this.paginationData = this.filterDevices.slice(start, end)
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
    > div {
      display: inline-block;
    }
    .search {
      .searchInput {
        border: 1px solid rgba(54, 153, 255, 1);
        border-radius: 40px;
        box-sizing: border-box;
        font-size: 16px;
        width: 250px;
        height: 40px;
        border-radius: 40px;
        outline: none;
        background: transparent;
        padding: 0 15px;
        color: white;
      }
      .searchBtn {
        display: inline-block;
        width: 50px;
        line-height: 40px;
        text-align: center;
        background: rgba(0, 123, 201, 1);
        vertical-align: top;
        margin-left: -50px;
        border-radius: 0 40px 40px 0;
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
        background: #f8bf12;
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
      > div {
        width: 90px;
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
    }
    .legends {
      float: right;
      > span {
        display: inline-block;
        background: #f8bf12;
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
    padding-top: 10px;
    .el-table {
      color: white;
      font-size: 13px;
      .editor_img {
        width: 20px;
        height: 17px;
      }
      .del_img {
        margin-left: 10px;
        width: 14px;
        height: 17px;
      }
    }
    .el-pagination {
      text-align: right;
      margin-top: 10px;
    }
  }
}
</style>
