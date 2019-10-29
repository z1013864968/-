import Vue from 'vue'
import App from './App.vue'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入axios
import axios from '@/api'

// 引入路由
import router from '@/router'
Vue.use(ElementUI)

// Vue.config.productionTip = false

Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

// main.js职责入口文件
// 职责1:创建根事例
// 职责2:依赖项目需要的全局资源
