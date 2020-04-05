/*
 *	reac后台管理系统
 *	Login.jsx
 *	@author: mryyg
 *	2020-03-06 19:41:53
 */

import React from "react";
import { Redirect } from 'react-router-dom';

// 引入antd组件
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

// 引入样式
import "./login.less";

// 引入图片
import logo from "../../assets/images/logo.jpg";

// api
import { reqLogin } from "../../api";

// 用于获取和操作登录信息
import memoryUtils from '../../utils/memoryUtils';
import storageUtil from '../../utils/storageUtils';

const Login = props => {

    // 自动登录
    if (memoryUtils.user && memoryUtils.user._id) return <Redirect to='/' />;

    // 登录
    const onFinish = async ({ username, password }) => {
        let res = await reqLogin(username, password);
        if (res.status === 1) return message.error(res.msg);
        const user = res.data;
        // 保存登录信息
        memoryUtils.user = user;
        storageUtil.saveUser(user);
        props.history.replace("/");
    };

    return (
        <div className="login">
            <header className="login_header">
                <img src={logo} alt="hello" className="logo" />
                <h3>myAdmin</h3>
            </header>
            <section className="login_content">
                <h3>用户登录</h3>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        validateFirst
                        rules={[
                            {
                                required: true,
                                message: "Please input your Username!"
                            },
                            {
                                min: 3,
                                message: "用户名最小字符长度为3!"
                            },
                            {
                                max: 12,
                                message: "用户名最大字符长度为12!"
                            },
                            {
                                pattern: /^[a-zA-z]+[a-zA-Z0-9_]+$/,
                                message: "用户名必须字母开头，且只能包含字母数字和下划线！"
                            }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                            className="login_form_input"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!"
                            }
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            className="login_form_input"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            登录
            </Button>
                    </Form.Item>
                </Form>
            </section>
        </div>
    );
};

export default Login;
