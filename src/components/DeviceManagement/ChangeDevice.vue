<template>
  <message-box
    class="add_person"
    :type='type'
    :btns='btns'
    @closeMessageBox='changeDevice'>
    <el-main>
      <el-row>
        <label for="">佩戴人</label>
        <input v-model="deviceInfo.WearerPerson" type="text">
      </el-row>
      <el-row>
        <label for="">设备ID</label>
        <input
          type="text"
          v-model="deviceInfo.deviceID">
      </el-row>
      <el-row>
        <label for="">激活时间</label>
        <input
          v-model="deviceInfo.activeTime"
          type="date">
      </el-row>
      <el-row>
        <label for="">联系电话</label>
        <input v-model="deviceInfo.emergencyCall" type="text">
      </el-row>
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
        emergencyCall: ''
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
      console.log(bol, this.deviceInfo)
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
    padding: 0 30px;
    .el-row {
      display: flex;
      padding: 10px 0;
      label  {
        display: inline-block;
        width: 100px;
      }
      input {
        flex: 1;
        outline: none;
        border-bottom: 2px solid rgb(231,231,231);
      }
    }
  }
}
</style>
