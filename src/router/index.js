import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '@/views/login/login.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  // 配置对象
  // 路由规则选项 routes 若干规则
  routes: [{
    path: '/login',
    component: login
  }]
})
export default router
