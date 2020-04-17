/*
*	react后台管理系统
*	LeftNav.jsx
*	@author: mryyg
*	2020-03-12 20:14:48
*/

import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';

// 引入路由数据
import menuList from '../../config/menuConfig';

// 用于获取登录信息
import memoryUtils from '../../utils/memoryUtils';

const { SubMenu } = Menu;

function Nav(props) {

    let path = props.location.pathname;
    
    const [openKey,setOpenKey] = useState();

    // 解决进入商品详情页面时，商品菜单不选中
    path.includes('/product') && (path = '/product');

    const createMenu = (menuList) => {
        return menuList.map(item => {
            if(hasAuth(item)) {
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
            }
            return null;
        })
    }

    // 判断当前用户是否有当前菜单显示权限
    const hasAuth = (item) => {
        /* 
            1. 是否为公开菜单项（所有人都能看见）
            2. 用户是admin吗
            3. 用户有此菜单权限（菜单的path在用户的menus中）
            4. 子菜单在权限内，父级菜单也需要显示
         */
        const user = memoryUtils.user;
        console.log(user)

         if(item.isPUblic || user.username === 'admin' || user.role.menus.indexOf(item.path) !== -1) {
            return true
         } else if (item.children) {
            return item.children.some(item2=>user.role.menus.indexOf(item2.path) !== -1);
         }
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