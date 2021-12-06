var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, {useRef, useState} from 'react';
import axios from 'axios';
import UploadList from './uploadList';
import Dragger from './dragger';

export var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, name = props.name, headers = props.headers, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag;
    // ref拿到file的dom节点
    var fileInput = useRef(null);
    // 1.2 定义上传文件列表状态
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    // 1.3 定义更新文件状态函数
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    // 覆盖更新的文件的某值
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    // 点击区域逻辑 触发文件点击操作
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
        console.log("click");
    };
    // 文件变化逻辑
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        // 进行文件上传过程
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    // 2. 上传文件列表的展示(2)
    // 2.1 使用文件列表组件<UploadList>
    // 2.2 定义文件撤销逻辑
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    // 1.4 文件上传过程
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                // 判断result类型：promise类型和普通文件类型
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    // 1.5 具体的文件上传请求
    var post = function (file) {
        //  在文件上传开始 创建文件对象实例,更新文件列表
        var _file = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };
        // 异步更新文件列表-传入函数
        setFileList(function (prevList) {
            return __spreadArrays([_file], prevList);
        });
        // 创建表格数据，追加文件
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) { // 追加自定义数据
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        // 发送post请求
        // 1.6 在上传中，成功失败回调时调用文件状态更新函数
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            // 上传进度
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
            //  post成功时的回调
        }).then(function (resp) {
            updateFileList(_file, { status: 'success', response: resp.data });
            if (onSuccess) {
                onSuccess(resp.data, file);
            }
            if (onChange) {
                onChange(file);
            }
            //   post失败时的回调
        }).catch(function (err) {
            updateFileList(_file, { status: 'error', error: err });
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
        });
    };
    return (React.createElement("div", { className: "upload-component" },
        React.createElement("div", { className: "upload-input", style: { display: 'inline-block' }, onClick: handleClick }, drag ?
            React.createElement(Dragger, { onFile: function (files) { uploadFiles(files); } }, children)
            : children),
        React.createElement("input", { className: "file-input", style: { display: 'none' }, ref: fileInput, onChange: handleFileChange, type: "file", accept: accept, multiple: multiple }),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    name: 'file'
};
export default Upload;
