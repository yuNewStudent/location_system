<template>
  <div class="CarsManagement">
    <el-row class="header">
      <div class="search">
        <input
          type="text"
          placeholder="车辆编号"
          class="searchInput"
          v-model="carQuery">
        <span class="searchBtn" @click='handleSearch'><img src="@/assets/img/icon/搜索IC.png" alt=""></span>
      </div>
      <div class="legends">
        <span @click='handleAddCar'>
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
          prop="carModel"
          label="车辆型号">
        </el-table-column>
        <el-table-column
          prop="carNum"
          label="车辆编号">
        </el-table-column>
        <el-table-column
          prop="useCompany"
          label="使用单位">
        </el-table-column>
        <el-table-column
          prop="emergencyCall"
          label="紧急电话">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEditorCar(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              @click="handleDeleteCar(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-count='cars.length/5'
        :page-size='pageSize'
        layout="total, prev, pager, next, jumper"
        :total="cars.length"
      ></el-pagination>
    </el-main>
    <change-car
      :type='type.add'
      v-if='isShowAddCar'
      @addCar='addCar'></change-car>
    <change-car
      :type='type.editor'
      :selectCar='selectCar.row'
      v-if='isShowEditorCar'
      @editorCar='editorCar'></change-car>
  </div>
</template>

<script>
import ChangeCar from '@/components/CarsManagement/ChangeCar'
export default {
  data () {
    return {
      type: {
        add: '新增车辆',
        editor: '修改车辆'
      },
      carQuery: '',
      cars: [
        {
          carModel: '路虎X89',
          carNum: '12345',
          useCompany: '上海市XX科技有限公司',
          emergencyCall: '12345678912'
        },
        {
          carModel: '路虎X89',
          carNum: '12345',
          useCompany: '上海市XX科技有限公司',
          emergencyCall: '12345678912'
        },
        {
          carModel: '路虎X89',
          carNum: '12345',
          useCompany: '上海市XX科技有限公司',
          emergencyCall: '12345678912'
        },
        {
          carModel: '路虎X89',
          carNum: '12345',
          useCompany: '上海市XX科技有限公司',
          emergencyCall: '12345678912'
        },
        {
          carModel: '路虎X89',
          carNum: '12345',
          useCompany: '上海市XX科技有限公司',
          emergencyCall: '12345678912'
        },
        {
          carModel: '路虎X89',
          carNum: '12345',
          useCompany: '上海市XX科技有限公司',
          emergencyCall: '12345678912'
        }
      ],
      selectCar: {
        index: '',
        row: []
      },
      isShowAddCar: false,
      isShowEditorCar: false,
      // 分页
      currentPage: 1,
      paginationData: [],
      pageSize: 5
    }
  },
  components: {
    ChangeCar
  },
  created () {
    this.getCars()
  },
  methods: {
    // 获取车辆
    getCars () {
      // 服务器获取车辆
      // 刚打开页面时加载前5项、且自动生成分页数量
      this.getPaginationData(this.currentPage)
    },
    // 修改table tr行的背景色
    tableRowStyle ({row, rowIndex}) {
      return 'background-color: black; color: white'
    },
    // 修改table header的背景色
    tableHeaderColor ({row, column, rowIndex, columnIndex}) {
      if (rowIndex === 0) {
        return 'background-color: black; color: white'
      }
    },
    // 新增车辆
    addCar (bol, carInfo) {
      for (var k in carInfo) {
        if (!carInfo[k]) {
          return this.$message({
            showClose: true,
            message: '信息不能为空',
            type: 'error'
          })
        }
      }
      this.cars.unshift(carInfo)
      // 刚打开页面时加载前5项、且自动生成分页数量
      this.currentPage = 1
      this.getPaginationData(this.currentPage)
      this.isShowAddCar = false
    },
    handleAddCar () {
      this.isShowAddCar = true
    },
    // 修改车辆
    handleEditorCar (index, row) {
      this.selectCar.index = index
      this.selectCar.row = row
      this.isShowEditorCar = true
    },
    editorCar (bol, carInfo) {
      this.cars.splice(this.selectCar.index, 1, carInfo)
      this.$message({
        type: 'success',
        message: '修改成功!'
      })
      this.isShowEditorCar = false
    },
    // 删除车辆
    handleDeleteCar (index, row) {
      this.$confirm(`此操作将永久删除该车辆, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cars.splice(index, 1)
        // 刚打开页面时加载前5项、且自动生成分页数量
        this.currentPage = 1
        this.getPaginationData(this.currentPage)
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
    // 过滤器
    handleSearch () {
    },
    // 分页
    getPaginationData (pageIndex) {
      const start = (pageIndex - 1) * this.pageSize
      const end = pageIndex * this.pageSize
      this.paginationData = this.cars.slice(start, end)
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
.CarsManagement{
  .header {
    padding: 0 20px;
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
  .el-main {
    .el-pagination {
      text-align: right;
      margin-top: 10px;
    }
  }
}
</style>
