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

// 引入自定义组件
import Nav from '../../components/left-nav/LeftNav';
import AdminHeader from '../../components/header/Header';
import Home from '../Home/Home';
import Category from '../Category/Category';
import User from '../User/User';
import Role from '../Role/Role';
import Pie from '../Pie/Pie';
import Line from '../Line/Line';
import Bar from '../Bar/Bar';
import Product from '../Product/Product';

const { Header, Content, Footer, Sider } = Layout;

export default function Admin(props) {
    // 从内存中获取用户信息
    const user = memoryUtils.user;
    if (!user._id) return <Redirect to='/login' />;
    return (
        <Layout style={{ height: '100%' }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                className="main-left"
            >
                <div className='main-left-logo'>
                    <img src={logo} alt='react' />
                     react-admin
                </div>
                <Nav />
            </Sider>
            <Layout className='main'>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
                    <AdminHeader />
                </Header>
                <Content className='main-content'>
                    <Switch>
                        <Route path='/home' component={Home} />
                        <Route path='/category' component={Category} />
                        <Route path='/user' component={User} />
                        <Route path='/role' component={Role} />
                        <Route path='/product' component={Product} />
                        <Route path='/pie' component={Pie} />
                        <Route path='/line' component={Line} />
                        <Route path='/bar' component={Bar} />
                    </Switch>
                </Content>
                <Footer style={{ textAlign: 'center' }}>建议使用谷歌浏览器体验更佳！</Footer>
            </Layout>
        </Layout>
    )
}