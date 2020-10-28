<!--
 * @Description: 
 * @Author: chengDong
 * @Date: 2020-10-28 11:40:44
 * @LastEditTime: 2020-10-28 13:53:48
 * @LastEditors: chengDong
-->
<template>
  <div id="app">
    <button @click="call">点击</button>
  </div>
</template>

<script>
export default {
  methods: {
    call() {
      this.$api.call.callData({}).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less">
  
</style>
