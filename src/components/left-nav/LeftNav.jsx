/*
*	reac后台管理系统
*	LeftNav.jsx
*	@author: mryyg
*	2020-03-12 20:14:48
*/

import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';

// 引入路由数据
import menuList from '../../config/menuConfig';

const { SubMenu } = Menu;

function Nav(props) {

    let path = props.location.pathname;
    
    const [openKey,setOpenKey] = useState();

    path.includes('/product') && (path = '/product');

    const createMenu = (menuList) => {
        // console.log(222)
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.path}>
                        <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                // 查找子列表中是否有匹配当前地址的项，有则说明需要展开
                if (item.children.find(item1 => path.indexOf(item1.path) === 0)) setOpenKey(item.path)
                return (
                    <SubMenu
                        key={item.path}
                        title={
                            <span>
                                {item.icon}
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {createMenu(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    
    // 创建左菜单
    const [menuNodes] = useState(()=>{ 
        return createMenu(menuList)
    });

    return (
        <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[path]}
            defaultOpenKeys={[openKey]}
        >
            {
                menuNodes
            }
           
        </Menu>
    );
}

export default withRouter(Nav);