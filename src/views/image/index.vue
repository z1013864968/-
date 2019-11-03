<template>
  <el-card class="box-card">
    <div slot="header">
      <my-bread>素材管理</my-bread>
    </div>
    <!-- 按钮 -->
    <div class="btn_box">
      <!-- 按钮单选框-->
      <el-radio-group v-model="reqParams.collect" size="small" @change="toggleList">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <!-- 按钮 -->
      <el-button type="success" size="small" style="float:right" @click="open">添加素材</el-button>
      <!-- 素材列表 -->
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" />
          <div class="footer" v-if="!reqParams.collect">
            <span
              class="el-icon-star-off"
              @click="toggleStatus(item)"
              :class="{'red':item. is_collected}"
            ></span>
            <span class="el-icon-delete" @click="deleteImage(item.id)"></span>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </div>

    <!-- 对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="300px">
      <!-- 上传 -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers='headers'
         name='image'
        :show-file-list="false"
        :on-success='handleSuccess'
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </el-card>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      reqParams: {
        //   该值是false为全部，true是收藏
        collect: false,
        page: 1,
        per_page: 10
      },
      //  素材管理
      images: [],
      //  分页总条数
      total: 0,
      // 对话框显示和隐藏
      dialogVisible: false,
      // 上传后的图片地址
      imageUrl: null,
      // 上传时的请求头=》token
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  methods: {
    //   获取素材列表
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 分页 改变时触发=>让改变的页赋值给当前页=》在进行渲染
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 切换列表
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 添加收藏和取消收藏
    async toggleStatus (item) {
      // 修改请求
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // 成功后 修改样式
      item.is_collected = data.collect
      //   提示
      this.$message.success((data.collect ? '添加收藏' : '取消收藏') + '成功')
    },
    // 删除素材
    deleteImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 点击确定
          await this.$http.delete(`user/images/${id}`)
          // 删除成功
          this.$message.success('删除成功')
          // 更新列表
          this.getImages()
        })
        .catch(() => {
          // 点击取消
        })
    },
    open () {
      this.dialogVisible = true
      this.imageUrl = null
    },
    // 上传图片成功后触发的事件=》显示2s后关闭
    handleSuccess (res) {
      console.log(res)
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        // 关闭对话框
        this.dialogVisible = false
        // 跟新列表、
        this.getImages()
      }, 2000)
    }
  },
  created () {
    this.getImages()
  }
}
</script>

<style lang="less" scoped>
.img_list {
  padding-top: 20px;
  .img_item {
    width: 180px;
    height: 180px;
    position: relative;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    .footer {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 30px;
      line-height: 30px;
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      text-align: center;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}

</style>>
