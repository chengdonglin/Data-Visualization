<template>
  <div class="com-container">
      <div class="com-charts" ref="stock_ref">
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
        async getData() {
            const {data: ret} = await this.$api.stock.stockData()
            this.allData = ret
            this.updateChart()
        },
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.stock_ref,'dark')
            const initOption = {
                title: {
                    text: '| 库存销售量',
                    left: 20,
                    top: 20
                }
            }
            this.chartInstance.setOption(initOption)
        },
        screenAdapter() {
            const adapterOption = {}
            this.chartInstance.setOption(adapterOption)
            this.chartInstance.resize()
        },
        updateChart() {
            // 5个圆环对应的圆心点
            const centerPointers = [
                ['18%','40%'],
                ['50%','40%'],
                ['82%','40%'],
                ['34%','75%'],
                ['66%','75%']
            ]
            // 先显示前5条数据
            const showData = this.allData.slice(0,5)
            const seriesArr = showData.map((item,index) => {
                return {
                    type: 'pie',
                    center: centerPointers[index],
                    radius: [110,100],
                    data: [
                        {
                            value: item.sales
                        },
                        {
                            value: item.stock
                        }
                    ]
                }
            })
            const dataOption = {
                series: seriesArr
            }
            this.chartInstance.setOption(dataOption)
        }
    },
    mounted () {
        this.initChart()
        this.getData()
        window.addEventListener('resize',this.screenAdapter)
        this.screenAdapter()
    }
}
</script>

<style lang='less' scoped>

</style>