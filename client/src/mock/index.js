/*
 * @Description:
 * @Author: chengDong
 * @Date: 2020-10-29 08:28:38
 * @LastEditTime: 2020-11-06 14:44:26
 * @LastEditors: chengDong
 */
import Mock from "mockjs";
import {
    baseUrl
} from "@/global/index";

function regUrl(url) {
    let urlStr = baseUrl + url + ".*";
    return RegExp(urlStr);
}

Mock.mock(regUrl("/call"), /get|post/i, {
    code: 0,
    message: "mock请求成功",
    data: [{
            name: "总外呼量",
            value: 3927568
        },
        {
            name: "接通量",
            value: 726451
        },
        {
            name: "A类意向量",
            value: 516401
        },
        {
            name: "B类意向量",
            value: 256801
        },
        {
            name: "拒接量",
            value: 726451
        },
        {
            name: "关机量",
            value: 616401
        }
    ]
});

Mock.mock(regUrl("/trend"), /get|post/i, {
    code: 0,
    message: "请求成功",
    data: {
        "map": {
            "title": "地区销量趋势",
            "base": 310,
            "unit": "万",
            "data": [{
                "name": "上海",
                "data": ["155.13","154.65","171.46","164.38","237.23","300.65","240.29","232.07","193.31","136.70","48.64","90.20"]
            }, {
                "name": "北京",
                "data": ["86.25","33.80","145.58","21.79","176.09","132.41","291.05","191.89","151.54","94.25","141.75","157.14"]
            }, {
                "name": "深圳",
                "data": ["143.94","186.29","183.64","251.48","195.48","152.16","52.47","184.12","203.79","39.16","56.37","161.64"]
            }, {
                "name": "广州",
                "data": ["57.60","77.61","307.24","165.05","175.41","276.88","269.04","296.11","105.31","283.39","134.08","265.38"]
            }, {
                "name": "重庆",
                "data": ["200.82","215.56","249.80","222.67","216.98","60.12","309.68","273.35","150.99","251.97","26.15","186.99"]
            }]
        },
        "seller": {
            "title": "商家销量趋势",
            "base": 120,
            "unit": "万",
            "data": [{
                "name": "商家1",
                "data": ["33.00","86.07","28.77","34.29","102.45","0.30","50.50","21.70","25.41","25.71","66.90","63.29"]
            }, {
                "name": "商家2",
                "data": ["12.83","102.42","37.37","95.55","45.45","112.72","113.53","106.41","75.67","113.91", "37.32", "28.04"]
            }, {
                "name": "商家3",
                "data": ["73.54","40.92","89.81","113.41","76.34","107.15","55.61","0.33","106.29","78.30","98.05","38.67"]
            }, {
                "name": "商家4",
                "data": ["47.19","73.57","44.60","84.03","62.82","15.65","64.72","88.98","29.25","5.41","79.11","118.46"]
            }, {
                "name": "商家5",
                "data": ["74.84","116.45","107.69","11.03","17.31","42.22","97.60","108.64","43.87","110.65","5.96","38.41"]
            }]
        },
        "commodity": {
            "title": "商品销量趋势",
            "base": 50,
            "unit": "万",
            "data": [{
                "name": "女装",
                "data": ["47.71","13.34","19.30","7.93","41.93","23.01","22.63","26.91","0.62","39.23","48.74","29.48"]
            }, {
                "name": "手机数码",
                "data": ["46.66","46.52","23.65","1.73","44.26","47.07","17.86","40.20","3.78","31.46","28.01","8.63"]
            }, {
                "name": "男装",
                "data": ["26.98","30.71","42.59","29.50","26.86","17.65","30.15","15.85","9.28","30.20","32.35","34.46"]
            }, {
                "name": "大家电",
                "data": ["20.26","46.23","43.84","46.75","28.29","32.36","45.30","16.73","40.40","45.07","29.86","41.92"]
            }, {
                "name": "美妆护肤",
                "data": ["7.58","23.66","39.78","30.20","25.72","36.20","47.55","35.39","27.85","37.56","16.91", "3.91"]
            }]
        },
        "common": {
            "month": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
        },
        "type": [{
            "key": "map",
            "text": "地区销量趋势"
        }, {
            "key": "seller",
            "text": "商家销量趋势"
        }, {
            "key": "commodity",
            "text": "商品销量趋势"
        }]
    }
});

Mock.mock(regUrl("/map"),/get|post/i,{
    code:0,
    message: "请求成功",
    data: [
        {
            "name": "黄金用户",
            "children": [
                {
                    "name": "武汉",
                    "value": [114.31, 30.52]
                }, {
                    "name": "丹东",
                    "value": [124.37, 40.13]
                }, {
                    "name": "张家口",
                    "value": [114.87, 40.82]
                }, {
                    "name": "深圳",
                    "value": [114.07, 22.62]
                }
            ]
        },
        {
            "name": "白金用户",
            "children": [
                {
                    "name": "金华",
                    "value": [119.64, 29.12]
                }, {
                    "name": "西安",
                    "value": [108.95, 34.27]
                }
            ]
        },
        {
            "name": "砖石用户",
            "children": [
                {
                    "name": "成都",
                    "value": [104.06, 30.67]
                }
            ]
        }
    ]
})