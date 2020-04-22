/*
*	reac后台管理系统
*	Header.jsx
*	@author: mryyg
*	2020-03-11 21:33:29
*/

import React, { Component } from 'react';

import { connect } from 'react-redux';
import { logOut } from '../../redux/actions';

import { withRouter } from 'react-router-dom'

import { Button, Modal } from 'antd';

import { ExclamationCircleOutlined } from '@ant-design/icons';

import './header.less';

// 天气api
import { reqWeather } from '../../api/index';

// 时间处理
import dateUtils from '../../utils/dateUtils';

// 路由数据
// import menuList from '../../config/menuConfig';

// 用于获取登录信息
// import memoryUtils from '../../utils/memoryUtils';

// 用于清除本地登录信息
// import storageUtil from '../../utils/storageUtils';

class AdminHeader extends Component {

    state = {
        // 天气图片
        dayPictureUrl: '',
        // 天气
        weather: '',
        // 时间
        date: dateUtils(),
        // // 标题
        // title: ''
    }

    async getWeather(city) {
        const { dayPictureUrl, weather } = await reqWeather(city);
        this.setState({
            dayPictureUrl,
            weather
        })
    }

    getTime() {
        this.timer = setInterval(() => {
            this.setState({
                date: dateUtils()
            })
        }, 1000);
    }

    logout = () => {
        // const that = this;
        Modal.confirm({
            content: '确定退出吗？',
            okText: '确定',
            cancelText: '取消',
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                // storageUtil.removeUser();
                // memoryUtils.user = {};
                this.props.logOut();
                this.props.history.replace('/login');
            }
        })
    }

    componentDidMount() {

        // 获取天气
        this.getWeather('武汉');

        // 获取时间
        this.getTime();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    render() {
        const { dayPictureUrl, weather, date } = this.state;
        return (
            <div className="header">
                <div className='header-top'>
                    Hi, {this.props.user.username}
                    <Button type="link" onClick={this.logout}>退出</Button>
                </div>
                <div className='header-bottom'>
                    <div className="header-bottom-left">
                        {this.props.title}
                    </div>
                    <div className="header-bottom-right">
                        {date}
                        <img src={dayPictureUrl} alt='天气'></img>
                        {weather}
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(
    (state) => ({title: state.title, user: state.user}),
    {logOut}
)(withRouter(AdminHeader));