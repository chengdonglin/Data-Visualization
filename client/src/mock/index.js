/*
 * @Description:
 * @Author: chengDong
 * @Date: 2020-10-29 08:28:38
 * @LastEditTime: 2020-11-05 09:19:07
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
        map: {
            title: "地区A类量",
            base: 310,
            unit: "万",
            data: [{
                name: "上海",
                data: [117.5, 118, 119, 116, 123, 150, 145, 180, 190, 180, 111, 123]
            },
            {
                name: "深圳",
                data: [120.5, 112, 129, 126, 133, 160, 155, 190, 110, 170, 161, 133]
            },
            {
                name: "广东",
                data: [217.5, 218, 219, 216, 223, 250, 245, 280, 290, 280, 211, 223]
            },
            {
                name: "北京",
                data: [317.5, 318, 319, 316, 323, 350, 345, 380, 390, 380, 311, 323]
            }
        ]
        },
        common: {
            month: [
                "一月",
                "二月",
                "三月",
                "四月",
                "五月",
                "六月",
                "七月",
                "八月",
                "九月",
                "十月",
                "十一月",
                "十二月"
            ]
        }
    }
});