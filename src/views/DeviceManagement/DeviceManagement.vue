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
        <!-- <el-radio v-model="radio2" label="1" border size="medium">全部</el-radio>
        <el-radio v-model="radio2" label="1" border size="medium">离线</el-radio>
        <el-radio v-model="radio2" label="2" border size="medium">在线</el-radio> -->
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
        :data="devices"
        border
        style="width: 100%"
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
        }
      ],
      isShowAddDevice: false,
      isShowEditorDevice: false,
      selectDevice: {
        index: '',
        row: []
      }
    }
  },
  components: {
    ChangeDevice
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.DeviceManagement {
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
