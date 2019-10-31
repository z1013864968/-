import VueRouter from 'vue-router'
import Vue from 'vue'

import login from '@/views/login/login.vue'

import home from '@/views/home'
import welcome from '@/views/welcome'
import isFores from '@/views/404'

import local from '@/utils/local'

Vue.use(VueRouter)

const router = new VueRouter({
  // 配置对象
  // 路由规则选项 routes 若干规则
  routes: [
    // 登陆
    { path: '/login', component: login },
    // 首页
    {
      path: '/',
      component: home,
      children: [
      // 欢迎
        {
          path: '', component: welcome
        }]
    },
    { path: '*', component: isFores }
  ]

})

// 添加路由的 导航守卫(前置导航守卫)
router.beforeEach((to, from, next) => {
  // 每次跳转前触发
// to 跳转到目标 路由对象
// from 从哪里跳转过来 路由对象
// next 下一步方法 next()表示放行 next('/login')表示拦截

  // 获取用户信息

  /**
   *1.先获取用户信息 =》通过local.js local.getUser()
    2.判断是否获取到用户信息和用户信息的token值是否为空
      如果能获取到用户信息并且token的值不为空就进行下一步=》next（）
      否则如果页面本身就在登陆页面就不跳转，否则就跳转到登陆页面

   */
  const user = local.getUser()
  if (user && user.token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
