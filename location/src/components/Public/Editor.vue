<template>
  <div class="editor">
    <div id="wangeditor">
      <div class="editor_wrapper" ref="editorElem" style="text-align:left"></div>
    </div>
    <div class="save" @click='handleSave'>
      <el-button size='small' type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
// 调用编辑器
import E from 'wangeditor'
export default {
  props: ['content'],
  data () {
    return {
      editor: null,
      editorContent: ''
    }
  },
  watch: {
    editorContent (value) {
      console.log(value)
    }
  },
  methods: {
    // 初始化editor
    initEditor () {
      this.editor = new E(this.$refs.editorElem)
      this.editor.customConfig.onchange = (html) => {
        this.editorContent = html
        // 把这个html通过catchData的方法传入父组件
        // this.$emit('ChangeEditorContent')
      }
      this.editor.customConfig.uploadImgShowBase64 = true
      // this.editor.customConfig.uploadFileName = '你自定义的文件名'
      // 菜单配置
      this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo'// 重复
      ]
      // 下面是最重要的的方法
      this.editor.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {
          // 图片上传之前触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
          // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
          // return {
          //   prevent: true,
          //   msg: '放弃上传'
          // }
        },
        success: function (xhr, editor, result) {
          // 图片上传并返回结果，图片插入成功之后触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          this.imgUrl = Object.values(result.data).toString()
        },
        fail: function (xhr, editor, result) {
          // 图片上传并返回结果，但图片插入错误时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        error: function (xhr, editor) {
          // 图片上传出错时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
        timeout: function (xhr, editor) {
          // 图片上传超时时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
        // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
        // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
        customInsert: function (insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          let url = Object.values(result.data)// result.data就是服务器返回的图片名字和链接
          JSON.stringify(url)// 在这里转成JSON格式
          insertImg(url)
          // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      }
      // 创建富文本实例
      this.editor.create()
      if (!this.content) {
        // this.editor.txt.html('请编辑内容1')
      }
    },
    // 保存提交
    handleSave () {
      if (!this.editorContent) {
        return this.$message.error('内容不能为空')
      }
      this.$emit('ChangeEditorContent', this.editorContent)
    }
  },
  mounted () {
    this.initEditor()
  }
}
</script>

<style lang="scss" scoped>
.editor {
  #wangeditor {
    margin-left: 40px;
    color: white;
    .editor_wrapper {
      // height: 400px;
    }
  }
  .save {
    margin-top: 10px;
    text-align: right;
  }
}
</style>
