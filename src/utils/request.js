import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$http = axios // 这样设置就可以在组件内用 this.$http使用axios
axios.defaults.baseURL = 'http://localhost:8080/'

export const request = async (type = 'POST', url = '', data = {}) => {
  let result
  type = type.toUpperCase()
  if (type === 'GET') {
    await axios.get(url, { params: data })
      .then(res => {
        result = res.data
        // console.log(res)
      })
  } else if (type === 'POST') {
    await axios.post(url, qs.stringify(data))
      .then(res => {
        result = res.data
        console.log(res)
      })
  };
  return result
}
