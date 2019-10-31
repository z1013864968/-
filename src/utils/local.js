// 提供用户信息的相关api
// 先约定: key='hm-tt-84'
const KEY = 'hm-tt-84'
// 封装local模块用来存储用户信息
const local = {
  // 存储
  setUser (user) {
    // 把user对象转换成json字符串
    const strJson = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, strJson)
  },
  // 获取
  getUser () {
    const strJson = window.sessionStorage.getItem(KEY)
    return JSON.parse(strJson)
  },
  // 清除
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
export default local
