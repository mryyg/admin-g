import React, { Component } from 'react';

import {
    Card,
    Table,
    Button,
    message,
    Modal
} from 'antd';

// 分页，每页显示条数
import { PAGE_SIZE } from '../../utils/constants';

// 时间处理工具
import dateUtils from '../../utils/dateUtils';

// api
import { reqUsers, reqAddOrUpdateUser, reqDeleteUser } from '../../api';

// 创建、修改用户表单组价
import UserForm from './UserForm';

import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

export default class User extends Component {

    state = {
        users: [],
        roles: [],
        showModal: false
    }

    // 表格列配置
    columns = [
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '电话',
            dataIndex: 'phone',
        },
        {
            title: '注册时间',
            dataIndex: 'create_time',
            render: (time, record) => {
                if (time) {
                    return dateUtils(time)
                }
            }
        },
        {
            title: '所属角色',
            dataIndex: 'role_id',
            render: (role_id) => this.roleNames[role_id]
        },
        {
            title: '操作',
            // dataIndex: '',
            render: (_, record) => {
                return (
                    <span>
                        <Button type='link' onClick={() => {
                            this.setState({ showModal: true });
                            this.updateUser = record;
                        }}>修改</Button>
                        <Button type='link' onClick={() => this.deleteUser(record._id)}>删除</Button>
                    </span>
                )
            }
        },
    ]

    componentDidMount() {
        // 获取用户列表，角色列表信息
        this.getUsers();

    }

    initRoles = (roles) => {
        // 将角色数据转换成id为key，roleName为值的对象
        this.roleNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name;
            return pre;
        }, {})
    }

    getUsers = async () => {
        const res = await reqUsers();
        if (res.status !== 0) return message.error('获取用户列表失败')
        const { users, roles } = res.data;
        this.initRoles(roles)
        this.setState({
            users,
            roles,
        })

    }

    getTitle() {
        return (
            <div>
                <Button type='primary' onClick={() => {
                    this.setState({ showModal: true });
                    this.updateUser = null;
                }}>创建用户</Button>
            </div>
        )
    }

    // 创建或更新用户
    createOrupdateUser = () => {
        this.form.current.validateFields().then(async values => {
            console.log(values)
            if (this.updateUser._id) values._id = this.updateUser._id;
            const res = await reqAddOrUpdateUser(values);
            console.log(res)
            if (res.status === 0) {
                message.success('操作成功')
                this.form.current.resetFields();
                this.setState({ showModal: false });
                // this.getUsers();
                const { users } = this.state;
                users.push(res.data);
                this.setState({
                    users: [...users]
                })
            }
        })
    }

    // 删除用户
    deleteUser = (id) => {
        confirm({
            title: '确定要删除此用户吗?',
            icon: <ExclamationCircleOutlined />,
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                const res = await reqDeleteUser(id);
                if (res.status !== 0) return message.error('删除失败');
                message.success('删除成功');
                this.getUsers();
            }
        })
       
    }

    render() {
        const { users, showModal, roles } = this.state;
        this.updateUser = this.updateUser ? this.updateUser : {};
        return (
            <Card
                title={this.getTitle()}
                style={{ height: '100%' }}
            >
                <Table
                    columns={this.columns}
                    dataSource={users}
                    bordered
                    rowKey='_id'
                    pagination={{ pageSize: PAGE_SIZE }}
                />
                <Modal
                    title={this.updateUser._id ? "修改用户" : "创建用户"}
                    visible={showModal}
                    onOk={this.createOrupdateUser}
                    onCancel={() => {
                        this.form.current.resetFields();
                        this.setState({ showModal: false });
                    }}
                >
                    <UserForm
                        roles={roles}
                        getForm={form => this.form = form}
                        key={this.updateUser._id || '000'}
                        user={this.updateUser} />
                </Modal>
            </Card>
        )
    }
}