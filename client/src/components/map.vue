<!--
 * @Description: 中国地图
 * @Author: chengDong
 * @Date: 2020-11-06 09:04:00
 * @LastEditTime: 2020-11-06 15:43:23
 * @LastEditors: chengDong
-->
<template>
  <div class="com-container" @dblclick="revertMap">
      <div class="com-charts" ref="map_ref"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { getProvinceMapInfo } from '@/utils/map_utils'
export default {
    data () {
        return {
            chartInstance: null,
            allData: null,
            mapData : {}
        }
    },
    computed: {
        
    },
    methods: {
        async initChart(){
            this.chartInstance = this.$echarts.init(this.$refs.map_ref,'dark')
            // 获取中国地图矢量数据
            const {data: mapData} = await axios.get('http://localhost:8999/static/map/china.json')
            this.$echarts.registerMap('china', mapData)
            const initOption = {
                // 标题显示
                title: {
                    text: "| 商家分布图",
                    left: 20,
                    top: 20
                },
                // 地图位置和颜色
                geo: {
                    type: 'map',
                    map: 'china',
                    top: '5%',
                    bottom: '5%',
                    itemStyle: {
                        areaColor: '#2E72BF',
                        borderColor: '#333'
                    }
                },
                // 图例控制
                legend:{
                    left: '5%',
                    bottom: '5%',
                    orient: 'vertical'
                }
            }
            this.chartInstance.setOption(initOption)
            // 地图点击事件
            this.chartInstance.on('click',async arg => {
                // arg.name 是地图省份
                const provinceInfo = getProvinceMapInfo(arg.name)
                // 地图省份矢量数据
                if(!this.mapData[provinceInfo.key]) {
                    const { data: ret} = await axios.get('http://localhost:8999' + provinceInfo.path)
                    this.$echarts.registerMap(provinceInfo.key, ret)
                    this.mapData[provinceInfo.key] = ret
                }
                this.chartInstance.setOption({
                    geo: {
                        map: provinceInfo.key
                    }
                })
            })
        },
        async getData() {
            const { data: ret} = await this.$api.map.mapData()
            this.allData = ret
            this.updateChart()
        },
        screenAdapter() {
            const titleFontSize = this.$refs.map_ref.offsetWidth / 100 * 3.6
            const adapterOption = {
                title: {
                    textStyle: {
                        fontSize : titleFontSize
                    }
                },
                legend:{
                    itemWidth: titleFontSize / 2,
                    itemHeight: titleFontSize / 2,
                    itemGap: titleFontSize / 2,
                    textStyle: {
                        fontSize: titleFontSize / 2
                    } 
                }
            }
            this.chartInstance.setOption(adapterOption)
            this.chartInstance.resize()
        },
        updateChart(){
            // 处理图表需要的数据
            const legendData =  this.allData.map(item => {
                return item.name
            })
            // 散点数据
            const seriesArr = this.allData.map(item => {
                return {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    name: item.name,
                    data: item.children,
                    rippleEffect: {
                        scale:5,
                        brushType: 'stroke'
                    }
                }
            })
            const dataOption = {
                legend: {
                    data: legendData
                },
                series: seriesArr
            }
            this.chartInstance.setOption(dataOption)
        },
        revertMap() {
            const revertOption = {
                geo: {
                    map: 'china'
                }
            }
            this.chartInstance.setOption(revertOption)
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