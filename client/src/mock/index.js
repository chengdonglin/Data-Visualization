/*
 * @Description: 
 * @Author: chengDong
 * @Date: 2020-10-29 08:28:38
 * @LastEditTime: 2020-10-29 08:33:49
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
            value: 272645
        },
         {
            "name":"A类意向量",
            value: 5164
        }
    ]
})