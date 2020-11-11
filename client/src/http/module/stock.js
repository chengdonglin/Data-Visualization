/*
 * @Description: 
 * @Author: chengDong
 * @Date: 2020-11-11 09:34:22
 * @LastEditTime: 2020-11-11 14:01:15
 * @LastEditors: chengDong
 */
import axios from '../axios'

export const stockData = (data) => {
    return axios({
        url: '/stock',
        method: 'post',
        data
    })
}