<template>
  <div class="container">
    <!-- 登陆卡片 -->
    <el-card>
      <!-- 图片 -->
      <img src="../../assets/logo_index.png" alt />

      <!-- 表单 -->
      <el-form ref="loginFrom" :model="loginFrom" :rules="loginRules"  status-icon >
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="loginFrom.mobile"></el-input>
        </el-form-item>

        <el-form-item prop="code">
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
          <el-button style="width:100%" type="primary" @click="login">立刻登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    // 验证手机号函数 =》自定义校验

    // 自定义校验
    // 必须写在return之前，必须有三个参数
    // rule 当前字段的先校验规则对象
    // value 当前字段的值
    // callback 校验完成后的回调函数 ，成功=》callback() ,失败=》callback（new Error('提示信息')）

    const checkMobile = (rule, value, callback) => {
      // 通过校验逻辑判断成功失败
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不对'))
      }
    }
    return {
      loginFrom: {
        mobile: '13366666666',
        code: '246810'
      },
      // 校验
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入正确的验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs['loginFrom'].validate(async (valid) => {
        if (valid) {
          // this.$http.post('authorizations', this.loginFrom).then((res) => {
          //   // 成功
          //   // 保存用户信息(token)
          //   console.log(res)
          //   local.setUser(res.data.data)
          //   this.$router.push('/')
          // }).catch(() => {
          //   this.$message.error('手机号或验证码错误')
          // })
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.loginFrom)
            local.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
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
