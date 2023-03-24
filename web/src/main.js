import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './assets/iconfont/iconfont.css'
import './style.scss'
import router from './router'

// 导入轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper';
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper)

// 导入组件
import Card from './components/Card.vue'
Vue.component('my-card', Card)
import ListCard from './components/ListCard.vue'
Vue.component('my-listcard', ListCard)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
