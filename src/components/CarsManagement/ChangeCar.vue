<template>
  <message-box
    class="add_person"
    :type='type'
    :btns='btns'
    @closeMessageBox='changeCar'>
    <el-main>
      <el-row>
        <label for="">车辆型号</label>
        <input
          v-model="carInfo.carModel"
          :disabled='selectCar'>
      </el-row>
      <el-row>
        <label for="">车辆编号</label>
        <input
          v-model="carInfo.carNum"
          :disabled='selectCar'>
      </el-row>
      <el-row>
        <label for="">使用单位</label>
        <input v-model="carInfo.useCompany">
      </el-row>
      <el-row>
        <label for="">联系电话</label>
        <input v-model="carInfo.emergencyCall">
      </el-row>
    </el-main>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type', 'selectCar'],
  data () {
    return {
      btns: {
        comfirm: '确定',
        cancel: '取消'
      },
      carInfo: {
        carModel: '',
        carNum: '',
        useCompany: '',
        emergencyCall: ''
      }
    }
  },
  components: {
    MessageBox
  },
  methods: {
    changeCar (bol) {
      if (!this.selectCar) {
        // 新增车辆
        this.$emit('addCar', bol, this.carInfo)
      } else {
        // 修改车辆
        this.$emit('editorCar', bol, this.carInfo)
      }
    }
  },
  created () {
    if (this.selectCar) {
      this.carInfo = this.selectCar
    }
  }
}
</script>

<style lang="scss" scoped>
.add_person {
  .el-main {
    padding: 0 50px;
    .el-row {
      font-size: 15px;
      display: flex;
      padding: 10px 0;
      label  {
        display: inline-block;
        width: 80px;
      }
      input {
        flex: 1;
        outline: none;
        border-bottom: 1px solid rgb(231,231,231);
      }
    }
  }
}
</style>
