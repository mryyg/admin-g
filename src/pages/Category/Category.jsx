/*
*	react后台管理系统
*	Category.jsx
*	@author: mryyg
*	2020-03-12 20:14:57
*/

import React, { Component } from 'react';

import { Card, Button, Table, message, Modal } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

// api
import { reqCategory, reqEditCategory, reqAddCategory } from '../../api/index';

// 添加/编辑组件
import Edit from './Edit';
import Add from './Add';

class Category extends Component {

    // table列配置项
    columns = [
        {
            title: '分类名称',
            dataIndex: 'name',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: "30%",
            render: (text, record) => (
                <div>
                    <Button type='link' onClick={() => this.showModal(record, '2')} >修改分类</Button>
                    {this.state.parentId === '0' && <Button type='link' onClick={() => { this.getSubCategory(record) }} >查看子分类</Button>}
                </div>
            )
        },
    ];

    state = {
        // 一级分类
        category: [],
        // 二级分类
        subCategory: [],
        // 父级id
        parentId: '0',
        // 父级分类名
        parentName: '',
        // 模态框控制
        modalId: '0',
    }

    // 显示编辑框
    showModal = (cur, modalId) => {
        // 存储当前操作分类
        this.curCategory = cur;
        this.setState({ modalId })
    }

    // 获取一级分类
    getCategory = async () => {
        const res = await reqCategory();
        if (res.status !== 0) return message.error('获取列表失败')
        this.setState({
            category: res.data
        })
    }

    // 获取二级分类
    getSubCategory = async (parentInfo) => {
        const { _id, name } = parentInfo;
        const res = await reqCategory(_id);
        if (res.status !== 0) return message.error('获取列表失败')
        this.setState({
            parentId: _id,
            parentName: name,
            subCategory: res.data
        })
    }

    // 修改分类名
    editCategory = async (categoryName) => {
        const { parentId } = this.state;
        const { _id } = this.curCategory;
        const res = await reqEditCategory(_id, categoryName);
        if (res.status !== 0) return message.error('修改失败');
        this.setState({ modalId: '0' });
        if (parentId === "0") {
            this.getCategory();
        } else {
            this.getSubCategory({_id: parentId})
        }
    }

    // 添加分类
    addCategory = async (parentId,categoryName) => {
        const res = await reqAddCategory(parentId,categoryName)
        console.log(res)
        if (res.status !== 0) return message.error('修改失败');
        this.setState({ modalId: '0' });
        if(this.state.parentId !== parentId) return;
        if (parentId === "0") {
            this.getCategory();
        } else {
            this.getSubCategory({_id: parentId})
        }
    }

    componentDidMount() {
        this.getCategory();
    }

    render() {
        const { category, subCategory, parentId, parentName, modalId } = this.state;
        // 节流阀
        let flag = true;
        return (
            <Card
                title={parentId === '0' ? "一级分类列表" : (
                    <span>
                        <Button type='link' onClick={() => this.setState({ parentId: '0' })} >一级分类列表</Button>
                >  {parentName}
                    </span>
                )}
                extra={
                    <Button type="primary" onClick={() => this.setState({ modalId: '1' })}>
                        <PlusOutlined />
                        添加
                    </Button>
                }
                style={{ width: " 100%" }}
            >
                <Table
                    dataSource={parentId === '0' ? category : subCategory}
                    rowKey='_id'
                    bordered
                    columns={this.columns}
                    pagination={{ pageSize: 5 }}
                ></Table>

                {/* 修改分类弹框 */}
                <Modal
                    title="修改分类"
                    visible={modalId === '2'}
                    onOk={() => {
                        flag && this.editForm.validateFields()
                            .then(values => {
                                this.editCategory(values.categoryName);
                            })
                            .catch(err => {
                                message.error(err.errorFields[0].errors)
                                // 节流
                                flag = false
                                setTimeout(() => {
                                    flag = true
                                }, 1000)
                            })
                    }}
                    onCancel={() => {
                        this.setState({ modalId: '0' });
                    }}
                >
                    <Edit
                        categoryName={this.curCategory ? this.curCategory.name : ''}
                        getForm={form => { this.editForm = form }}
                    />
                </Modal>

                {/* 添加分类弹框 */}
                <Modal
                    title="添加分类"
                    visible={modalId === '1'}
                    onOk={() => {
                        flag && this.addForm.current.validateFields()
                            .then(values => {
                                // console.log(values)
                                const {parentId,categoryName} = values;
                                this.addCategory(parentId,categoryName);
                                this.addForm.current.resetFields()
                            })
                            .catch(err => {
                                message.error(err.errorFields[0].errors)
                                flag = false
                                setTimeout(() => {
                                    flag = true
                                }, 1000)
                            })
                    }}
                    onCancel={() => {
                        this.setState({ modalId: '0' });
                        this.addForm.current.resetFields();
                    }}
                >
                    <Add category={category} parentId={parentId} getForm={form => {this.addForm = form}}/>
                </Modal>
            </Card>
        )
    }
}
export default Category;