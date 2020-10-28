<!--
 * @Description: 外呼数据统计横向柱状图
 * @Author: chengDong
 * @Date: 2020-10-28 14:06:45
 * @LastEditTime: 2020-10-28 14:47:38
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
            this.chartInstance = this.$echarts.init(this.$refs.call_ref)
        },
        // 获取服务器数据
        getData() {
            this.allData =  [
                {
                    "name":"总外呼量",
                    value: 3927568
                },
                 {
                    "name":"接通量",
                    value: 272645
                },
                 {
                    "name":"A类意向量",
                    value: 5164
                }
            ]
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