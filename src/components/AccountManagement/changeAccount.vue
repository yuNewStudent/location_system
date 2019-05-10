<template>
  <message-box
    :type='type'
    :btns='btns'
    @closeMessageBox='changeAccount'>
    <el-main>
      <el-row>
        <label>姓名</label>
        <el-input
          v-model="accountInfo.name"
          placeholder="请输入账号"
          :disabled="selectAccount"></el-input>
      </el-row>
      <el-row>
        <label>电话号码</label>
        <el-input v-model="accountInfo.phone" placeholder="请输入密码"></el-input>
      </el-row>
    </el-main>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type', 'selectAccount'],
  data () {
    return {
      btns: {
        comfirm: '确定',
        cancel: '取消'
      },
      accountInfo: {
        name: '',
        phone: ''
      }
    }
  },
  components: {
    MessageBox
  },
  methods: {
    changeAccount (bol) {
      // 新增账户
      if (!this.selectAccount) {
        this.$emit('addAccount', bol, this.accountInfo)
      } else {
        this.$emit('editorAccount', bol, this.accountInfo)
      }
    }
  },
  created () {
    if (this.selectAccount) {
      this.accountInfo = this.selectAccount
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
