<!--
 * @Description: 
 * @Author: chengDong
 * @Date: 2020-11-11 15:22:22
 * @LastEditTime: 2020-11-11 16:00:55
 * @LastEditors: chengDong
-->
<template>
    <div class="screen-container">
        <header class="screen-header">
            <div>
                <img src="/static/img/header_border_dark.png" alt="" srcset="">
            </div>
            <span class="logo">
                <img src="/static/img/logo_dark.png" alt="" srcset="">
            </span>
            <span class="title">外呼系统实时监控平台</span>
            <div class="title-right">
                <img src="/static/img/qiehuan_dark.png" class="qiehuan" alt="" srcset="">
                <span class="datetime">2049-01-01 00:00:00</span>
            </div>
        </header>
        <div class="screen-body">
            <section class="screen-left">
                <div class="left-top">
                    <!-- 小数趋势图 -->
                    <Call ref="call"></Call>
                </div>
                <div id="left-bottom">
                    <!-- 小时金额表 -->
                    <Hot ref="hot" />
                </div>
            </section>
            <section class="screen-middle">
                <div class="middle-top">
                    <!-- 商家分布图表 -->
                    <Map ref="map" />
                </div>
                <div class="middle-top">
                    <!-- 地区销量排行图表 -->
                    <Rank ref="rank" />
                </div>
            </section>
            <section class="screen-right">
                <div class="right-top">
                    <!-- 热销商品占比 -->
                    <Stock ref="stock" />
                </div>
                <div class="right-bottom">
                    <!-- 库存分析图表 -->
                    <Trend ref="trend" />
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import Call from '@/components/call'
import Hot from '@/components/hot'
import Map from '@/components/map'
import Rank from '@/components/rank'
import Stock from '@/components/stock'
import Trend from '@/components/trend'
    export default {
        components: {
            Call,
            Hot,
            Map,
            Rank,
            Stock,
            Trend
        }
    }
</script>

<style lang="less" scoped>
    .screen-container {
        width: 100%;
        height: 100%;
        padding: 0 20px;
        background-color: #161522;
        color: #fff;
        box-sizing: border-box;
    }

    .screen-header {
        width: 100%;
        height: 64px;
        font-size: 20px;
        position: relative;

        >div {
            img {
                width: 100%;
            }
        }

        .title {
            position: absolute;
            left: 50%;
            top: 50%;
            font-size: 20px;
            transform: translate(-50%, -50%)
        }

        .title-right {
            display: flex;
            align-items: center;
            position: absolute;
            right: 0px;
            top: 50%;
            transform: translateY(-80%)
        }

        .qiehuan {
            width: 28px;
            height: 21px;
            cursor: pointer;
        }

        .datetime {
            font-size: 15px;
            margin-left: 10px;
        }

        .logo {
            position: absolute;
            left: 0px;
            top: 50%;
            transform: translateY(-80%);

            img {
                height: 35px;
                width: 128px;
            }
        }

        .screen-body {
            width: 100%;
            height: 100%;
            display: flex;
            margin-top: 10px;

            screen-left {
                height: 100%;
                width: 27.6%;

                left-top {
                    height: 53%;
                }

                left-bottom {
                    height: 31%;
                    margin-top: 25px;
                }
            }

            .screen-middle {
                height: 100%;
                width: 41.5%;
                margin-left: 1.6%;
                margin-right: 1.6%;

                middle-top {
                    width: 100%;
                    height: 56%;
                }

                middle-bottom {
                    margin-top: 25px;
                    width: 100%;
                    height: 28%;
                }
            }

            .screen-right {
                height: 100%;
                width: 27.6%;

                right-top {
                    height: 46%;
                }

                right-bottom {
                    height: 38%;
                    margin-top: 25px;
                }
            }
        }
    }
</style>