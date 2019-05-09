<template>
  <message-box
    class="add_person"
    :type='type'
    :btns='btns'
    @closeMessageBox='changeDevice'>
    <el-main>
      <div class="user">
        <el-row>
          <label for="">设备ID</label>
          <input
            type="text"
            v-model="deviceInfo.deviceID">
        </el-row>
        <el-row>
          <label for="">佩戴人</label>
          <input v-model="deviceInfo.WearerPerson" type="text">
        </el-row>
        <el-row>
          <label for="">性别</label>
          <el-radio v-model="deviceInfo.sex" label="1">男</el-radio>
          <el-radio v-model="deviceInfo.sex" label="2">女</el-radio>
        </el-row>
        <el-row>
          <label for="">出生日期</label>
          <input
            v-model="deviceInfo.birth"
            type="date">
        </el-row>
        <el-row>
          <label for="">家庭住址</label>
          <input v-model="deviceInfo.address" type="text">
        </el-row>
      </div>
      <div class="contact">
        <el-row>
          <label for="">紧急联系人1</label>
          <input v-model="deviceInfo.activeTime" type="text">
        </el-row>
        <el-row>
          <label for="">联系电话</label>
          <input v-model="deviceInfo.emergencyCall" type="text">
        </el-row>
        <el-row>
          <label for=""></label>
          <input v-model="deviceInfo.emergencyCall" type="text">
        </el-row>
        <el-row>
          <label for="">紧急联系人2</label>
          <input v-model="deviceInfo.activeTime" type="text">
        </el-row>
        <el-row>
          <label for="">联系电话</label>
          <input v-model="deviceInfo.emergencyCall" type="text">
        </el-row>
        <el-row>
          <label for=""></label>
          <input v-model="deviceInfo.emergencyCall" type="text">
        </el-row>
      </div>
    </el-main>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type', 'selectDevice'],
  data () {
    return {
      btns: {
        comfirm: '确定',
        cancel: '取消'
      },
      deviceInfo: {
        WearerPerson: '',
        deviceID: '',
        activeTime: '',
        emergencyCall: '',
        sex: '',
        phone: '',
        birth: '',
        address: '',
        emergencyContact_1: '',
        emergencyPhone_1: '',
        emergencyContact_2: '',
        emergencyPhone_2: ''
      },
      // 是否是修改
      isEditor: false
    }
  },
  components: {
    MessageBox
  },
  methods: {
    changeDevice (bol) {
      // 新增设备
      if (!this.selectDevice) {
        this.$emit('addDevice', bol, this.deviceInfo)
      } else {
        // 修改设备
        this.$emit('editorDevice', bol, this.deviceInfo)
      }
    }
  },
  created () {
    if (this.selectDevice) {
      this.isEditor = true
      this.deviceInfo = this.selectDevice.row
    }
  }
}
</script>

<style lang="scss" scoped>
.add_person {
  .el-main {
    padding: 0;
    .user {
      padding: 0 50px 10px;
      border-bottom: 1px solid rgb(231,231,231);
    }
    .contact {
      padding: 10px 50px 0;
    }
    .el-row {
      display: flex;
      padding: 8px 0;
      height: 35px;
      box-sizing: border-box;
      font-size: 15px;
      label  {
        display: inline-block;
        width: 100px;
      }
      input {
        flex: 1;
        outline: none;
        border-bottom: 1px solid rgb(211,211,211);
      }
    }
  }
}
</style>
