/*
 * @Description: 
 * @Author: chengDong
 * @Date: 2020-11-09 16:21:10
 * @LastEditTime: 2020-11-09 16:21:32
 * @LastEditors: chengDong
 */
import axios from '../axios'

export const rankData = (data) => {
    return axios({
        url: '/rank',
        method: 'post',
        data
    })
}