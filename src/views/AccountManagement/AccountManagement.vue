<template>
  <div class="AccountManagement">
    <el-header>
      <div class="legends">
        <span @click='handleAddAccount'>
          <img src="@/assets/img/icon/新增IC.png" alt="">
          新增
        </span>
      </div>
    </el-header>
    <el-main>
      <el-table
        :data="accounts"
        border
        style="width: 100%"
        size='mini'>
        <el-table-column
          type='index'
          label="序号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话号码"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size='mini'
              @click="handleEditorAccount(scope.row, scope.$index)"
              type="text">修改</el-button>
            <el-button
              size='mini'
              type="text"
              @click="handleDelAccount(scope.row.name, scope.$index)">删除</el-button>
            <el-button
              size='mini'
              type="text"
              @click="handleResetPassword(scope.row, scope.$index)">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <change-account
      :type='type.add'
      v-if='isShowAddAccount'
      @addAccount='addAccount'></change-account>
    <change-account
      :type='type.editor'
      :selectAccount='selectAccount.row'
      v-if='isShowEditorAccount'
      @editorAccount='editorAccount'></change-account>
    <!-- <reset-password
      :type='type.resetPassword'
      v-if='isShowResetPassword'
      @resetPassword='resetPassword'></reset-password> -->
  </div>
</template>

<script>
// import ResetPassword from '@/components/home/ResetPassword'
import ChangeAccount from '@/components/AccountManagement/changeAccount'
export default {
  data () {
    return {
      accounts: [
        {
          name: 'sccdqq',
          phone: '1234'
        },
        {
          name: 'hhjj',
          phone: 'wer'
        },
        {
          name: 'ujjj',
          phone: '678w'
        }
      ],
      type: {
        add: '新增子账号',
        editor: '修改子账号',
        resetPassword: '修改密码'
      },
      isShowAddAccount: false,
      isShowEditorAccount: false,
      isShowResetPassword: false,
      selectAccount: {
        idnex: '',
        row: []
      },
      resetAccount: {
        index: '',
        row: []
      }
    }
  },
  components: {
    ChangeAccount
    // ResetPassword
  },
  methods: {
    // 新增账号
    handleAddAccount () {
      this.isShowAddAccount = true
    },
    addAccount (bol, accountInfo) {
      // 新增账号成功
      if (bol) {
        this.accounts.push(accountInfo)
        this.$message({
          type: 'success',
          message: '新增账号成功!'
        })
      }
      this.isShowAddAccount = false
    },
    // 修改账号
    handleEditorAccount (row, index) {
      this.selectAccount.index = index
      this.selectAccount.row = row
      this.isShowEditorAccount = true
    },
    editorAccount (bol, accountInfo) {
      // 修改成功
      if (bol) {
        this.accounts.splice(this.selectAccount.index, 1, accountInfo)
        this.$message({
          type: 'success',
          message: '账号信息修改成功!'
        })
      }
      this.isShowEditorAccount = false
    },
    // 删除账号
    handleDelAccount (name, index) {
      this.$confirm(`此操作将永久删除该${name}的账号信息, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.accounts.splice(index, 1)
        // 服务器删除
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
    // 重置密码
    handleResetPassword (row, index) {
      // 服务器重置
      this.$confirm('此操作将重置该账号密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '重置密码成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消重置密码'
        })
      })
    },
    resetPassword (bol, accountInfo) {
      if (bol) {
        // 本地修改
        this.accounts.splice(this.resetAccount.index, 1, accountInfo)
        // 服务器修改
        this.$message({
          type: 'success',
          message: '重置密码成功!'
        })
      }
      this.isShowResetPassword = false
    }
  }
}
</script>

<style lang="scss" scoped>
.AccountManagement {
  width: 700px;
  .el-header {
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
    padding-top: 0;
  }
}
</style>
