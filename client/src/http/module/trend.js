/*
 * @Description: 
 * @Author: chengDong
 * @Date: 2020-10-28 13:47:20
 * @LastEditTime: 2020-11-04 19:32:22
 * @LastEditors: chengDong
 */
import axios from '../axios'


export const trendData = (data) => {
    return axios({
        url: '/trend',
        method: 'post',
        data
    })
}