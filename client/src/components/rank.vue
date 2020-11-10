<!--
 * @Description: 外呼数据统计横向柱状图
 * @Author: chengDong
 * @Date: 2020-10-28 14:06:45
 * @LastEditTime: 2020-11-10 13:55:47
 * @LastEditors: chengDong
-->
<template>
  <div class="com-container">
      <div class="com-charts" ref="rank_ref">
          
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            chartInstance: null,
            allData: null,
            startValue: 0,
            endValue: 9,
            timerId: null
        }
    },
    methods: {
        // 初始化echartsInstance对象
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.rank_ref,'dark')
            const initOption = {
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        type: 'bar'
                    }
                ],
                title: {
                    text: '| 地区销售排行',
                    left: 20,
                    top: 20
                },
                grid: {
                    top: '40%',
                    left: '5%',
                    bottom: '5%',
                    right: '5%',
                    containLabel: true
                },
                tooltip : {
                    show: true
                }
            }
            this.chartInstance.setOption(initOption)
            this.chartInstance.on('mouseover', () => {
                clearInterval(this.timerId)
            })
            this.chartInstance.on('mouseout',() => {
                this.startInterval()
            })
        },
        // 获取服务器数据
        async getData() {
            const { data: ret} = await this.$api.rank.rankData()
            this.allData = ret
            this.allData.sort((a,b) => {
                return b.value - a.value
            })
            this.updateChart()
            this.startInterval()
        },
        // 更新图表
        updateChart() {
            const colorArr = [
                ['#0BA82C','#4FF778'],
                ['#2E72BF','#23E5E5'],
                ['#5052EE','#AB6EE5']
            ]
            const provinceArr = this.allData.map(item => {
                return item.name
            })
            const valueArr = this.allData.map(item => item.value)
            const dataOption = {
                xAxis: {
                    data: provinceArr
                },
                dataZoom: {
                    show: false,
                    startValue: this.startValue,
                    endValue: this.endValue
                },
                series: [
                    {
                        data: valueArr,
                        itemStyle: {
                            color: arg => {
                                let targetColorArr= colorArr[0]
                                if(arg.value >= 300) {
                                    targetColorArr = colorArr[0]
                                } else if (arg.value >= 200) {
                                    targetColorArr = colorArr[1]
                                } else {
                                    targetColorArr = colorArr[2]
                                }
                                return new this.$echarts.graphic.LinearGradient(0,1,0,0,[
                                    {
                                        offset: 0,
                                        color: targetColorArr[0]
                                    },
                                    {
                                        offset: 1,
                                        color: targetColorArr[1]
                                    }
                                ])
                            }
                        }
                    }
                ]
            }
           this.chartInstance.setOption(dataOption)
           // 手动调动对象 resize
           this.chartInstance.resize()
        },
        screenAdapter() {
           const adapterOption = {}
           this.chartInstance.setOption(adapterOption)
           this.chartInstance.resize() 
        },
        startInterval () {
            if(this.timerId) {
                clearInterval(this.timerId)
            }
            this.timerId = setInterval(() => {
                this.startValue++
                this.endValue++
                if(this.endValue > this.allData.length -1) {
                    this.startValue = 0
                    this.endValue = 9
                }
                this.updateChart()
            }, 3000);
        }
    },
    async mounted () {
        this.initChart()
        await this.getData()
        window.addEventListener('resize',this.screenAdapter)
        // 页面加载完成, 主动进行屏幕适配
        this.screenAdapter()
    },
    destroyed () {
        window.removeEventListener('resize', this.screenAdapter)
        clearInterval(this.timerId)
    }
}
</script>

<style lang="less" scoped>

</style>