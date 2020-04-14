/*
*	reac后台管理系统
*	index.js
*	@author: mryyg
*	2020-03-13 20:15:10
*/

import request from './request';
import jsonp from 'jsonp';


const base = '/api';

// 登录
export const reqLogin = (username,password) => request(base + '/login',{username,password},'POST');

// 天气
export const reqWeather = (city) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    return new Promise((resolve,reject)=>{
        jsonp(
            url,
            {},
            (err,data) => {
                if(err || data.status !== 'success') return alert('获取天气信息失败！')
                const {dayPictureUrl,weather} = data.results[0].weather_data[0];
                resolve({dayPictureUrl,weather})
            }
        )
    })
}

// 获取分类信息
export const reqCategory = (parentId) => request(base + "/manage/category/list", {parentId}, "GET");

// 修改分类
export const reqEditCategory = (categoryId,categoryName) => request(base +'/manage/category/update',{categoryId,categoryName}, "POST")

// 添加分类
export const reqAddCategory = (parentId,categoryName) => request(base + '/manage/category/add', {parentId, categoryName}, "POST")

// 获取商品列表
export const reqProduct = (pageNum,pageSize) => request(base + '/manage/product/list',{pageNum,pageSize}, 'GET');

// 搜索商品
export const reqSearch = (pageNum,pageSize,searchType,searchText) => request(base + '/manage/product/search', {pageNum,pageSize,[searchType]: searchText}, 'GET');

// 上架/下架商品
export const reqUpdateStatus = (productId,status) => request(base + '/manage/product/updateStatus', {productId,status}, "POST");

// 根据分类id获取分类
export const reqCategoryName = (categoryId) => request(base + '/manage/category/info', {categoryId}, 'GET');

// 删除图片
export const reqDeleteImg = name => request(base + '/manage/img/delete', {name}, 'POST');

// 添加/更新商品
export const reqAddOrUpdateProduct = product => request(base + '/manage/product/' + (product._id ? 'update' : 'add'), {...product}, 'POST')

// 获取角色列表
export const reqRoles = () => request(base + '/manage/role/list', 'GET');

// 添加角色
export const reqCreateRole = roleName => request(base + '/manage/role/add', {roleName},'POST');

// 设置权限
export const reqSetRole = role => request(base + '/manage/role/update', role, 'POST');

// 获取用户列表
export const reqUsers = () => request(base + '/manage/user/list','GET');

// 添加/更新用户
export const reqAddOrUpdateUser = user => request(base + '/manage/user/' + (user._id ? 'update' : 'add'), user, 'POST');

// 删除用户
export const reqDeleteUser = userId =>request(base + '/manage/user/delete', {userId}, "POST");