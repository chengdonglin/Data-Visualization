/*
 * @Description: 
 * @Author: chengDong
 * @Date: 2020-10-28 13:47:20
 * @LastEditTime: 2020-10-28 13:48:26
 * @LastEditors: chengDong
 */
import axios from '../axios'


export const callData = (data) => {
    return axios({
        url: '/call',
        method: 'post',
        data
    })
}