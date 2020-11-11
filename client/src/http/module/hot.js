/*
 * @Description: 
 * @Author: chengDong
 * @Date: 2020-11-10 15:00:34
 * @LastEditTime: 2020-11-10 15:00:52
 * @LastEditors: chengDong
 */
import axios from '../axios'

export const hotData = (data) => {
    return axios({
        url: '/hot',
        method: 'post',
        data
    })
}