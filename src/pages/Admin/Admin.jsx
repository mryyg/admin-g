/*
*	reac后台管理系统
*	Admin.jsx
*	@author: mryyg
*	2020-03-05 20:43:47
*/

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Layout } from 'antd';

// 用于获取登录信息
import memoryUtils from '../../utils/memoryUtils';

// 引入样式
import './admin.less';

// 引入图片
import logo from "../../assets/images/logo.jpg";

// 左菜单
import Nav from '../../components/left-nav/LeftNav';
// 头部组件
import AdminHeader from '../../components/header/Header';
// 首页
import Home from '../Home/Home';
// 品类管理
import Category from '../Category/Category';
// 商品管理
import Product from '../Product/Product';
// 用户管理
import User from '../User/User';
// 角色管理
import Role from '../Role/Role';
// 柱形图
import Bar from '../Bar/Bar';
// 折线图
import Line from '../Line/Line';
// 饼图
import Pie from '../Pie/Pie';

const { Content, Footer, Sider } = Layout;

export default function Admin(props) {
    // 从内存中获取用户信息,判断是否登录
    const user = memoryUtils.user;
    if (!user._id) return <Redirect to='/login' />;

    return (
        <Layout style={{minHeight:'100%'}}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                className="main-left"
            >
                <div className='main-left-logo'>
                    <img src={logo} alt='react' />
                     myAdmin
                </div>
                <Nav />
            </Sider>
            <Layout className='mainBox'>
                
                <AdminHeader />
                
                <Content className='main-content' style={{margin:"20px"}}>
                    <Switch>
                        <Route path='/home' component={Home} />
                        <Route path='/category' component={Category} />
                        <Route path='/user' component={User} />
                        <Route path='/role' component={Role} />
                        <Route path='/product' component={Product} />
                        <Route path='/charts/pie' component={Pie} />
                        <Route path='/charts/line' component={Line} />
                        <Route path='/charts/bar' component={Bar} />
                        <Redirect to='/home' />
                    </Switch>
                </Content>
                <Footer style={{ textAlign: 'center' }}>推荐使用谷歌浏览器体验更佳！</Footer>
            </Layout>
        </Layout>
    )
}