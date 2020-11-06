/*
 * @Description: 地图接口
 * @Author: chengDong
 * @Date: 2020-11-06 14:04:17
 * @LastEditTime: 2020-11-06 14:08:42
 * @LastEditors: chengDong
 */
import axios from '../axios'

export const mapData = (data) => {
    return axios({
        url: '/map',
        method: 'post',
        data
    })
}