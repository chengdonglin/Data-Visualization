/*
 * @Description: 
 * @Author: chengDong
 * @Date: 2020-10-28 11:40:44
 * @LastEditTime: 2020-10-28 14:26:13
 * @LastEditors: chengDong
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
// 引入全局样式文件
import './assets/css/global.less'

// 全局echarts对象挂载到Vue的原型对象上, 别处使用this.$echarts
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false


import api from './http/index'
Vue.use(api)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
