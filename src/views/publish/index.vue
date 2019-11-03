<template>
  <div class="container-pubish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-bread>发布文章</my-bread>
      </div>
      <el-form label-width="100px">
        <!-- 标题 -->
        <el-form-item label="标题：">
          <el-input v-model="articleFrom.title" style="width:400px"></el-input>
        </el-form-item>
        <!-- 富文本编译器 -->
        <el-form-item label="内容：">
          <quill-editor v-model="articleFrom.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <!-- 封面 -->
        <el-form-item label="封面：">
          <el-radio-group v-model="articleFrom.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 封面图按钮组 -->
          <div>
            <my-image></my-image>
            <my-image></my-image>
            <my-image></my-image>
          </div>
        </el-form-item>
        <!-- 频道 -->
        <app-channel></app-channel>
        <!-- 发表按钮 -->
        <el-form-item>
          <el-button type="primary">发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      // 提交的数据
      articleFrom: {
        title: null, // 标题
        content: null,
        cover: {
          type: 1
        }
      },
      // 富文本配置对象
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  }
}
</script>

<style>
</style>
