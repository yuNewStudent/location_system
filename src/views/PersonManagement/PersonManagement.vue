<template>
  <div
    class="PersonManagement">
    <el-row class="header">
      <div class="search">
        <input
          type="text"
          placeholder="请输入人名或车辆编号"
          class="searchInput">
        <span class="searchBtn"><img src="@/assets/img/icon/搜索IC.png" alt=""></span>
        <span class="total">共<span>222</span>条</span>
      </div>
      <div class="legends">
        <span @click='handleAddPerson'>
          <img src="@/assets/img/icon/新增IC.png" alt="">
          新增
        </span>
      </div>
    </el-row>
    <el-main>
      <ul class="cards">
        <li
          v-for="(item, index) in persons"
          :key='index'
          class="card">
          <div class="userInfo">
            <img
              :src="item.headImg"
              class="headImg"
              alt="">
              <p class="name">{{item.name}}</p>
              <p class="sex">{{item.sex}}</p>
          </div>
          <p class="phone">手机号: {{item.phone}}</p>
          <p class="device_id">设备ID: {{item.deviceId}}</p>
          <p class="address">家庭地址: {{item.address}}</p>
          <p class="birth">出生日期: {{item.birth}}</p>
          <p class="emergencyContact">紧急联系人: {{item.emergencyContact}}</p>
          <p class="emergencyPhone">紧急联系电话: {{item.emergencyPhone}}</p>
          <div class="menu"
            @click='handleShowMenu(index)'
            @mouseleave='handleHideMenu(index)'>
            <div class="menu_wrapper">
              <span></span>
              <span></span>
              <span></span>
              <div class="content" ref='content'>
                <p @click="handleShowLine">人员轨迹</p>
                <p @click="handleDelPerson">删除</p>
                <p @click="handleEditorPerson">修改</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <change-person
        v-if='isShowAddPerson'
        @changePerson='addPerson'
        :type='type.add'></change-person >
      <change-person
        v-if='isShowEditorPerson'
        :type='type.editor'
        @changePerson='editorPerson'></change-person >
    </el-main>
  </div>
</template>

<script>
import ChangePerson from '@/components/PersonManagement/changePerson'
export default {
  data () {
    return {
      type: {
        add: '新增人员',
        editor: '修改人员'
      },
      persons: [
        {
          name: 'yujj',
          sex: '男',
          phone: '18222222',
          deviceId: '12',
          birth: '1950-04',
          address: '四川省成都市锦江区信息路',
          emergencyContact: 'jjjj',
          emergencyPhone: '2111ss22',
          headImg: require('@/assets/img/icon/定位icon.png')
        },
        {
          name: 'yujj',
          sex: '男',
          phone: '18222222',
          deviceId: '12',
          birth: '1950-04',
          address: '四川省成都市锦江区信息路',
          emergencyContact: 'jjjj',
          emergencyPhone: '2111ss22',
          headImg: require('@/assets/img/icon/定位icon.png')
        },
        {
          name: 'yujj',
          sex: '男',
          phone: '18222222',
          deviceId: '12',
          birth: '1950-04',
          address: '四川省成都市锦江区信息路',
          emergencyContact: 'jjjj',
          emergencyPhone: '2111ss22',
          headImg: require('@/assets/img/icon/定位icon.png')
        },
        {
          name: 'yujj',
          sex: '男',
          phone: '18222222',
          deviceId: '12',
          birth: '1950-04',
          address: '四川省成都市锦江区信息路',
          emergencyContact: 'jjjj',
          emergencyPhone: '2111ss22',
          headImg: require('@/assets/img/icon/定位icon.png')
        },
        {
          name: 'yujj',
          sex: '男',
          phone: '18222222',
          deviceId: '12',
          birth: '1950-04',
          address: '四川省成都市锦江区信息路',
          emergencyContact: 'jjjj',
          emergencyPhone: '2111ss22',
          headImg: require('@/assets/img/icon/定位icon.png')
        },
        {
          name: 'yujj',
          sex: '男',
          phone: '18222222',
          deviceId: '12',
          birth: '1950-04',
          address: '四川省成都市锦江区信息路',
          emergencyContact: 'jjjj',
          emergencyPhone: '2111ss22',
          headImg: require('@/assets/img/icon/定位icon.png')
        },
        {
          name: 'yujj',
          sex: '男',
          phone: '18222222',
          deviceId: '12',
          birth: '1950-04',
          address: '四川省成都市锦江区信息路',
          emergencyContact: 'jjjj',
          emergencyPhone: '2111ss22',
          headImg: require('@/assets/img/icon/定位icon.png')
        },
        {
          name: 'yujj',
          sex: '男',
          phone: '18222222',
          deviceId: '12',
          birth: '1950-04',
          address: '四川省成都市锦江区信息路',
          emergencyContact: 'jjjj',
          emergencyPhone: '2111ss22',
          headImg: require('@/assets/img/icon/定位icon.png')
        },
        {
          name: 'yujj',
          sex: '男',
          phone: '18222222',
          deviceId: '12',
          birth: '1950-04',
          address: '四川省成都市锦江区信息路',
          emergencyContact: 'jjjj',
          emergencyPhone: '2111ss22',
          headImg: require('@/assets/img/icon/定位icon.png')
        },
        {
          name: 'yujj',
          sex: '男',
          phone: '18222222',
          deviceId: '12',
          birth: '1950-04',
          address: '四川省成都市锦江区信息路',
          emergencyContact: 'jjjj',
          emergencyPhone: '2111ss22',
          headImg: require('@/assets/img/icon/定位icon.png')
        },
        {
          name: 'yujj',
          sex: '男',
          phone: '18222222',
          deviceId: '12',
          birth: '1950-04',
          address: '四川省成都市锦江区信息路',
          emergencyContact: 'jjjj',
          emergencyPhone: '2111ss22',
          headImg: require('@/assets/img/icon/定位icon.png')
        },
        {
          name: 'yujj',
          sex: '男',
          phone: '18222222',
          deviceId: '12',
          birth: '1950-04',
          address: '四川省成都市锦江区信息路',
          emergencyContact: 'jjjj',
          emergencyPhone: '2111ss22',
          headImg: require('@/assets/img/icon/定位icon.png')
        },
        {
          name: 'yujj',
          sex: '男',
          phone: '18222222',
          deviceId: '12',
          birth: '1950-04',
          address: '四川省成都市锦江区信息路',
          emergencyContact: 'jjjj',
          emergencyPhone: '2111ss22',
          headImg: require('@/assets/img/icon/定位icon.png')
        }
      ],
      isShowAddPerson: false,
      isShowEditorPerson: false
    }
  },
  components: {
    ChangePerson
  },
  methods: {
    // 显示操作栏
    handleShowMenu (index) {
      this.$refs.content.forEach(item => {
        item.style.display = 'none'
      })
      this.$refs.content[index].style.display = 'block'
    },
    // 隐藏操作栏
    handleHideMenu () {
      this.$refs.content.forEach(item => {
        item.style.display = 'none'
      })
    },
    // 新增人员
    handleAddPerson () {
      this.isShowAddPerson = true
    },
    addPerson () {
      this.isShowAddPerson = false
    },
    // 修改人员
    handleEditorPerson () {
      this.isShowEditorPerson = true
    },
    editorPerson () {
      this.isShowEditorPerson = false
    },
    // 展示人员轨迹
    handleShowLine () {},
    // 删除人员
    handleDelPerson () {
      this.$confirm('此操作将永久删除该人员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
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
.PersonManagement{
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
  .el-main {
    padding: 10px 0;
    .cards {
      .card {
        margin: 10px 0 10px 20px;
        padding: 10px 15px;
        float: left;
        width: 220px;
        display: flex;
        flex: 1;
        flex-direction: column ;
        background: #313131;
        border-radius: 10px;
        position: relative;
        >p {
          color: white;
          line-height: 18px;
          padding: 5px 0;
          font-size: 14px;
        }
        .userInfo {
          display: flex;
          flex-direction: column ;
          align-items: center;
          .headImg {
            width: 70px;
            height: 70px;
            border-radius: 50%;
          }
          > p {
            line-height: 25px;
          }
          .name {
            color: #F8BF12;
            font-size: 16px;
          }
          .sex {
            color: #5789F0;
            font-size: 14px;
          }
        }
        .menu {
          position: absolute;
          right: 0px;
          top: 10px;
          width: 20px;
          .menu_wrapper {
            position: relative;
            margin-bottom: 10px;
            span {
              display: block;
              background: #737373;
              border-radius: 4px;
              width: 8px;
              height: 8px;
              margin: 5px 0;
            }
            .content {
              color: white;
              width: 70px;
              cursor: pointer;
              display: none;
              position: absolute;
              background: #737373;
              right: -60px;
              top: 37px;
              z-index: 2;
              padding: 10px 10px;
              border-radius: 5px;
              font-size: 16px;
              p {
                line-height: 25px;
                &:hover {
                  color: #F8BF12;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
