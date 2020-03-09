/*
*	reac后台管理系统
*	request.js
*	@author: mryyg
*	2020-03-08 11:23:54
*/

import axios from 'axios';
import { message } from 'antd';

export default function request (url,data={},method="GET") {
    return new Promise((resolve,reject) => {
        let promise = null;
        if (method === "GET") {
            promise = axios.get(url,{
                params: data
            });
        } else {
            promise = axios.post(url,data);
        }
        // 统一处理请求结果
        promise.then((res)=>{
            resolve(res.data);
        })
        .catch((err)=>{
            message.error('请求错误：' + err)
        })
    })
}