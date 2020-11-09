/*
 * @Description: 
 * @Author: chengDong
 * @Date: 2020-10-28 11:40:44
 * @LastEditTime: 2020-11-09 16:15:55
 * @LastEditors: chengDong
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import CallPage from '@/views/CallPage'
import TrendPage from '@/views/TrendPage'
import MapPage from '@/views/MapPage'
import RankPage from '@/views/RankPage'

Vue.use(VueRouter)

const routes = [
  {
    path:'/callPage',
    component: CallPage
  },
  {
    path:'/trendPage',
    component: TrendPage
  },
  {
    path:'/mapPage',
    component: MapPage
  },
  {
    path:'/rankPage',
    component: RankPage
  }
]

const router = new VueRouter({
  routes
})

export default router
