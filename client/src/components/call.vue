<!--
 * @Description: 外呼数据统计横向柱状图
 * @Author: chengDong
 * @Date: 2020-10-28 14:06:45
 * @LastEditTime: 2020-11-03 16:08:05
 * @LastEditors: chengDong
-->
<template>
  <div class="com-container">
      <div class="com-charts" ref="call_ref">
          
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
    methods: {
        // 初始化echartsInstance对象
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.call_ref,'dark')
        },
        // 获取服务器数据
        async getData() {
            const { data } = await this.$api.call.callData()
            this.allData =  data
            this.updateChart()
        },
        // 更新图表
        updateChart() {
            const callName = this.allData.map(item => {
                return item.name
            })
            const callValues = this.allData.map(item => {
                return item.value
            })
            const option = {
                // 标题配置
                title:{
                    text:'丨外呼相关量统计',
                    textStyle:{
                        fontSize: 60
                    },
                    left: 20,
                    top: 20
                },
                // 坐标轴配置
                grid:{
                    top: '20%',
                    left: '3%',
                    right:'6%',
                    bottom: '3%',
                    containLabel: true // 举例包含坐标轴上文字
                },
                xAxis:{
                    type: 'value'
                },
                yAxis:{
                    type: 'category',
                    data: callName
                },
                series:[
                    {
                        type: 'bar',
                        data: callValues
                    }
                ]
            }
            this.chartInstance.setOption(option)
        }
    },
    mounted () {
        this.initChart()
        this.getData()
    }
}
</script>

<style lang="less" scoped>

</style>