<template>
  <div class="PersonManagement">
    <el-row class="header">
      <div class="search">
        <input type="text"
               placeholder="请输入人名或设备ID"
               class="searchInput"
               v-model="queryPerson">
        <span class="searchBtn"
              @click='handleSearchPerson'><img src="@/assets/img/icon/搜索IC.png"
               alt=""></span>
        <span class="total">共<span>{{persons.length}}</span>条</span>
      </div>
    </el-row>
    <el-main>
      <ul class="cards">
        <li v-for="(item, index) in persons"
            :key='index'
            class="card">
          <div class="medical_information_wrapper">
            <div class="medical_information"
                 @click='showInfomation(item.userId)'
                 v-if='item.user_stata'>
              <!--  -->
              医疗信息
            </div>
            <div v-else
                 @click='
                 writeInfomation(item)'
                 class="no_information"><img src="@/assets/img/icon/新增医疗信息IC.png"
                   alt=""></div>
          </div>
          <div class="userInfo">
            <!-- <img :src="item.userAvatar"
                 class="headImg"
                 alt=""> -->
            <p class="name">{{item.userName}}</p>
            <p class="sex male"
               v-if='item.userGender===1'>男</p>
            <p class="sex female"
               v-else>女</p>
          </div>
          <p class="phone">手机号: {{item.userNumber}}</p>
          <p class="device_id">设备ID: {{item.userDeviceId}}</p>
          <p class="address">家庭地址: {{item.userAddress}}</p>
          <p class="birth">出生日期: {{item.userBirth}}<span class='age'>{{getAge(item.userBirth)}}</span></p>
          <div class="emergencyContact">
            <span v-if='item.emergencycs.length'>紧急联系人: {{item.emergencycs[0].emergencycsName}}({{item.emergencycs[0].emergencycsRelationShip}})</span>
            <span v-else>紧急联系人: 无</span>
            <div class="moreEmergencyContact"
                 v-if='item.emergencycs.length>0'>
              <img v-if='item.emergencycs[1]'
                   src="@/assets/img/icon/多个紧急联系人IC.png"
                   alt="">
              <div class="wrapper"
                   v-if='item.emergencycs[1]'>
                <p><span>紧急联系人:</span>{{item.emergencycs[1].emergencycsName}}({{item.emergencycs[1].emergencycsRelationShip}})</p>
                <p class="emergencyPhone"><span>紧急电话:</span> {{item.emergencycs[1].emergencycsNumber}}</p>
                <p class="emergencyPhone"><span></span> {{item.emergencycs[1].emergencycrsNumber1}}</p>
              </div>
            </div>
          </div>
          <p class="emergencyPhone">紧急电话: {{item.emergencycs.length?item.emergencycs[0].emergencycsNumber:'无'}}</p>
        </li>
      </ul>
      <change-person v-if='isShowAddPerson'
                     @changePerson='addPerson'
                     :type='type.add'></change-person>
      <change-person v-if='isShowEditorPerson'
                     :type='type.editor'
                     @changePerson='editorPerson'></change-person>
      <write-information v-if='isShowWriteInformation'
                         :type='type.write_information'
                         @closeWriteinformation='closeWriteinformation'></write-information>
      <show-information v-if='isShowInformation'
                        :type='type.write_information'
                        :currentUserId='currentUserId'
                        @changePerson='isShowInformation=!isShowInformation'></show-information>
    </el-main>
  </div>
</template>

<script>
import ChangePerson from '@/components/PersonManagement/changePerson'
import WriteInformation from '@/components/PersonManagement/write-information'
import ShowInformation from '@/components/PersonManagement/show-information'
export default {
  data () {
    return {
      type: {
        add: '新增人员',
        editor: '修改人员',
        write_information: '新增医疗信息'
      },
      queryPerson: '',
      persons: [],
      currentPerson: null,
      isShowAddPerson: false,
      isShowEditorPerson: false,
      isShowWriteInformation: false,
      isShowInformation: false,
      currentUserId: ''
    }
  },
  components: {
    ChangePerson,
    WriteInformation,
    ShowInformation
  },
  created () {
    // 获取所有人员
    this.getPersons()
  },
  watch: {
    queryPerson (value) {
      if (!value) {
        this.getPersons()
      }
    }
  },
  methods: {
    getPersons () {
      // 获取所有人员
      this.$http.get(`${config.httpBaseUrl}/user/getAll`).then((res) => {
        if (res.code === 200) {
          this.persons = res.date.users
        }
      })
    },
    // 计算年龄
    getAge (str) {
      var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
      if (r === null) return false
      var d = new Date(r[1], r[3] - 1, r[4])
      if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {//eslint-disable-line
        var Y = new Date().getFullYear()
        return Y - r[1] + '岁'
      }
      return '输入的日期格式错误!'
    },
    // 搜索某个人
    handleSearchPerson () {
      this.$http.get(`${config.httpBaseUrl}/user/get`, {
        params: {
          userDeviceId: this.queryPerson
        }
      }).then((res) => {
        if (res.date.user.length) {
          this.persons = res.date.user
        } else {
          this.$message({
            showClose: true,
            type: 'info',
            message: '没有相关的人员'
          })
        }
      })
    },
    // 展示医疗信息
    // showInfomation () {
    // },
    // 填写医疗信息
    writeInfomation (item) {
      this.currentPerson = {
        age: this.getAge(item.userBirth),
        name: item.userName,
        sex: item.userGender,
        userId: item.userId
      }
      this.isShowWriteInformation = true
    },
    // 关闭信息录入页面
    closeWriteinformation (info) {
      this.isShowWriteInformation = false
      if (info) {
        this.$http.post(`${config.httpBaseUrl}/medical/insert`, {
          ...this.currentPerson,
          ...info
        }
        ).then(res => {
          // console.log(res)
          if (res.code === 200) {
            this.$message({
              showClose: true,
              type: 'success',
              message: '信息录入成功'
            })
            // this.persons = res.date.users
          }
        })
      }
    },
    // 展示医疗信息
    showInfomation (userId) {
      this.currentUserId = userId
      this.isShowInformation = !this.isShowInformation
    }
  }
}
</script>

<style lang="scss" scoped>
.PersonManagement {
  .header {
    padding: 0 20px;
    > div {
      display: inline-block;
    }
    .search {
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
      padding: 0 10px;
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
      color: rgba(120, 187, 255, 1);
      > span {
        font-size: 18px;
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
    padding: 0 0 10px;
    .cards {
      position: relative;
      .medical_information_wrapper {
        position: absolute;
        top: 0;
        right: 0;
        .medical_information {
          width: 80px;
          text-align: center;
          color: rgb(222, 232, 255);
          line-height: 35px;
          background: rgba(199, 108, 98, 1);
          border-radius: 0px 8px 0px 8px;
        }
        .no_information {
          width: 50px;
          height: 35px;
          text-align: center;
          line-height: 35px;
          background: rgba(199, 108, 98, 1);
          border-radius: 0px 8px 0px 8px;
          img {
            margin-top: 6px;
            width: 23px;
            height: 23px;
          }
        }
      }
      .card {
        margin: 10px 0 10px 20px;
        padding: 10px 15px;
        float: left;
        width: 220px;
        display: flex;
        flex: 1;
        flex-direction: column;
        background: #005ea7;
        border-radius: 10px;
        position: relative;
        height: 236px;
        > p {
          color: white;
          line-height: 18px;
          padding: 5px 0;
          font-size: 14px;
        }
        .age {
          margin-left: 10px;
          color: #f8bf12;
          font-size: 12px;
          position: relative;
          top: 1px;
        }
        .userInfo {
          display: flex;
          flex-direction: column;
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
            color: #f8bf12;
            font-size: 16px;
          }
          .sex {
            font-size: 14px;
            &.male {
              color: #5789f0;
            }
            &.female {
              color: #ed3ba8;
            }
          }
        }
        .emergencyContact {
          color: white;
          line-height: 18px;
          padding: 5px 0;
          font-size: 14px;
          display: flex;
          .moreEmergencyContact {
            position: relative;
            &:hover {
              .wrapper {
                display: block;
              }
            }
            img {
              width: 12px;
              position: absolute;
              margin-left: 5px;
              top: 3px;
            }
            .wrapper {
              width: 170px;
              padding: 5px;
              background: rgba(85, 85, 85, 1);
              border-radius: 5px;
              position: absolute;
              right: -185px;
              top: 10px;
              z-index: 5;
              display: none;
              p {
                span {
                  display: inline-block;
                  width: 70px;
                }
                line-height: 20px;
                font-size: 13px;
              }
            }
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
                  color: #f8bf12;
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
