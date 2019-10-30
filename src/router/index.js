import VueRouter from 'vue-router'
import Vue from 'vue'

import login from '@/views/login/login.vue'

import home from '@/views/home'
import welcome from '@/views/welcome'
import isFores from '@/views/404'

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
export default router
