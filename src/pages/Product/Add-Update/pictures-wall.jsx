/*
*	reac后台管理系统
*	pictures-wall.jsx
*	@author: mryyg
*	2020-04-05 14:36:31
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

//api删除图片
import {reqDeleteImg} from '../../../api';

// 图片上传组件
export default class PicturesWall extends Component {

    static propTypes = {
        imgs: PropTypes.array
    }

    constructor (props) {
        super(props);
        let fileList = [];
        // 修改是传入imgs
        const {imgs} = props;
        if(imgs && imgs.length > 0) {
            fileList = imgs.map((name,index) => ({
                uid: -index,
                name,
                status: 'done',
                url: 'http://localhost:5000/upload/' + name
            }))
        }
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: fileList,
        };
    }

    handleCancel = () => this.setState({ previewVisible: false });

    // 预览
    handlePreview = async file => {
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    // 上传、删除
    handleChange = async ({ file, fileList }) => {
        console.log(file)
        console.log(fileList)
        // 如果图片上传完成
        if(file.status === 'done') {
            const result = file.response;
            if(result.status !== 0) return message.error('图片上传失败');
            const {name, url} = result.data;
            file = fileList[fileList.length -1];
            file.name = name;
            file.url = url;
            message.success('图片上传成功')
            // 删除图片
        } else if(file.status === 'removed') {
            const res = await reqDeleteImg(file.name);
            console.log(res)
            if(res.status !== 0){
                message.error('删除失败')
            } else {
                message.success('删除成功') 
            }
        }
        this.setState({ fileList })
    };

    // 获取已上传图片
    getImgs = () => {
        return this.state.fileList.map(img => img.name)
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div >Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    action="/api/manage/img/upload"
                    listType="picture-card"
                    fileList={fileList}
                    accept="image/*"
                    name={'image'}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    // onRemove={(f)=>{}}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}