<template>
  <message-box
    class="add_person"
    :type='type'
    :btns='btns'
    @closeMessageBox='changePerson'>
    <el-main>
      <el-row>
        <label for="">姓名</label>
        <input v-model="userInfo.name" type="text">
      </el-row>
      <el-row>
        <label for="">性别</label>
        <el-radio v-model="userInfo.userGender" label="1">男</el-radio>
        <el-radio v-model="userInfo.userGender" label="0">女</el-radio>
      </el-row>
      <el-row>
        <label for="">出生日期</label>
        <input
          v-model="userInfo.birth"
          type="date">
      </el-row>
      <el-row>
        <label for="">家庭住址</label>
        <input v-model="userInfo.address" type="text">
      </el-row>
      <el-row>
        <label for="">紧急联系人1</label>
        <input v-model="userInfo.emergencyContact_1" type="text">
      </el-row>
      <el-row>
        <label for="">紧急电话</label>
        <input v-model="userInfo.emergencyPhone_1" type="text">
      </el-row>
      <el-row>
        <label for="">紧急联系人2</label>
        <input v-model="userInfo.emergencyContact_2" type="text">
      </el-row>
      <el-row>
        <label for="">紧急电话</label>
        <input v-model="userInfo.emergencyPhone_2" type="text">
      </el-row>
    </el-main>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type'],
  data () {
    return {
      btns: {
        comfirm: '确定',
        cancel: '取消'
      },
      userInfo: {
        name: '',
        sex: '',
        phone: '',
        deviceId: '',
        birth: '',
        address: '',
        emergencyContact_1: '',
        emergencyPhone_1: '',
        emergencyContact_2: '',
        emergencyPhone_2: ''
      }
    }
  },
  components: {
    MessageBox
  },
  methods: {
    changePerson (bol) {
      this.$emit('changePerson')
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
