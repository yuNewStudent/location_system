<template>
  <message-box class="add_person"
               :type='type'
               :btns='btns'
               @closeMessageBox='changePerson'>
    <el-main>
      <!-- <el-row>
        <label for="">姓名</label>
        <input v-model="medicalInfo.name"
               type="text">
      </el-row>
      <el-row>
        <label for="">性别</label>
        <el-radio v-model="medicalInfo.userGender"
                  label="1">男</el-radio>
        <el-radio v-model="medicalInfo.userGender"
                  label="0">女</el-radio>
      </el-row>
      <el-row>
        <label for="">出生日期</label>
        <input v-model="medicalInfo.birth"
               type="date">
      </el-row> -->
      <el-row class="row">
        <label for="">会诊单位</label>
        <input v-model="medicalInfo.unit"
               type="text">
      </el-row>
      <el-row>
        <el-col>
          <label for="">会诊医生</label>
          <input v-model="medicalInfo.physicians"
                 type="text">
        </el-col>
        <el-col>
          <label for="">会诊时间</label>
          <input v-model="medicalInfo.consultationDate"
                 type="date">
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <label for="">民族<span></span></label>
          <input v-model="medicalInfo.nation"
                 type="text"></el-col>
        <el-col>
          <label for="">过敏史<span></span></label>
          <input v-model="medicalInfo.allergy"
                 type="text">
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <label for="">检查项目</label>
          <input v-model="medicalInfo.checkInfo"
                 type="text">
        </el-col>
        <el-col>
          <label for="">诊断类型</label>
          <input v-model="medicalInfo.diagnosis"
                 type="text"></el-col>
      </el-row>
      <el-row class="row">
        <label for="">会诊所见</label>
        <textarea name=""
                  id=""
                  rows="5"
                  v-model="medicalInfo.consultationInfo"></textarea>
      </el-row>
      <el-row class="row">
        <label for="">诊断意见及结果</label>
        <textarea name=""
                  id=""
                  rows="5"
                  v-model="medicalInfo.consultationResult"></textarea>
      </el-row>
      <el-row class="row">
        <label for="">既往病史</label>
        <textarea name=""
                  id=""
                  rows="5"
                  v-model="medicalInfo.medicalHistory"></textarea>
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
      medicalInfo: {
        unit: '',
        physicians: '',
        consultationDate: '',
        // name: '',
        // sex: '',
        // age: '',
        nation: '',
        allergy: '',
        checkInfo: '',
        diagnosis: '',
        consultationInfo: '',
        consultationResult: '',
        medicalHistory: ''
      }
    }
  },
  components: {
    MessageBox
  },
  methods: {
    changePerson (bol) {
      // console.log(bol)
      bol ? this.$emit('closeWriteinformation', this.medicalInfo) : this.$emit('closeWriteinformation')

      // return
      // console.log(this.medicalInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.add_person {
  .el-main {
    padding: 0 20px;
    font-size: 14px;
    .el-row:not(.row) {
      padding: 10px 0;
      display: flex;
      .el-col {
        display: flex;
        flex: 1;
        &:last-child {
          margin-left: 10px;
        }
        label {
          display: inline-block;
          width: 60px;
          margin-right: 5px;
          text-align: justify;
          text-justify: distribute-all-lines;
          text-align-last: justify;
          // text-indent: 10px;
        }
        input {
          flex: 1;
          outline: none;
          border-bottom: 2px solid rgb(231, 231, 231);
        }
      }
    }
    .el-row.row {
      display: flex;
      padding: 10px 0;
      label {
        display: inline-block;
        width: 57px;
        margin-right: 5px;
      }
      input,
      textarea {
        flex: 1;
        outline: none;
        border-bottom: 2px solid rgb(231, 231, 231);
      }
    }
  }
}
</style>
