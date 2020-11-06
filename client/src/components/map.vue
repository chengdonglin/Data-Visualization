<!--
 * @Description: 中国地图
 * @Author: chengDong
 * @Date: 2020-11-06 09:04:00
 * @LastEditTime: 2020-11-06 14:48:22
 * @LastEditors: chengDong
-->
<template>
  <div class="com-container">
      <div class="com-charts" ref="map_ref"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
            chartInstance: null,
            allData: null
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
                geo: {
                    type: 'map',
                    map: 'china'
                }
            }
            this.chartInstance.setOption(initOption)
        },
        async getData() {
            const { data: ret} = await this.$api.map.mapData()
            this.allData = ret
            this.updateChart()
        },
        screenAdapter() {

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
                    data: item.children
                }
            })
            const dataOption = {
                legend: {
                    data: legendData
                },
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
    },
    destroyed () {
        window.removeEventListener('resize',this.screenAdapter)
    }
}
</script>

<style>

</style>