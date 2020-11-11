/*
 * @Description: 
 * @Author: chengDong
 * @Date: 2020-10-28 11:40:44
 * @LastEditTime: 2020-11-11 15:23:23
 * @LastEditors: chengDong
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import CallPage from '@/views/CallPage'
import TrendPage from '@/views/TrendPage'
import MapPage from '@/views/MapPage'
import RankPage from '@/views/RankPage'
import HotPage from '@/views/HotPage'
import StockPage from '@/views/StockPage'
import ScreenPage from '@/views/ScreenPage'

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
  },
  {
    path:'/hotPage',
    component: HotPage
  },
  {
    path: '/stockPage',
    component: StockPage
  },
  {
    path: '/screen',
    component: ScreenPage
  }
]

const router = new VueRouter({
  routes
})

export default router
