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
        :row-style="tableRowStyle"
        :header-cell-style="tableHeaderColor"
        size='mini'>
        <el-table-column
          align='center'
          type='index'
          label="序号">
        </el-table-column>
        <el-table-column
          align='center'
          prop="administratorName"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          align='center'
          prop="administratorAccount"
          label="电话号码"
          width="180">
        </el-table-column>
        <el-table-column
          align='center'
          label="操作">
          <template slot-scope="scope">
            <!-- <el-button
              size='mini'
              @click="handleEditorAccount(scope.row, scope.$index)">修改</el-button> -->
            <el-button
              size='mini'
              @click="handleDelAccount(scope.row.administratorAccount, scope.$index)">删除</el-button>
            <el-button
              size='mini'
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
  </div>
</template>

<script>
// import ResetPassword from '@/components/home/ResetPassword'
import { mapGetters } from 'vuex'
import ChangeAccount from '@/components/AccountManagement/changeAccount'
export default {
  data () {
    return {
      accounts: [
        // {
        //   name: 'sccdqq',
        //   phone: '1234'
        // },
        // {
        //   name: 'hhjj',
        //   phone: 'wer'
        // },
        // {
        //   name: 'ujjj',
        //   phone: '678w'
        // }
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
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    // 新增账号
    handleAddAccount () {
      this.isShowAddAccount = true
    },
    addAccount (bol, accountInfo) {
      // 新增账号成功
      if (bol) {
        for (var k in accountInfo) {
          if (!accountInfo[k]) {
            return this.$message({
              showClose: true,
              message: '信息不能为空',
              type: 'error'
            })
          }
        }
        const data = {
          administratorName: accountInfo.administratorName,
          administratorAccount: accountInfo.administratorAccount
        }
        this.$http.get(`${config.httpBaseUrl}/admin/insertAdmin`, {
          params: data
        }).then(res => {
          if (res.code === 200) {
            this.accounts.push(accountInfo)
            this.$message({
              showClose: true,
              type: 'success',
              message: '新增账号成功!'
            })
          }
        })
      }
      this.isShowAddAccount = false
    },
    // 删除账号
    handleDelAccount (name, index) {
      this.$confirm(`此操作将永久删除该${name}的账号信息, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          acne: name
        }
        // 服务器删除
        this.$http.get(`${config.httpBaseUrl}/admin/deleteAdmin`, {
          params: data
        }).then(res => {
          if (res.code === 200) {
            this.accounts.splice(index, 1)
            this.$message({
              showClose: true,
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          showClose: true,
          type: 'info',
          message: '已取消删除'
        })
      })
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
    // 重置密码
    handleResetPassword (row, index) {
      // 服务器重置
      this.$confirm('此操作将重置该账号密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          acne: row.administratorAccount
        }
        this.$http.get(`${config.httpBaseUrl}/admin/updateAdmin`, {
          params: data
        }).then(res => {
          if (res.code === 200) {
            this.$message({
              showClose: true,
              type: 'success',
              message: '重置密码成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消重置密码'
        })
      })
    }
  },
  mounted () {
    this.$http.get(`${config.httpBaseUrl}/admin/getAllaAdmin`).then(res => {
      this.accounts = res.date.administrators
    })
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
    .el-table {
      color: white;
      font-size: 13px;
    }
  }
}
</style>
