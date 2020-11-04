<!--
 * @Description: 趋势图
 * @Author: chengDong
 * @Date: 2020-11-04 19:08:24
 * @LastEditTime: 2020-11-04 19:21:47
 * @LastEditors: chengDong
-->
<template>
  <div class="com-container">
      <div class="com-charts" ref="trend_ref">

      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            chartInstance: null,
            allData: null, //服务器所有的数据
        }
    },
    methods: {
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.trend_ref)
            const initOption = {}
            this.chartInstance.setOption(initOption)
        },
        async getData() {
            this.updateChart()
        },
        // 处理数据
        updateChart() {
            const dataOption = {}
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter() {
            const adapterOption = {}
            this.chartInstance.setOption(adapterOption)
            this.chartInstance.resize()
        }
    },
    mounted () {
        this.initChart()
        this.getData()
        window.addEventListener('resize',this.screenAdapter)
        this.screenAdapter()
    },
    destroyed () {
        window.removeEventListener('resize',this.screenAdapter)
    }
}
</script>

<style>

</style>