import React, { Component } from 'react';

import { Form, Input, Select } from 'antd';

import PropTypes from 'prop-types'

const { Option } = Select;

export default class UserForm extends Component {

    static propTypes = {
        getForm: PropTypes.func.isRequired,
        user: PropTypes.object,
        roles: PropTypes.array,
    }

    formRef = React.createRef();

    layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 16,
        },
    };

    componentDidMount() {
        this.props.getForm(this.formRef)
    }
    // componentWillReceiveProps (nextProps) {
    //     if(nextProps.user !== this.props.user) {

    //     }
    // }

    render() {
        const { roles, user } = this.props;
        // console.log(user)
        return (
            <Form
                {...this.layout}
                ref={this.formRef}
                name="userForm"
                initialValues={user}
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                {
                    !user._id && (<Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>) 
                }

                <Form.Item
                    label="电话"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="角色"
                    name="role_id"
                    rules={[
                        {
                            required: true,
                            message: 'Please select role!',
                        },
                    ]}
                >
                    <Select placeholder='请选择角色'>
                        {
                            roles.map(role => <Option value={role._id} key={role._id}>{role.name}</Option>)
                        }

                    </Select>
                </Form.Item>
            </Form>
        )
    }
}