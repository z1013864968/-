<template>
  <div class="container-pubish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-bread>{{$route.query.id?'修改':'发布'}}文章</my-bread>
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
          <div v-if="articleFrom.cover.type===1">
            <my-image v-model="articleFrom.cover.images[0]"></my-image>
          </div>
          <div v-if="articleFrom.cover.type===3">
            <my-image v-model="articleFrom.cover.images[item-1]" v-for="item in 3" :key="item"></my-image>
          </div>
        </el-form-item>
        <!-- 频道 -->
        <app-channel v-model="articleFrom.channel_id"></app-channel>
        <!-- 发表按钮 -->
        <el-form-item v-if="this.$route.query.id">
          <el-button type="success" @click="updata(false)">修改</el-button>
          <el-button @click="updata(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="give(false)">发表</el-button>
          <el-button @click="give(true)">存入草稿</el-button>
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
          type: 1,
          images: []
        },
        channel_id: null
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
  },
  methods: {
    // 发布
    async give (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleFrom)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    // 获取文章信息
    async getArticle (id) {
      // 判断当前是否为编辑
      const { data: { data } } = await this.$http.get(`articles/${id}`)
      this.articleFrom = data
    },
    // 修改
    async updata (draft) {
      await this.$http.put(`articles/${this.articleFrom.id}?draft=${draft}`, this.articleFrom)
      // 提示
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      // 去内容管理
      this.$router.push('/article')
    },
    // 切换发布与修改
    toggleArticleStatus () {
      const articleId = this.$route.query.id
      if (articleId) {
        this.getArticle(articleId)
      } else {
      // 提交的数据
        this.articleFrom = {
          title: null, // 标题
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
  created () {
    this.toggleArticleStatus()
  },
  watch: {
    '$route.query.id': function () {
      this.toggleArticleStatus()
    }
  }
}
</script>

<style>
</style>
