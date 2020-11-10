<!--
 * @Description: 
 * @Author: chengDong
 * @Date: 2020-11-10 14:07:48
 * @LastEditTime: 2020-11-10 15:39:33
 * @LastEditors: chengDong
-->
<template>
  <div class="com-container">
      <div class="com-charts" ref="hot_ref"></div>
        <span class="iconfont arr_left" @click="toLeft">next</span>
        <span class="iconfont arr_right" @click="toRight">up</span>
  </div>
</template>

<script>
export default {
    data () {
        return {
            chartInstance: null,
            allData: null,
            currentIndex: 0
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
            this.chartInstance = this.$echarts.init(this.$refs.hot_ref,'dark')
            const initOption = {
                title: {
                    text: '| 热销商品销售金额占比统计',
                    left: 20,
                    top: 20
                },
                series: [
                    {
                        type: 'pie'
                    }
                ]
            }
            this.chartInstance.setOption(initOption)
        },
        async getData() {
            // 获取服务器的数据
            const {data: ret } = await this.$api.hot.hotData()
            this.allData = ret
            this.updateChart()
        },
        updateChart() {
            // 饼图数据
            const seriesData = this.allData[this.currentIndex].children.map(item => {
                return {
                    value: item.value,
                    name: item.name
                }
            })
            // 图例数据
            const ledendData = this.allData[this.currentIndex].children.map(item => {
                return item.name
            })
            const dataOption = {
                legend: {
                    data: ledendData
                },
                series: [
                    {
                        data: seriesData
                    }
                ]
            }
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter() {
            const adapterOption = {}
            this.chartInstance.setOption(adapterOption)
            this.chartInstance.resize()
        },
        toLeft() {
            this.currentIndex--
            if(this.currentIndex < 0) {
                this.currentIndex = this.allData.length -1
            }
            this.updateChart()
        },
        toRight() {
            this.currentIndex++
            if(this.currentIndex > this.allData.length -1) {
                this.currentIndex = 0
            }
            this.updateChart()
        }
    }
}
</script>

<style lang="less" scoped>
.arr_left {
    position: absolute;
    left: 10%;
    top: 50%;
    transform: translateY(-80%);
    color: white;
  
}
.arr_right {
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-80%);
    cursor: pointer;
    color: white
}
</style>