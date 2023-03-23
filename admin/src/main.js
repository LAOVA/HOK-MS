import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import './style.css'

Vue.config.productionTip = false

// 导入http
import http from './http'
Vue.prototype.$http = http

// 设置混入（全局可用的代码块）
Vue.mixin({
  // 1.computed是响应式的，methods并非响应式。
  // 2.调用方式不一样，computed定义的成员像属性一样访问，methods定义的成员必须以函数形式调用。
  // 3.computed是带缓存的，只有其引用的响应式属性发生改变时才会重新计算，而methods里的函数在每次调用时都要执行（调用时实时更新）。
  computed: {
    getuploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
