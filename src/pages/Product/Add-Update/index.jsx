import React, { Component } from 'react';

import {
    Card,
    Form,
    Input,
    Button,
    Cascader,
    message
} from 'antd';

import { ArrowLeftOutlined } from '@ant-design/icons';

import { reqCategory } from '../../../api';

const { TextArea } = Input;

export default class AddUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: []
        }

        // 点击更新时传入的商品信息
        this.product = this.props.location.state;
        console.log(this.product)
        this.isUpdate = !!this.product;
    }

    // 获取分类
    getCategory = async (parentId) => {
        const res = await reqCategory(parentId);
        if (res.status !== 0) return message.error('获取分类信息失败！');
        // 处理返回数据，生成级联配置结构
        if (parentId === '0') {
            this.initOptions(res.data)
        } else {
            return res.data;
        }
    }

    // 初始化级联选项
    initOptions = async (categorys) => {
        // 是新增还是修改
        if (this.isUpdate) {
            const { pCategoryId } = this.product;
            // 生成一及配置项
            const options = categorys.map((option) => (
                {
                    value: option._id,
                    label: option.name,
                    isLeaf: false,
                }
            ))
            // 获取二级分类并生成配置项
            const subCategorys = await this.getCategory(pCategoryId);
            const subOptions = subCategorys.map(option => ({
                value: option._id,
                label: option.name,
                isLeaf: true,
            }))
            // 合并配置项
            options.some(item => {
                if (item.value === pCategoryId) {
                    item.children = subOptions;
                    return true;
                }
                return false;
            })
            this.setState({
                options,
            })
        } else {
            // 生成一及配置项
            const options = categorys.map((option) => (
                {
                    value: option._id,
                    label: option.name,
                    isLeaf: false,
                }
            ))
            this.setState({
                options,
            })
        }

    }

    // 级联选择数据变化时触发
    onChange = () => {

    }

    // 加载二级选项
    loadData = async selectedOptions => {
        // console.log(selectedOptions)
        // 当前一级选项
        const targetOption = selectedOptions[0];
        targetOption.loading = true;

        // 二级分类
        const subCategorys = await this.getCategory(targetOption.value);
        targetOption.loading = false;

        // 合并选项
        if (subCategorys) {
            targetOption.children = subCategorys.map((option) => (
                {
                    value: option._id,
                    label: option.name,
                    isLeaf: true,
                }
            ));
        } else {
            targetOption.isLeaf = true;
        }

        this.setState({
            options: [...this.state.options]
        })
    }


    componentDidMount() {
        // 获取一级分类
        this.getCategory('0')
    }

    render() {
        // 初始化表单值
        let formInitialValues = {}
        if (this.isUpdate) {
            const { name, desc, price, categoryId, pCategoryId } = this.product;
            let categoryIds = []
            if (pCategoryId === '0') {
                categoryIds.push(categoryId);
            } else {
                categoryIds.push(pCategoryId);
                categoryIds.push(categoryId)
            }
            console.log(categoryIds)
            formInitialValues = {
                name,
                desc,
                price,
                categoryIds,
            }
        }

        // 表单布局
        const layout = {
            labelCol: {
                span: 2,
            },
            wrapperCol: {
                span: 8,
            },
        };

        // 卡片标题
        const title = (
            <div>
                <Button type='link' icon={<ArrowLeftOutlined />} onClick={() => { this.props.history.goBack() }}></Button>
                {this.isUpdate ? "修改商品" : '添加商品'}
            </div>
        )

        return (
            <Card
                title={title}
                style={{ height: '100%' }}
            >
                <Form {...layout} initialValues={formInitialValues}>
                    <Form.Item
                        label="商品名称："
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入商品名称!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="商品描述："
                        name="desc"
                        rules={[
                            {
                                required: true,
                                message: '请输入商品描述!',
                            },
                        ]}
                    >
                        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
                    </Form.Item>
                    <Form.Item
                        label="商品价格:"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: '请输入商品结价格!',
                            },
                            {
                                validator: (_, value) => {
                                    if (value < 0) {
                                        return Promise.reject('价格不能小于0');
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <Input type='number' addonAfter='元' />
                    </Form.Item>
                    <Form.Item
                        label="商品分类："
                        name='categoryIds'
                        rules={[
                            {
                                required: true,
                                message: '请指定商品分类!',
                            },
                        ]}
                    >
                        <Cascader
                            options={this.state.options}
                            loadData={this.loadData}
                            onChange={this.onChange}
                            placeholder='请指定商品分类'
                        />
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}