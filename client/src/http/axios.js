/*
 * @Description: 
 * @Author: chengDong
 * @Date: 2020-10-28 13:39:42
 * @LastEditTime: 2020-10-28 13:58:27
 * @LastEditors: chengDong
 */
import axios from 'axios'
import config from './config'
// import router from '../router/index'

export default function $axios(options) {
    return new Promise((resolve,reject) => {
        const instance = axios.create({
            baseURL: config.baseUrl,
            headers: config.headers,
            timeout: config.timeout,
            withCredentials: config.withCredentials
        })
        // request 请求拦截
        instance.interceptors.request.use(config => {
            // let token = Cookie.get('token')
            //     if(token) {
            //         config.headers.token = token
            //     } else {
            //         router.push('/login')
            //     }
            return config
        },error => {
            return Promise.reject(error)
        })
        // response

        instance.interceptors.response.use(response => {
            return response.data
        },err => {
            return Promise.reject(err)
        })
        instance(options).then(res => {
            resolve(res)
        }).catch(err => {
            resolve(err)
        })
    })
}