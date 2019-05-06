<template>
  <message-box
    class="add_person"
    :type='type'
    :btns='btns'>
    <el-main>
      <label for="">姓名：</label><input type="text">
    </el-main>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  data () {
    return {
      type: '人员新增',
      btns: {
        comfirm: '确定',
        cancel: '取消'
      }
    }
  },
  components: {
    MessageBox
  }
}
</script>

<style lang="scss" scoped>
.add_person {

}
</style>

