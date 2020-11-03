/*
 * @Description: 
 * @Author: chengDong
 * @Date: 2020-10-29 08:28:38
 * @LastEditTime: 2020-11-03 16:12:48
 * @LastEditors: chengDong
 */
import Mock from 'mockjs'
import { baseUrl } from '@/global/index'

function regUrl(url) {
    let urlStr = baseUrl + url + ".*"
    return RegExp(urlStr)
}

Mock.mock(regUrl('/call'), /get|post/i,{
    code: 0,
    message: "mock请求成功",
    data: [
        {
            "name":"总外呼量",
            value: 3927568
        },
         {
            "name":"接通量",
            value: 726451
        },
         {
            "name":"A类意向量",
            value: 516401
        },
        {
            "name":"B类意向量",
            value: 256801
        },
         {
            "name":"拒接量",
            value: 726451
        },
         {
            "name":"关机量",
            value: 616401
        }
    ]
})