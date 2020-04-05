/*
*	reac后台管理系统
*	index.jsx
*	@author: mryyg
*	2020-03-13 20:15:22
*/

import React, { useEffect } from 'react';

import { Form, Input } from 'antd';

import PropTypes from 'prop-types';

export default function Edit(props) {

    const { categoryName, getForm } = props;

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            categoryName,
        })
    }, [categoryName])

    useEffect(() => {
        getForm(form);
    }, [])

    return (

        <Form
            form={form}
            name="edit-form"
            initialValues={{ categoryName }}
        >
            <Form.Item
                name="categoryName"
                rules={[
                    {
                        required: true,
                        message: '请输入分类名!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </Form>

    )
}

Edit.propTypes = {
    categoryName: PropTypes.string.isRequired,
    getForm: PropTypes.func.isRequired,
}