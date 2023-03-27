import axios from "axios";
import Vue from "vue";
import router from "./router";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/admin/api'
})

// 设置请求拦截器，添加请求头Authorization
http.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + localStorage.token
  return config
}, error => {
  return Promise.reject(error)
})

// 设置响应拦截器，检验校验码并输出
http.interceptors.response.use(res => {
  return res
}, err => {
  // "$message"是ElementUI的方法，将其挂载到Vue原型
  Vue.prototype.$message({
    type: 'error',
    message: err.response.data.message// 输出错误信息
  })

  // 如果状态码为401，则跳转到登录界面
  if (err.response.status == 401) {
    router.push('/login')
  }

  return Promise.reject(err)
})

export default http;

