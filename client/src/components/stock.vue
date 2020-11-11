<!--
 * @Description: 
 * @Author: chengDong
 * @Date: 2020-11-10 16:43:20
 * @LastEditTime: 2020-11-11 09:30:34
 * @LastEditors: chengDong
-->
<template>
  <div class="com-container">
      <div class="com-chart" ref="stock_ref"></div>
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
        window.removeEventListener('resize', this.screenAdapter)
    },
    methods: {
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.stock_ref,'dark')
            const initOption = {}
            this.chartInstance.setOption(initOption)
        },
        async getData() {
            this.updateChart()
        },
        updateChart() {
            // 地理图表需要的数据
            const dataOption = {}
            this.chartInstance.setOption(dataOption)
            this.chartInstance.resize()
        }
    }
}
</script>

<style>

</style>