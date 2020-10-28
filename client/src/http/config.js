/*
 * @Description: 
 * @Author: chengDong
 * @Date: 2020-10-28 12:05:35
 * @LastEditTime: 2020-10-28 13:39:22
 * @LastEditors: chengDong
 */
import { baseUrl } from '../global'

export default {
    method: 'get',
    // 基础 url 前缀
    baseUrl: baseUrl,
    // 请求头信息
    headers :{
        'Content-Type':'application/json;charset=UTF-8'
    },
    // 参数
    data : {},
    // 设置超时时间
    timeout: 10000,
    // 携带凭证
    withCredentials: true,
    // 返回数据类
    responseType: 'json'
}