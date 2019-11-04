<template>
  <div class="artivle">
    <!-- 筛选添加布局 -->
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 频道 -->
          <app-channel v-model="reqParams.channel_id"></app-channel>

        <el-form-item label="日期：">
          <!-- v-model绑定的是数组  [起始时间,结束时间]-->
          <el-date-picker
            v-model="arrDate"
            @change="changeDate"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 筛选结果 -->
    <el-card style="margin-top:20px">
      <div slot="header">
        <span>根据筛选条件共查询到 {{total}} 条数据</span>
      </div>
      <!-- 表格 -->
      <el-table :data="articless" style="width: 100%;">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!-- 第一张封面图 -->
            <el-image :src="scope.row.cover.images[0]" fit="fill" style="width:150px;height:100px">
              <div slot="error">
                <img src="../../assets/error.gif" width="150" height="100" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              @click="toEdit(scope.row.id)"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" circle plain @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <!-- total是总条数 -->
      <!--page-size total默认显示10条每页  -->
      <!-- current-page动态的激活当前页码对应的按钮-->
      <!-- current-change事件:当页码改变(点击按钮 上一页 下一页)就执行  参数是当前改变后的页码-->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 筛选参数
      // 使用axios提交数据时候 如果数据的值为null是不会提交该字段的
      reqParams: {
        status: null, // 状态
        channel_id: null, // 频道id
        begin_pubdate: null, // 起始时间
        end_pubdate: null, // 结束时间
        page: 1, // 页码
        per_page: 20 // 每页数量
      },
      //   频道选项数据
      Coptions: [],
      //   日期
      arrDate: [],
      // 文章列表
      articless: [],
      // 文章总条数
      total: 0
    }
  },
  // 方法
  methods: {
    // 获取频道选项数据
    // async getChannelOptions () {
    //   const {
    //     data: { data }
    //   } = await this.$http.get('channels')
    //   this.Coptions = data.channels
    // },
    // 获取文章列表
    async getArticle () {
      // 第一种:axios.get(url?key=value&key1=value1....,) get 传参
      // 第二种:axios.get(url,{params:参数对象})
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // 赋值文章列表依赖数据
      this.articless = data.results
      // 赋值文章总条数依赖数据
      this.total = data.total_count
    },
    // 分页功能
    pager (newPager) {
      // 根据新的页码和当前的筛选条件 从新查询数据即可
      this.reqParams.page = newPager
      this.getArticle()
    },
    // 选择日期触发的时间
    changeDate (dataArr) {
      // dataArr数据格式:[data,data]
      // 后端需要的数据格式是[string,string]
      // 注意:清除选择的日期后 dataArr的值为null
      if (dataArr) {
        this.reqParams.begin_pubdate = dataArr[0]
        this.reqParams.end_pubdate = dataArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选查询
    search () {
      // 准备日期数据
      // 进行数据获取
      // 判断如果频道的值为'' 则修改为null
      if (this.reqParams.channel_id === '') {
        this.reqParams.channel_id = null
      }

      // 筛选之前先做的是吧页码调到第一页
      this.reqParams.page = 1
      this.getArticle()
    },
    // 编辑
    toEdit (id) {
      this.$router.push({ path: '/publish', query: { id } })
    },
    // 删除
    async del (id) {
      // 请求
      await this.$http.delete(`articles/${id}`)
      // 提示
      this.$message.success('删除文章成功')
      // 更新列表
      this.getArticles()
    }
  },
  created () {
    // this.getChannelOptions()
    this.getArticle()
  }
}
</script>

<style>
</style>
