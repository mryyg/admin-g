/*
*	reac后台管理系统
*	index.jsx
*	@author: mryyg
*	2020-03-14 20:32:39
*/

import React from 'react';

import { Form, Input, Select } from 'antd';

import PropTypes from 'prop-types';

export default class Add extends React.Component {

    formRef = React.createRef();

    static propTypes = {
        category: PropTypes.array.isRequired,
        parentId: PropTypes.string.isRequired,
        getForm: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getForm(this.formRef)
    }

    componentDidUpdate(preProps,PreState) {
        if(preProps.parentId !== this.props.parentId){
            this.formRef.current.resetFields()
        }
    }

    render() {
        const { Option } = Select;
        const { category, parentId } = this.props;
        return (
            <Form
                ref={this.formRef}
                name="add-form"
                initialValues={{
                    parentId,
                    categoryName:''
                }}
            >
                <Form.Item
                    name='parentId'
                    rules={[
                        {
                            required: true,
                            message: '请选择分类级别!',
                        },
                    ]}
                >
                    <Select>
                        <Option value='0' key='0'>一级分类</Option>
                        {category.map(item => {
                            return <Option value={item._id} key={item._id}>{item.name}</Option>
                        })}
                    </Select>
                </Form.Item>
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
}