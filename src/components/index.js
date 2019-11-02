import MyBread from '@/components/my-bread'
import APPCHANNEL from '@/components/app-channel'

export default {
  install (Vue) {
    //  Vue是个构造函数
    Vue.component('my-bread', MyBread)
    Vue.component('app-channel', APPCHANNEL)
  }
}
