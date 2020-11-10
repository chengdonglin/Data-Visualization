<!--
 * @Description: 
 * @Author: chengDong
 * @Date: 2020-11-10 14:07:48
 * @LastEditTime: 2020-11-10 16:39:20
 * @LastEditors: chengDong
-->
<template>
  <div class="com-container">
      <div class="com-charts" ref="hot_ref"></div>
        <span class="iconfont arr_left" @click="toLeft" :style="comStyle"> ← </span>
        <span class="iconfont arr_right" @click="toRight" :style="comStyle"> → </span>
        <span class="cat_name" :style="comStyle">{{ catTitle }}</span>
  </div>
</template>

<script>
export default {
    data () {
        return {
            chartInstance: null,
            allData: null,
            currentIndex: 0,
            titleFontSize: 0
        }
    },
    computed: {
            catTitle() {
                if(!this.allData) {
                    return ''
                }
                return this.allData[this.currentIndex].name
            },
            comStyle() {
                return {
                    fontSize: this.titleFontSize + 'px'
                }
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
                    left: 40,
                    top: 20
                },
                series: [
                    {
                        type: 'pie',
                        label: {
                            show: false // 隐藏文字
                        },
                        labelLine: {
                            show: false // 隐藏线
                        },
                        emphasis: {
                            label: {
                                show: true // 高亮显示文字
                            }
                        }
                    }
                ],
                // 图例形状和位置
                legend: {
                    top: '5%',
                    icon: 'circle'
                },
                // 显示tooltip 控制显示内容
                tooltip :{
                    trigger: 'item',
                    formatter: function(params) {
                        let tipArray = []
                        params.data.children.forEach((item) => {
                            let childStr = `
                            ${item.name}&nbsp;&nbsp;&nbsp;
                            ${parseInt((item.value / params.value) * 100) + "%"}
                            `
                            tipArray.push(childStr)
                        })
                        return tipArray.join('<br/>')
                    }
                }
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
                    name: item.name,
                    children: item.children
                    // 当鼠标移入某个扇区的时候, 需要将该二级分类之下的三级分类数据进行展示增加 series 下饼图每一个扇区的数据
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
            this.titleFontSize = this.$refs.hot_ref.offsetWidth / 100 * 3.6
            const adapterOption = {
                // 标题大小
                title: {
                    textStyle: {
                        fontSize: this.titleFontSize
                    }
                },
                // 饼图大小和位置
                series: [
                    {
                        radius: this.titleFontSize * 4.5,
                        center: ['50%','60%']
                    }
                ],
                // 图例大小
                legend: {
                    itemWidth: this.titleFontSize / 2,
                    itemHeight: this.titleFontSize / 2,
                    itemGap: this.titleFontSize / 2,
                    textStyle: {
                        fontSize: this.titleFontSize / 2
                    },
                    top: '15%'
                }
            }
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
    transform: translateY(-50%);
    color: white;
  
}
.arr_right {
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: white
}

.cat_name {
    position: absolute;
    left: 80%;
    bottom: 20px;
    font-weight: bold;
    color: white
}
</style>