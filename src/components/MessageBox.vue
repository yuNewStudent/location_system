<template>
	<div class="MessageBox">
		<div class="add_user_wrapper">
      <el-row class="header">{{type}}<span @click='handleCancel' v-if='btns.reset'>X</span></el-row>
      <slot></slot>
      <el-row class='footer'>
        <el-button size='medium ' type='primary' v-if='btns.reset' @click='handleReset'>重置</el-button>
        <el-button size='medium ' type='primary' v-if='!btns.reset' @click='handleCancel'>取消</el-button>
        <el-button size='medium ' type='primary' @click='handleSetting' ref='close'>确定</el-button>
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
    //取消
    handleCancel () {
      this.$emit("closeMessageBox", false)
    },
    
    //确定
    handleSetting () {
      this.$emit("closeMessageBox", true)
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
  components: {
  }
}
</script>

<style lang="scss" scoped>
.MessageBox {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0,0,0,.5);
  z-index: 3;
  border-radius: 10px;
	.add_user_wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 550px;
    margin:0 auto 0;
    transform: translate(-50%, -50%);
    background: white;
    .header {
      font-size: 20px;
      color: black;
      line-height: 50px;
      padding: 0 20px;
      span {
        float: right;
        cursor: pointer;
      }
    }
    .footer {
      text-align: right;
      padding: 0px 30px 20px;
    }
  }
  .close {
    text-align: center;
    position: relative;
    img {
      width: 550px;
    }
    span {
      cursor: pointer;
      position: absolute;
      left: 50%;
      margin-left: -13px;
      border-radius: 50%;
      width: 25px;
      line-height: 25px;
      background: white;
      font-size: 13px;
      border: 1px solid rgb(190,190,190);
      color: rgb(190,190,190);
    }
  }
}
</style>