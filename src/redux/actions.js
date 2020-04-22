import {SET_TITLE, RECEIVE_USER, RESET_USER } from './action-type';

import { reqLogin } from "../api";
import storageUtils from '../utils/storageUtils';

export const setTitle = title => ({type: SET_TITLE, title});

// 接受用户信息的同步action
export const receiveUser = user => ({type: RECEIVE_USER, user});

// 登录的异步action
export const logIn = (username,password) => async dispatch => {
    // 发送请求
    const res = await reqLogin(username,password);
    console.log(res)
    if(res.status === 0) {
        // 将user保存到本地存储
        storageUtils.saveUser(res.data);
        // 保存user的同步action
        dispatch(receiveUser(res.data))
    }
    
}

// 退出登录
export const logOut = () => {
    storageUtils.removeUser();
    return {type: RESET_USER};
}