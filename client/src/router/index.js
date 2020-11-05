/*
 * @Description: 
 * @Author: chengDong
 * @Date: 2020-10-28 11:40:44
 * @LastEditTime: 2020-11-04 19:35:27
 * @LastEditors: chengDong
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import CallPage from '@/views/CallPage'
import TrendPage from '@/views/TrendPage'

Vue.use(VueRouter)

const routes = [
  {
    path:'/callPage',
    component: CallPage
  },
  {
    path:'/trendPage',
    component: TrendPage
  }
]

const router = new VueRouter({
  routes
})

export default router
