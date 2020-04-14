/*
*	reac后台管理系统
*	rich-text-editor.jsx
*	@author: mryyg
*	2020-04-08 15:30:54
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';

// react-draft-wysiwyg富文本编辑器相关依赖
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// 富文本编辑器
export default class RichTextEditor extends Component {

    static propTypes = {
        detail: PropTypes.string
    }

    constructor(props) {
        super(props);
        const html = props.detail;
        let editorState;
        if (html) {
            const contentBlock = htmlToDraft(html);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            editorState = EditorState.createWithContent(contentState);
        } else {
            editorState = EditorState.createEmpty()
        }

        this.state = {
            editorState,
        }
    }

    // 获取富文本输入数据
    getDetail = () => {
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }

    // 插入图片
    uploadImageCallBack(file) {
        return new Promise(
          (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/manage/img/upload');
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
              const response = JSON.parse(xhr.responseText);
              console.log(response)
              resolve(response);
            });
            xhr.addEventListener('error', () => {
              const error = JSON.parse(xhr.responseText);
              reject(error);
            });
          }
        );
      }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state;
        return (
            <Editor
                editorState={editorState}
                editorStyle={{ border: "1px solid #ddd", minHeight: '200px' }}
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                    image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                }}
            />
        );
    }
}