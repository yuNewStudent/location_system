<template>
  <message-box
    class="add_person"
    :type='type'
    :btns='btns'
    @closeMessageBox='changeCar'>
    <el-main>
      <el-row>
        <label for="">车辆型号</label>
        <input v-model="carInfo.carModel" type="text">
      </el-row>
      <el-row>
        <label for="">车辆编号</label>
        <input
          v-model="carInfo.carNum">
      </el-row>
      <el-row>
        <label for="">使用单位</label>
        <input v-model="carInfo.useCompany" type="text">
      </el-row>
      <el-row>
        <label for="">联系电话</label>
        <input v-model="carInfo.emergencyCall" type="text">
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
      carInfo: {
        carModel: '路虎X89',
        carNum: '12345',
        useCompany: '上海市XX科技有限公司',
        emergencyCall: '12345678912'
      }
    }
  },
  components: {
    MessageBox
  },
  methods: {
    changeCar (bol) {
      this.$emit('changeCar')
    }
  }
}
</script>

<style lang="scss" scoped>
.add_person {
  .el-main {
    padding: 0 30px;
    .el-row {
      display: flex;
      padding: 10px 0;
      label  {
        display: inline-block;
        width: 100px;
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
