/*
 * @Description: 
 * @Author: chengDong
 * @Date: 2020-10-28 13:49:56
 * @LastEditTime: 2020-10-28 13:50:50
 * @LastEditors: chengDong
 */
import api from './api'


const install = Vue => {
    if(install.installed) {
        return;
    }
    install.installed = true
    Object.defineProperties(Vue.prototype,{
        // 注意. 此次挂载 Vue 原型的$api 上
        $api:{
            get() {
                return api
            }
        }
    })
}

export default install