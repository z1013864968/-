<template>
  <div class="container">
    <!-- 登陆卡片 -->
    <el-card>
      <!-- 图片 -->
      <img src="../../assets/logo_index.png" alt />

      <!-- 表单 -->
      <el-form ref="form" :model="loginFrom">
        <el-form-item>
          <el-input placeholder="请输入手机号" v-model="loginFrom.mobile"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input
            placeholder="请输入验证码"
            v-model="loginFrom.code"
            style="width:235px; margin-right:10px;"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox label="我已阅读并同意用户协议和隐私条款" name="type" :value="true"></el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button style="width:100%" type="primary">立刻登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginFrom: {
        // mobile: '13366666666',
        // code: '246810'
      }
    }
  }
}
</script>

<style lang='less'>
.container {
  width: 100%;
  height: 100%;
  background:url("../../assets/login_bg.jpg") no-repeat center/cover;
  position: absolute;
  left: 0;
  top: 0;
  .el-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto;
      margin-bottom: 30px;
    }
  }
}
</style>
