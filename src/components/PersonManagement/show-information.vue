<template>
  <message-box class="add_person"
               :type='type'
               :btns='btns'
               @closeMessageBox='changePerson'>
    <el-main>
      <table border=1
             cellspacing="0">
        <tr>
          <td>
            <div>
              <span class='label'>会诊单位:</span>
              <div class="info">{{medicalInfo.unit}}</div>
            </div>
          </td>
          <td>
            <div>
              <span class='label'>会诊医生:</span>
              <div class="info">{{medicalInfo.physicians}}</div>
            </div>
          </td>
          <td>
            <div>
              <span class='label'>会诊时间:</span>
              <div class="info">{{medicalInfo.consultationDate}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <span class='label'>姓名:</span>
              <div class="info">{{medicalInfo.name}}</div>
            </div>
          </td>
          <td>
            <div>
              <span class='label'>性别:</span>
              <div class="info">{{medicalInfo.sex?'女': '男'}}</div>
            </div>
          </td>
          <td>
            <div>
              <span class='label'>年龄:</span>
              <div class="info">{{medicalInfo.age}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <span class='label'>民族:</span>
              <div class="info">{{medicalInfo.nation}}</div>
            </div>
          </td>
          <td>
            <div>
              <span class='label'>是否有过敏史:</span>
              <div class="info">{{medicalInfo.allergy}}</div>
            </div>
          </td>
          <td>
            <div>
              <span class='label'>检查项目:</span>
              <div class="info">{{medicalInfo.checkInfo}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan=3>
            <div>
              <span class='label'>诊断类型:</span>
              <div class="info">{{medicalInfo.diagnosis}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan=3>
            <div>
              <span class='label'>会诊所见:</span>
              <div class="info"
                   v-text='medicalInfo.consultationInfo'></div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan=3>
            <div>
              <span class='label'>诊断意见及结果:</span>
              <div class="info">{{medicalInfo.consultationResult}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan=3>
            <div>
              <span class='label'>既往病史:</span>
              <div class="info">{{medicalInfo.medicalHistory}}</div>
            </div>
          </td>
        </tr>
      </table>
    </el-main>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type', 'currentUserId'],
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
      this.$emit('changePerson')
    }
  },
  created () {
    this.$http.post(`${config.httpBaseUrl}/medical/select`, {
      userId: this.currentUserId
    }).then((res) => {
      if (res.code === 200) {
        this.medicalInfo = res.date.medicalInformation[0]
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.add_person {
  .el-main {
    padding: 10px 20px 0;
    font-size: 14px;
    table {
      border-collapse: separate;
      border-spacing: 0;
      // text-align: center;
      // margin: 20px auto;
      width: 100%;
      tr {
        &:first-child {
          td {
            border-top: 1px solid gray;
          }
        }
        td {
          > div {
            display: flex;
          }
          &:first-child {
            border-left: 1px solid gray;
          }
          padding: 5px 10px;
          border-right: 1px solid gray;
          border-bottom: 1px solid gray;
          // background: pink;
        }
      }
    }
  }
}
</style>
