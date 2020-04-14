/*
*	reac后台管理系统
*	Role.jsx
*	@author: mryyg
*	2020-04-10 19:27:30
*/

import React, { Component } from 'react';

import {
    Card,
    Table,
    Input,
    Button,
    message,
    Modal
} from 'antd';

// 分页，每页显示条数
import { PAGE_SIZE } from '../../utils/constants';

// api
import { reqRoles, reqCreateRole, reqSetRole } from '../../api';

import dateUtils from '../../utils/dateUtils';

// 设置权限组件
import SetRoleForm from './SetRoleForm.jsx';

// 获取当前登录信息
import memoryUtils from '../../utils/memoryUtils';

class Role extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            selectRole: {},
            showModal: 0,
            roleName: ''
        }
        // 设置权限组件ref
        this.setRoleRef = React.createRef();
    }
   
    componentDidMount() {
        this.getRoles()
    }

    // 表格列配置
    columns = [
        {
            title: '角色名称',
            dataIndex: 'name',
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            render: (time, record) => {
                if (time) {
                    return dateUtils(time)
                }
            }
        },
        {
            title: '授权时间',
            dataIndex: 'auth_time',
            render: (time, record) => {
                if (time) {
                    return dateUtils(time)
                }
            }
        },
        {
            title: '授权人',
            dataIndex: 'auth_name',
        },
    ]

    // 左上按钮组
    getTitle = () => (
        <div>
            <Button
                type='primary'
                style={{ marginRight: '10px' }}
                onClick={() => this.setState({showModal:1})}
            >创建角色</Button>
            <Button
                type='primary'
                disabled={!this.state.selectRole._id}
                onClick={() => this.setState({showModal:2})}
            >设置角色权限</Button>
        </div>
    )

    // 获取角色列表
    getRoles = async () => {
        const res = await reqRoles();
        if (res.status !== 0) return message.error('获取角色列表失败')
        this.setState({roles: res.data})
    }

    // 点击行选择角色
    onRow = (role) => {
        return {
            onClick:()=> {
                this.setState({selectRole: role})
            }
        }
    }

    // 创建角色
    createRole = async () => {
        const {roles, roleName} = this.state;
        if (roleName === '') return message.error('角色名不能为空')
        const res = await reqCreateRole(roleName);
        console.log(res)
        if (res.status !== 0) return message.error('角色创建失败');
        //更新角色列表
        const newRoles = [...roles, res.data]
        this.setState({
            roles: newRoles,
            showModal: 0
        })
    }

    // 输入框数据变化
    handleChange = (e) => {
        const value = e.target.value.trim();
        this.setState({roleName:value})
    }

    // 设置权限
    setRole = async () => {
        const role = this.state.selectRole;
        // 收集数据
        role.menus = this.setRoleRef.current.getMenus();
        
        role.auth_time = new Date();
        role.auth_name = memoryUtils.user.username;
        // 发送请求
        const res = await reqSetRole(role);
        console.log(res)
        if(res.status !== 0) return message.error('请求失败')
        // 成功后更新角色列表
       
        this.setState({
            roles: [...this.state.roles],
            showModal: 0
        })
    }

    render() {
        const {roles, showModal, selectRole, roleName} = this.state;
        return (
            <Card
                title={this.getTitle()}
                style={{ height: '100%' }}
            >
                <Table
                    rowSelection={{ type: 'radio', selectedRowKeys: [selectRole._id] }}
                    columns={this.columns}
                    onRow={this.onRow}
                    dataSource={roles}
                    bordered
                    rowKey='_id'
                    pagination={{ pageSize: PAGE_SIZE }}
                />
                {/* 创建角色弹框 */}
                <Modal
                    title="创建角色"
                    visible={showModal === 1}
                    onOk={this.createRole}
                    onCancel={() => { this.setState({showModal: 0}) }}
                >
                    <Input value={roleName} onChange={this.handleChange} placeholder="请输入角色名" />
                </Modal>
                {/* 设置角色权限 */}
                <Modal
                    title="设置角色权限"
                    visible={showModal === 2}
                    onOk={this.setRole}
                    onCancel={() => { this.setState({showModal: 0}) }}
                >
                    <SetRoleForm ref={this.setRoleRef} role={selectRole} key={selectRole._id}/>
                </Modal>
            </Card>
        )
    }

}
export default Role;