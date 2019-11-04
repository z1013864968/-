<template>
  <div class="my-image">
    <!--按钮  -->
    <div class="btn_box" @click="open">
      <img :src="value||btnImage" alt />
    </div>

    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="730px">
      <!-- 标签页 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 按钮 -->
          <el-radio-group v-model="reqParams.collect" size="small" @change="toggleList">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 列表-->
          <div class="img_list">
            <div
              class="img_item"
              v-for="item in images"
              :key="item.id"
              :class="{selected:selectedImageUrl===item.url}"
              @click="selectedImage(item.url)"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            class="pagers"
            layout="prev, pager, next"
            :total="total"
            :current-page="reqParams.page"
            :page-size="reqParams.per_page"
            @current-change="pager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- 上传 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            name="image"
            :show-file-list="false"
            :on-success="handleSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local'
import Default from '../assets/default.png'
export default {
  // value 是封面图片的地址
  props: ['value'],
  data () {
    return {
      // 对话框的显示与隐藏
      dialogVisible: false,
      // 当前激活的选项卡的name值
      activeName: 'image',
      // 素材管理
      images: [],
      // 分页总条数
      total: 0,
      //  选中的图片
      selectedImageUrl: null,
      // 上传时的请求头=》token
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      },
      // 上传后的图片地址
      imageUrl: null,
      // 显示图片
      btnImage: Default,
      // 请求素材参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      }
    }
  },
  methods: {
    // 点击图片按钮
    open () {
      this.dialogVisible = true
      this.getImages()
    },
    // 获取素材列表
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 切换效果
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 分页
    pager (newPager) {
      this.reqParams.page = newPager
      this.getImages()
    },
    // 选中图片=》对号
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    // 上传成功
    handleSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
    },
    // 点击确定按钮=》判断选中的是素材还是上传
    // 用activeName来确定 然后校验 在把选中的图片显示在预览图中
    confirmImage () {
      // 判断素材库中的图片是否被选中
      if (this.activeName === 'image') {
        // 没有被选中
        if (!this.selectedImageUrl) {
          return this.$message.warning('请选择一张图片')
        }
        // 选中后让选中的图片赋值给预览图
        // this.btnImage = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
        // 关闭对话框
        this.dialogVisible = false
        // 上传
      } else if (this.activeName === 'upload') {
        if (!this.imageUrl) {
          return this.$message.warning('请上传一张图片')
        }
        // this.btnImage = this.imageUrl
        this.$emit('input', this.imageUrl)
        this.dialogVisible = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-image {
  display: inline-block;
  margin-right: 20px;
}
.btn_box {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
.img_list {
  padding-top: 20px;
}
.img_item {
  width: 150px;
  height: 120px;
  display: inline-block;
  border: 1px dashed #ddd;
  position: relative;
  margin-right: 20px;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
  }
  &.selected::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3) url("../assets/selected.png") no-repeat
      center/60px;
  }
}
.pagers {
  text-align: center;
}
</style>>
