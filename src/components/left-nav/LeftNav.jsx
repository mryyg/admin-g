import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import {
    HomeOutlined,
    UserOutlined,
    AppstoreOutlined,
    SafetyOutlined,
    AreaChartOutlined,
    FormOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

export default function Nav(props) {
    return (
        <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
        >
            <Menu.Item key="1">
                <Link to="/home">
                    <HomeOutlined />
                    <span>首页</span>
                </Link>
            </Menu.Item>
            <SubMenu
                key="sub1"
                title={
                    <span>
                        <AppstoreOutlined />
                        <span>商品</span>
                    </span>
                }
            >
                <Menu.Item key="5">
                    <Link to="/category">
                        品类管理
                    </Link>

                </Menu.Item>
                <Menu.Item key="6">商品管理</Menu.Item>
            </SubMenu>
            <Menu.Item key="2">
                <UserOutlined />
                <span>用户管理</span>
            </Menu.Item>
            <Menu.Item key="3">
                <SafetyOutlined />
                <span>角色管理</span>
            </Menu.Item>
            <SubMenu
                key="sub2"
                title={
                    <span>
                        <AreaChartOutlined />
                        <span>数据展示</span>
                    </span>
                }
            >
                <Menu.Item key="5">柱形图</Menu.Item>
                <Menu.Item key="6">折线图</Menu.Item>
                <Menu.Item key="7">饼图</Menu.Item>
            </SubMenu>
            <Menu.Item key="8">
                <FormOutlined />
                订单管理
            </Menu.Item>
        </Menu>
    );
}