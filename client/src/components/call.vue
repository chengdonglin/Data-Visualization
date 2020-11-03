<!--
 * @Description: 外呼数据统计横向柱状图
 * @Author: chengDong
 * @Date: 2020-10-28 14:06:45
 * @LastEditTime: 2020-11-03 16:32:51
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
                // 鼠标移到x坐标轴背景变化
                tooltip:{
                    'trigger':"axis",
                    axisPointer:{
                        type: 'line',
                        z:0,
                        lineStyle:{
                            width: 66,
                            color:'#2D3443'
                        }
                    }
                },
                series:[
                    {
                        type: 'bar',
                        data: callValues,
                        barWidth: 66, // 柱的宽度,
                        // 文字控制
                        label:{
                            show: true,
                            position: 'right',
                            textStyle: 'white'
                        },
                        // 柱左上角,右上角, 左下角,右下角的圆角设置 
                        itemStyle:{
                            barBorderRadius: [0,33,33,0],
                            // 指明颜色渐变的方向  0,0,1,0 从左往右渐变
                            color: new this.$echarts.graphic.LinearGradient(0,0,1,0,[
                                  // 百分之0状态下的颜色值
                                {
                                    offset: 0,
                                    color: '#5052EE'
                                },
                                // 百分之百状态下的颜色值
                                {
                                    offset: 1,
                                    color: '#AB6EE5'
                                }
                            ])
                        }
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