<template>
  <el-container class="container_home">
    <!-- 菜单 -->
    <el-aside :width="isopan?'200px':'64px'">
      <div class="logo" :class="{smallLogo:!isopan}"></div>
      <el-menu
        :default-active="$route.path"
        router
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        :collapse="!isopan"
        :collapse-transition="false"
      >
       <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
       <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
         <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
         <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
         <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
         <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 头部 -->
      <el-header>
        <!-- 图标 -->
        <span class="el-icon-s-fold icon" @click="toggleMenu"></span>
        <!-- 文字 -->
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉列表 -->
        <el-dropdown class="dropdown" @command="handleClick">
          <span class="el-dropdown-link">
            <img :src="userInfo.photo" alt class="headIcon" />
            <span class="userName">{{userInfo.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock"  command="logout">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import local from '@/utils/local'
import eventBus from '@/eventBus.js'
export default {
  data () {
    return {
      isopan: true,
      userInfo: {
        name: '',
        photo: ''
      }
    }
  },
  created () {
    // 设置用户信息
    const user = local.getUser() || {}
    this.userInfo.name = user.name
    this.userInfo.photo = user.photo
    // 绑定事件 接收修改的name的值
    eventBus.$on('updataName', (name) => {
      this.userInfo.name = name
    })
    eventBus.$on('updataPhoto', (photo) => {
      this.userInfo.photo = photo
    })
  },
  methods: {
    toggleMenu () {
      // 切换左菜单 展开与收起
      this.isopan = !this.isopan
    },
    // 事件没有触发 click事件
    // 给组件绑定事件，如果组件不支持，事件不会发生
    // 要把事件绑定在 组件解析后的原生dom上 需要事件修饰符
    // 事件修饰符：prevent once stop  native（这个是把事件绑定在原生dom上）

    // 还有一个是组件提供的方式 用command指令
    setting () {
      // 给个人设置绑定事件
      this.$router.push('/setting')
    },
    // 退出登陆
    logout () {
      local.delUser()
      this.$router.push('/login')
    },
    handleClick (command) {
      this[command]()
    }
  }
}
</script>

<style lang='less'>
.container_home {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background: #002033;
     .logo{
       width: 100%;
      height: 60px;
      background:#002244 url("../../assets/logo_admin.png")no-repeat center/120px auto;
    }
    .smallLogo{
      background-image: url("../../assets/logo_admin_01.png");
      background-size: 36px auto ;
    }
  }
  .el-header {
    line-height: 60px;
    border-bottom: 1px solid #ccc;
    .icon {
      font-size: 30px;
      vertical-align: middle;
    }
    .text {
      margin-left: 10px;
      vertical-align: middle;
    }
    .dropdown {
      float: right;
    }
    .headIcon {
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
    .userName {
      font-weight: 700;
      vertical-align: middle;
      margin-left: 5px;
    }

  }
}
</style>
