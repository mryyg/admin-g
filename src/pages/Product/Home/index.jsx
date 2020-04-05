/*
*	react后台管理系统
*	index.jsx
*	@author: mryyg
*	2020-03-28 20:09:27
*/

import React, { Component } from 'react';

import {
    Card,
    Table,
    Select,
    Input,
    Button,
    message
} from 'antd';

// api
import { reqProduct, reqSearch, reqUpdateStatus } from '../../../api/index';

import { PAGE_SIZE } from '../../../utils/constants';

const { Option } = Select;

export default class Home extends Component {

    state = {
        // 商品列表
        list: [],
        // 商品总数
        total: '',
        // 搜索关键字
        searchText: '',
        // 搜索类型
        searchType: 'productName'
    }

    // 表格列配置项
    columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
            width: '15%',
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
            width: '40%',
        },
        {
            title: '价格',
            dataIndex: 'price',
            width: '15%',
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: '15%',
            render: (status, record) => {
                const statusText = status === 1 ? '在售' : '已下架';
                const btnText = status === 1 ? '下架' : '上架';
                const newStatus = status === 1 ? 2 : 1;
                return (
                    <span>
                        <span> {statusText} </span>
                        <Button
                            type='primary'
                            size='small'
                            onClick={() => { this.updateStatus(record._id, newStatus) }}
                        > {btnText}</Button>
                    </span>
                )
            }
        },
        {
            title: '操作',
            width: '15%',
            render: (text, record) => (
                <span>
                    <Button
                        size='small'
                        style={{ marginRight: '5px' }}
                        onClick={() => { this.props.history.push('/product/detail', record) }}
                    >详情</Button>
                    <Button size='small' onClick={() => {this.props.history.push('/product/addUpdate', record)}}>修改</Button>
                </span>
            ),
        },
    ]

    componentDidMount() {
        this.getProduct(1)
    }

    // 获取商品列表
    getProduct = async pageNum => {
        this.pageNum = pageNum;
        let res;
        const { searchText, searchType } = this.state;
        if (searchText !== '') { // 搜索商品
            res = await reqSearch(pageNum, PAGE_SIZE, searchType, searchText)
        } else { // 所有商品
            res = await reqProduct(pageNum, PAGE_SIZE)
        }
        if (res.status !== 0) return message.error('获取数据失败！');
        const { total, list } = res.data;
        this.setState({
            list,
            total
        })
    }

    // 上架/下架商品
    updateStatus = async (productId, status) => {
        const res = await reqUpdateStatus(productId, status);
        console.log(res)
        if (res.status !== 0) return message.error('修改失败！')

        this.getProduct(this.pageNum || 1);
    }

    render() {
        const { list, total, searchType, searchText } = this.state;

        // 头部搜索栏
        const title = (
            <div>
                <Select
                    value={searchType}
                    onChange={value => {
                        this.setState({
                            searchType: value
                        })
                    }}
                >
                    <Option value='productName'>根据名称搜索</Option>
                    <Option value='productDesc'>根据描述搜索</Option>
                </Select>
                <Input
                    style={{ width: '200px', margin: '0 10px' }}
                    placeholder='关键字'
                    value={searchText}
                    onChange={(e) => {
                        this.setState({
                            searchText: e.target.value
                        })
                    }}
                />
                <Button type='primary' onClick={() => { this.getProduct(1) }}>搜索</Button>
            </div>
        )

        return (

            <Card
                title={title}
                extra={<Button type='primary' onClick={() => { this.props.history.push('/product/addUpdate') }}>添加商品</Button>}
                style={{ height: '100%' }}
            >
                <Table
                    columns={this.columns}
                    dataSource={list}
                    bordered
                    rowKey='_id'
                    pagination={{ pageSize: PAGE_SIZE, total, onChange: this.getProduct }}
                />
            </Card>

        )
    }
}