/*
*	reac后台管理系统
*	index.js
*	@author: mryyg
*	2020-03-05 20:45:48
*/

import React from 'react';
import ReactDom from 'react-dom';

import App from './App';

// 用于获取登录信息
import memoryUtils from './utils/memoryUtils';
import storageUtil from './utils/storageUtils';

const user = storageUtil.getUser();
user._id && (memoryUtils.user = user);

ReactDom.render(<App />, document.getElementById('root'))