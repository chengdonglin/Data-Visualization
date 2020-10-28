<!--
 * @Description: 
 * @Author: chengDong
 * @Date: 2020-10-28 11:40:44
 * @LastEditTime: 2020-10-28 14:10:41
 * @LastEditors: chengDong
-->
<template>
  <div id="app">
    <!--<button @click="call">点击</button> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    // call() {
    //   this.$api.call.callData({}).then(res => {
    //     console.log(res)
    //   })
    // }
  },
  created () {
    // console.log(this.$echarts)
  }
}
</script>

<style lang="less">
  
</style>
