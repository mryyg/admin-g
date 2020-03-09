import request from './request';
const base = '/api';
export const reqLogin = (username,password) => request(base + '/login',{username,password},'POST');