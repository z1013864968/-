// 导入一个配置好的axios对象
import axios from 'axios'
import local from '@/utils/local'
import router from '@/router'
// 对axios进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 设置默认的请求头
// if (local.getUser()) {
//   axios.defaults.headers.Authorization = `Bearer ${local.getUser().token}`
// }

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
// 拦截成功 往headers加token
  const user = local.getUser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(res => res, err => {
  // 获取响应状态码 err.response响应对象 err.response.status状态码
  if (err.response.status === 401) {
    // 如果是401跳转到登陆页面
    return router.push('/login')
  }
  return Promise.reject(err)
})
export default axios
