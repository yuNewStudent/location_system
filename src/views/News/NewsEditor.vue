<template>
  <div class="news_editor">
    <el-row>
      <el-input type='text'></el-input>
      <div class="img">
        <label class='upImg' for="upImg">点击上传封面图</label>
        <input
          class="img_file"
          type="file"
          id='upImg'
          accept="image/gif,image/jpeg,image/jpg,image/png"
          @change="fileChange">
        <div class="img_wrapper">
          <img :src="content.faceImg" alt="">
        </div>
        <el-button @click='delImg'>删除</el-button>
      </div>
    </el-row>
    <editor
      :content='content'
      @ChangeEditorContent='ChangeEditorContent'></editor>
  </div>
</template>

<script>
// 调用编辑器
import Editor from '@/components/Public/Editor'
export default {
  data () {
    return {
      content: {
        title: 'xixix',
        faceImg: ''
      }
    }
  },
  components: {
    Editor
  },
  watch: {
  },
  methods: {
    ChangeEditorContent (content) {
      console.log(content)
    },
    fileChange (e) {
      // console.log(e.target.files)
      var file = e.target.files[0]
      var reader = new FileReader()
      reader.onload = (e) => {
        console.log(e.target.result)
        this.content.faceImg = e.target.result
      }
      reader.readAsDataURL(file)
    },
    // 删除封面图片
    delImg () {
      this.content.faceImg = ''
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.news_editor {
  .el-row {
    .upImg {
      color: white;
    }
    .img_file {
      display: none;
      // position: absolute;
      // top:55px;
      // right: 0;
      // width: 100%;
      // height:53px;
      // border-radius: 50%;
      // outline: none;
      // opacity: 0;
      // cursor: pointer;
    }
    .img_wrapper {
      display: inline-block;
      width: 200px;
      height: 120px;
      background: white;
      border-radius: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
  }
}
</style>
