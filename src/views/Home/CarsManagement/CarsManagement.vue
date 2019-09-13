<template>
  <div class="CarsManagement">
    <el-row class="header">
      <div class="search">
        <input type="text"
               placeholder="车辆编号"
               class="searchInput"
               v-model="carQuery">
        <span class="searchBtn"
              @click='handleSearch'><img src="@/assets/img/icon/搜索IC.png"
               alt=""></span>
      </div>
      <div class="legends">
        <span @click='handleAddCar'>
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
                         prop="vehiclesTypeof"
                         label="车辆型号">
        </el-table-column>
        <el-table-column align='center'
                         prop="vehiclesNumBering"
                         label="车辆编号">
        </el-table-column>
        <el-table-column align='center'
                         prop="vehiclesUseunit"
                         label="使用单位">
        </el-table-column>
        <el-table-column align='center'
                         prop="vehiclesNsumber"
                         label="紧急电话">
        </el-table-column>
        <el-table-column align='center'
                         label="操作">
          <template slot-scope="scope">
            <img src="@/assets/img/icon/修改IC.png"
                 @click="handleEditorCar(scope.$index, scope.row)"
                 class="editor_img"
                 alt="">
            <img src="@/assets/img/icon/删除IC.png"
                 @click="handleDeleteCar(scope.$index, scope.row)"
                 class="del_img"
                 alt="">
            <!-- <el-button size="mini"
                       @click="handleEditorCar(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini"
                       @click="handleDeleteCar(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-count='cars.length/5'
                     :page-size='pageSize'
                     layout="total, prev, pager, next, jumper"
                     :total="cars.length"></el-pagination>
    </el-main>
    <change-car :type='type.add'
                v-if='isShowAddCar'
                @addCar='addCar'></change-car>
    <change-car :type='type.editor'
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
        // {
        //   vehiclesTypeof: '路虎X89',
        //   vehiclesNumBering: '12345',
        //   vehiclesUseunit: '上海市XX科技有限公司',
        //   vehiclesNsumber: '12345678912',
        //   vehiclesId: 23
        // }
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
      pageSize: 8
    }
  },
  components: {
    ChangeCar
  },
  created () {
    this.getCars()
  },
  watch: {
    carQuery (value) {
      if (!value) {
        this.getCars()
      }
    }
  },
  methods: {
    // 获取车辆
    getCars () {
      // 服务器获取车辆
      this.$http.get(`${config.httpBaseUrl}/vehucle/getAllVehucle`).then((res) => {
        if (res.code === 200) {
          this.cars = res.date.vhucles
          // 刚打开页面时加载前5项、且自动生成分页数量
          this.getPaginationData(this.currentPage)
        }
      })
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
    // 新增车辆
    addCar (bol, carInfo) {
      if (bol) {
        for (var k in carInfo) {
          if (!carInfo[k]) {
            return this.$message({
              showClose: true,
              message: '信息不能为空',
              type: 'error'
            })
          }
        }
        // 服务器添加车辆
        this.$http.post(`${config.httpBaseUrl}/vehucle/insertVehucle`, carInfo
        ).then((res) => {
          if (res.code === 200) {
            this.cars.push(carInfo)
            // 刚打开页面时加载前5项、且自动生成分页数量
            this.currentPage = 1
            this.getPaginationData(this.currentPage)
            this.$message({
              showClose: true,
              type: 'success',
              message: '添加车辆成功!'
            })
          }
        })
      }
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
      delete carInfo.locationBean
      console.log(carInfo)
      if (bol) {
        for (var k in carInfo) {
          if (!carInfo[k]) {
            return this.$message({
              showClose: true,
              message: '信息不能为空',
              type: 'error'
            })
          }
        }
        // 服务器修改
        this.$http.post(`${config.httpBaseUrl}/vehucle/updateVehucle`, carInfo).then((res) => {
          if (res.code === 200) {
            this.cars.splice(this.selectCar.index, 1, carInfo)
            this.$message({
              showClose: true,
              type: 'success',
              message: '修改成功!'
            })
          }
        })
      }
      this.isShowEditorCar = false
    },
    // 删除车辆
    handleDeleteCar (index, row) {
      this.$confirm(`此操作将永久删除该车辆, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 服务器删除
        this.$http.get(`${config.httpBaseUrl}/vehucle/deleteVehucle`, {
          params: {
            vehiclesNumBering: row.vehiclesNumBering
          }
        }).then((res) => {
          if (res.code === 200) {
            this.cars.splice(index, 1)
            // 刚打开页面时加载前5项、且自动生成分页数量
            this.currentPage = 1
            this.getPaginationData(this.currentPage)
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
    // 过滤器
    handleSearch () {
      this.$http.get(`${config.httpBaseUrl}/vehucle/getVehucle`, {
        params: {
          vehiclesNumBering: this.carQuery
        }
      }).then((res) => {
        if (res.date.vhucles) {
          this.cars = [res.date.vhucles]
          // 刚打开页面时加载前5项、且自动生成分页数量
          this.currentPage = 1
          this.getPaginationData(this.currentPage)
        } else {
          this.$message({
            showClose: true,
            type: 'info',
            message: '没有找到该车辆'
          })
        }
      })
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
.CarsManagement {
  .header {
    padding: 0 20px;
    > div {
      display: inline-block;
    }
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
    .total {
      font-size: 14px;
      color: #7e7e7e;
      > span {
        color: white;
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
    .el-pagination {
      text-align: right;
      margin-top: 10px;
    }
    .el-table {
      color: #fff;
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
  }
}
</style>
