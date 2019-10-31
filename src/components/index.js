import MyBread from '@/components/my-bread'
export default {
  install (Vue) {
    //  Vue是个构造函数
    Vue.component('my-bread', MyBread)
  }
}
