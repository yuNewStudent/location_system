<template>
  <div class='MessageBox'>
    <div class='add_user_wrapper'>
      <el-row class='header'>
        {{type}}
        <span @click='handleCancel'
              v-if='btns.reset'>X</span>
      </el-row>
      <slot></slot>
      <el-row class='footer'>
        <el-button size='mini '
                   type='primary'
                   v-if='btns.reset'
                   @click='handleReset'>重置</el-button>
        <el-button size='mini '
                   type='primary'
                   v-if='!btns.reset'
                   @click='handleCancel'>取消</el-button>
        <el-button size='mini '
                   type='primary'
                   @click='handleSetting'
                   ref='close'>确定</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: ['type', 'btns'],
  data () {
    return {}
  },
  methods: {
    // 取消
    handleCancel () {
      this.$emit('closeMessageBox', false)
    },

    // 确定
    handleSetting () {
      this.$emit('closeMessageBox', true)
    },
    // 重置
    handleReset () {
      this.$emit('reset')
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.right) {
        this.$refs.close.$el.style['margin-right'] = this.right - 20 + 'px'
      }
    })
  },
  components: {}
}
</script>

<style lang='scss' scoped>
.MessageBox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3;
  border-radius: 10px;
  .add_user_wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 550px;
    margin: 0 auto 0;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    background: white;
    padding: 0 0 20px;
    .header {
      font-size: 18px;
      color: black;
      padding: 15px 40px 15px;
      border-radius: 10px 10px 0 0;
      background: rgba(143, 199, 255, 1);
      span {
        float: right;
        cursor: pointer;
      }
    }
    .footer {
      text-align: right;
      margin-top: 10px;
      margin-right: 20px;
      padding: 0 30px;
      .el-button {
        background: rgba(186, 221, 255, 1);
        border: 2px solid rgba(29, 132, 234, 1);
        border-radius: 4px;
        color: black;
        font-size: 16px;
      }
    }
  }
}
</style>
