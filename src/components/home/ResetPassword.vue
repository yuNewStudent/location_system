<template>
  <message-box
    :type='type'
    :btns='btns'
    @closeMessageBox='resetPassword'>
    <el-main>
      <el-row>
        <label>旧密码</label>
        <el-input placeholder="请输入原密码"></el-input>
      </el-row>
      <el-row>
        <label>新密码</label>
        <el-input placeholder="请输入新密码"></el-input>
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
      accountInfo: {
        oldPassword: '',
        newPassword: ''
      }
    }
  },
  components: {
    MessageBox
  },
  methods: {
    resetPassword (bol) {
      // 修改密码
      this.$emit('resetPassword', bol, this.accountInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-main {
  padding: 10px 20px 0;
  .el-row {
    display: flex;
    margin: 20px 30px;
    align-items: center;
    label {
      width: 80px;
    }
  }
}
</style>
