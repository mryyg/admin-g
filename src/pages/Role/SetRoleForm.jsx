import React, { PureComponent } from 'react';

import { Tree, Input } from 'antd';

import menuList from '../../config/menuConfig'


export default class SetRoleForm extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            checkedKeys: this.props.role.menus,
        }
        // 树结点数据
        this.treeData = [{
            title: '平台权限',
            key: '0001',
            children: this.initTreeData(menuList)
        }]
    }

    // 初始化树结构
    initTreeData = (menuList) => {
        return menuList.map(item => {
            if (item.children) {
                return {
                    title: item.title,
                    key: item.path,
                    children: this.initTreeData(item.children)
                }
            } else {
                return {
                    title: item.title,
                    key: item.path,
                }
            }
        })
    }

    // 选中数据绑定
    onCheck = (checkedKeys) => {
        this.setState({
            checkedKeys
        })
    };

    // 将权限数据传给父组件
    getMenus() {
        return this.state.checkedKeys;
    }

    render() {
        const { checkedKeys } = this.state;
        const {role} = this.props;
        return (
            <div>
                <div style={{marginBottom: '10px',paddingBottom:'10px',borderBottom:'1px solid #ccc'}}>
                    角色名:
                    <Input style={{width: '60%',marginLeft:'10px'}} disabled value={role.name}/>
                </div>
                <Tree
                    checkable
                    defaultExpandAll
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                    treeData={this.treeData}
                />
            </div>
        );
    }
}