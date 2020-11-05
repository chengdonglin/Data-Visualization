<!--
 * @Description: 趋势图
 * @Author: chengDong
 * @Date: 2020-11-04 19:08:24
 * @LastEditTime: 2020-11-05 09:36:14
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
            const initOption = {
                xAxis: {
                    type: 'category'
                },
                yAxis:{
                    type: 'value'
                }
            }
            this.chartInstance.setOption(initOption)
        },
        async getData() {
            console.log('111')
            const {data: ret} = await this.$api.trend.trendData()
            this.allData = ret
            this.updateChart()
        },
        // 处理数据
        updateChart() {
            // 类目数据
            const timeArr = this.allData.common.month
            // y轴下数据 series 下数据
            const valueArr = this.allData.map.data
            const seriesArr = valueArr.map(item => {
                return {
                    name: item.name,
                    type: 'line',
                    data: item.data,
                    stack: 'map' // 堆叠图
                }
            })
            // 图例的数据
            const legendArr = valueArr.map(item => {
                return item.name
            })
            const dataOption = {
                xAxis:{
                    data: timeArr
                },
                series: seriesArr,
                legend:{
                    data: legendArr
                }
            }
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