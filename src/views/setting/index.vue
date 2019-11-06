<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form label-width="120px">
            <el-form-item label="编号：">{{userInfo.id}}</el-form-item>
            <el-form-item label="手机：">{{userInfo.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input type="textarea" :rows="3" v-model="userInfo.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input  v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :http-request='uploadPhoto'
            :show-file-list="false"
          >
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus.js'
import local from '@/utils/local'
export default {
  data () {
    return {
      userInfo: {
        name: '',
        intro: '',
        email: '',
        photo: ''
      }
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    // 获取用户个人资料
    async getInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.userInfo = data
    },
    // 修改用户信息
    async saveInfo () {
      // 发送请求 成功 提示 修改home组件的数据 修改本地存储的数据
      const { name, intro, email } = this.userInfo
      // 发送请求
      await this.$http.patch('user/profile', { name, intro, email })
      // 成功提示
      this.$message.success('保存成功')
      // 修改home组件的数据 =》通过非父子组件传值的方式
      eventBus.$emit('updataName', name)
      // 修改本地存储
      const user = local.getUser()
      user.name = name
      local.setUser(user)
    },
    // 修改上传图片
    async uploadPhoto (r) {
      const formData = new FormData()
      formData.append('photo', r.file)
      const { data: { data } } = await this.$http.patch('user/photo', formData)
      // 提示
      this.$message.success('修改头像成功')
      // 预览
      this.userInfo.photo = data.photo
      // 跟新home组件
      eventBus.$emit('updataPhoto', data.photo)
      // 跟新本地存储的头像
      const userPhoto = local.getUser()
      userPhoto.photo = data.photo
      local.setUser(userPhoto)
    }
  }
}
</script>

<style>
</style>
