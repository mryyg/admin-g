/*
*	reac后台管理系统
*	Header.jsx
*	@author: mryyg
*	2020-03-11 21:33:29
*/

import React, { Component } from 'react';

import { withRouter } from 'react-router-dom'

import { Button, Modal } from 'antd';

import { ExclamationCircleOutlined } from '@ant-design/icons';

import './header.less';

// 天气api
import { reqWeather } from '../../api/index';

// 时间处理
import dateUtils from '../../utils/dateUtils';

// 路由数据
import menuList from '../../config/menuConfig';

// 用于获取登录信息
import memoryUtils from '../../utils/memoryUtils';

// 用于清除本地登录信息
import storageUtil from '../../utils/storageUtils'

class AdminHeader extends Component {

    state = {
        // 天气图片
        dayPictureUrl: '',
        // 天气
        weather: '',
        // 时间
        date: dateUtils(),
        // 标题
        title: ''
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

    getTitle(path) {
        let title;
        menuList.some(item => {
            if (item.path === path) {
                return title = item.title;
            } else if (item.children) {
                item.children.some(itemC => {
                    if (itemC.path === path) {
                        title = itemC.title;
                        return true;
                    }
                    return false;
                });
            }
            return false;
        })
        return title;
    }

    logout = () => {
        // const that = this;
        Modal.confirm({
            content: '确定退出吗？',
            okText: '确定',
            cancelText: '取消',
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                storageUtil.removeUser();
                memoryUtils.user = {};
                this.props.history.replace('/login');
            }
        })
    }

    componentDidMount() {

        // 获取天气
        this.getWeather('武汉');

        // 获取时间
        this.getTime();

        // 获取标题
        this.setState({
            title: this.getTitle(this.props.location.pathname)
        })
    }

    componentDidUpdate(preProps) {
        const prePath = preProps.location.pathname;
        const curPath = this.props.location.pathname;
        if (prePath !== curPath) {
            this.setState({
                title: this.getTitle(curPath)
            })
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    render() {
        const { dayPictureUrl, weather, date, title } = this.state;
        return (
            <div className="header">
                <div className='header-top'>
                    Hi, {memoryUtils.user.username}
                    <Button type="link" onClick={this.logout}>退出</Button>
                </div>
                <div className='header-bottom'>
                    <div className="header-bottom-left">
                        {title}
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
export default withRouter(AdminHeader);