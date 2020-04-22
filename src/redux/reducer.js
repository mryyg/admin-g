import { combineReducers } from 'redux';

import {SET_TITLE, RECEIVE_USER, RESET_USER} from './action-type';

import storageUtil from '../utils/storageUtils';


// 首页数据管理
const initTitle = '首页'

function title (state = initTitle, action) {
    switch(action.type) {
        case SET_TITLE:
            return action.title
        default:
            return state
    }
}

// 登录用户数据管理
const initUser = storageUtil.getUser() || {};

function user (state = initUser, action) {
    switch(action.type) {
        case RECEIVE_USER:
            return action.user
        case RESET_USER:
            return {}
        default:
            return state
    }
}

export default combineReducers({
    title,
    user
})

