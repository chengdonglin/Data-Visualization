<!--
 * @Description: 
 * @Author: chengDong
 * @Date: 2020-11-10 14:07:48
 * @LastEditTime: 2020-11-10 14:59:16
 * @LastEditors: chengDong
-->
<template>
  <div class="com-container">
      <div class="com-charts" ref="hot_ref">
          
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            chartInstance: null,
            allData: null
        }
    },
    mounted () {
        this.initChart()
        this.getData()
        window.addEventListener('resize', this.screenAdapter)
        this.screenAdapter()
    },
    destroyed () {
        window.removeEventListener('resize',this.screenAdapter)
    },
    methods: {
        initChart() {
            this.chartInstance = this.$echart.init(this.$refs.hot_ref)
            const initOption = {}
            this.chartInstance.setOption(initOption)
        },
        async getData() {
            // 获取服务器的数据
            this.updateChart()
        },
        updateChart() {
            const dataOption = {}
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter() {
            const adapterOption = {}
            this.chartInstance.setOption(adapterOption)
            this.chartInstance.resize()
        }
    }
}
</script>

<style lang="less" scoped>

</style>