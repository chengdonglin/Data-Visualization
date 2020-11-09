<!--
 * @Description: 外呼数据统计横向柱状图
 * @Author: chengDong
 * @Date: 2020-10-28 14:06:45
 * @LastEditTime: 2020-11-09 16:41:38
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
            allData: null
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
                }
            }
            this.chartInstance.setOption(initOption)
        },
        // 获取服务器数据
        async getData() {
            const { data: ret} = await this.$api.rank.rankData()
            this.allData = ret
            this.allData.sort((a,b) => {
                return b.value - a.value
            })
            this.updateChart()
        },
        // 更新图表
        updateChart() {
            const provinceArr = this.allData.map(item => {
                return item.name
            })
            const valueArr = this.allData.map(item => item.value)
            const dataOption = {
                xAxis: {
                    data: provinceArr
                },
                series: [
                    {
                        data: valueArr
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
    }
}
</script>

<style lang="less" scoped>

</style>