import React, { Component } from 'react';

import {
    Card,
    Button
} from 'antd';

import { ArrowLeftOutlined } from '@ant-design/icons';

// 图片的基础地址
import {BASE_IMG_PATH} from '../../../utils/constants';

// api
import { reqCategoryName } from '../../../api';

export default class Detail extends Component {

    state = {
        cName1: '', // 一级分类
        cName2: '', // 二级分类
    }

    // 获取分类名
    getCategoryName = async () => {
        const { pCategoryId, categoryId } = this.props.location.state;
        // 是否有二级分类
        if (pCategoryId === '0') {
            const res = await reqCategoryName(categoryId);
            // console.log(res)
            this.setState({
                cName1: res.data.name
            })
        } else {
            const res = await Promise.all([reqCategoryName(pCategoryId), reqCategoryName(categoryId)]);
            // console.log(res)
            const cName1 = res[0].data.name;
            const cName2 = res[1].data.name;
            this.setState({cName1,cName2});
        }
    }

    componentDidMount () {
       this.getCategoryName()
    }

    render() {
        const { state } = this.props.location;
        const {cName1, cName2} = this.state;

        return (
            <Card title={
                <span>
                    <Button 
                        type="link" 
                        icon={<ArrowLeftOutlined />}
                        onClick={()=>{this.props.history.goBack()}}
                    ></Button>
                    商品详情
                </span>
            } className='product-detail'>
                <div className='detail-list-col'>
                    <h3>商品名称:</h3>
                    <span>{state.name}</span>
                </div>
                <div className='detail-list-col'>
                    <h3>商品描述:</h3>
                    <span>{state.desc}</span>
                </div>
                <div className='detail-list-col'>
                    <h3>商品价格:</h3>
                    <span>{state.price}</span>
                </div>
                <div className='detail-list-col'>
                    <h3>所属分类:</h3>
                    <span>{cName2 ? cName1 + ' > ' + cName2 : cName1}</span>
                </div>
                <div className='detail-list-col'>
                    <h3>商品图片:</h3>
                    <span className='product-img'>
                        {
                            state.imgs.map(img=>(
                                <img src={BASE_IMG_PATH + img} key={img} alt='img' />
                            ))
                        }
                    </span>
                </div>
                <div className='detail-list-col'>
                    <h3>商品详情:</h3>
                    <span>{state.detail}</span>
                </div>
            </Card>
        )
    }
}