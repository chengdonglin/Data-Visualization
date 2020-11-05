<!--
 * @Description: 趋势图
 * @Author: chengDong
 * @Date: 2020-11-04 19:08:24
 * @LastEditTime: 2020-11-05 15:24:52
 * @LastEditors: chengDong
-->
<template>
  <div class="com-container">
      <div class="title">
          <span> {{ showTitle }}</span>
          <span class="iconfont title-icon" @click="showChoice = !showChoice">^</span>
          <div class="select-con"  v-show="showChoice">
              <div class="select-item" v-for="item in selectType" :key="item.key" @click="handleSelect(item.key)">
                  {{item.text}}
              </div>
          </div>
      </div>
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
            showChoice: false,
            choiceType: 'map',
        }
    },
    computed: {
        selectType() {
            if(!this.allData) {
                return []
            } else {
                return this.allData.type.filter(item => {
                    return item.key != this.choiceType
                })
            }
        },
        showTitle() {
            if(!this.allData){
                return ""
            } else {
                return this.allData[this.choiceType].title
            }
        }
    },
    methods: {
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.trend_ref,'dark')
            const initOption = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false
                },
                yAxis:{
                    type: 'value'
                },
                grid:{
                    left:'3%',
                    top:'35%',
                    right:'4%',
                    bottom:'1%',
                    containLabel: true // 举例包含坐标轴上文字
                },
                tooltip:{
                    trigger:'axis'
                },
                legend:{
                    left: 20,
                    top: '15%',
                    icon: 'circle'
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
            // 半透明
            const colorArr1 = [
                'rgba(11,168,44,0.5)',
                'rgba(44,110,255,0.5)',
                'rgba(22,242,217,0.5)',
                'rgba(254,33,30,0.5)',
                'rgba(250,105,0,0.5)',
            ]
            // 全透明
             const colorArr2 = [
                'rgba(11,168,44,0)',
                'rgba(44,110,255,0)',
                'rgba(22,242,217,0)',
                'rgba(254,33,30,0)',
                'rgba(250,105,0,0)',
            ]
            // 类目数据
            const timeArr = this.allData.common.month
            // y轴下数据 series 下数据
            const valueArr = this.allData[this.choiceType].data
            const seriesArr = valueArr.map((item,index) => {
                return {
                    name: item.name,
                    type: 'line',
                    data: item.data,
                    stack: this.choiceType, // 堆叠图
                    // 面积图
                    areaStyle : {
                        color: new this.$echarts.graphic.LinearGradient(0,0,0,1,[
                            {
                                offset:0,
                                color: colorArr1[index]
                            },
                            {
                                offset: 1,
                                color: colorArr2[index]
                            }
                        ])
                    }
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
        },
        handleSelect(currentType) {
            this.choiceType = currentType
            this.updateChart()
            this.showChoice = false
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

<style lang="less" scoped>
.title {
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 10;
    color:white;
    .title-icon {
        margin-left: 10px;
        cursor: pointer;
    }
}
</style>