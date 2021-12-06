import React, {useState} from 'react';
import classNames from 'classnames';

export var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    // 是否完成拖拽状态
    var _a = useState(false), dragOver = _a[0], setDragOver = _a[1];
    // 添加拖拽激活样式
    var klass = classNames('uploader-dragger', {
        'is-dragover': dragOver
    });
    // 放置文件逻辑
    var handleDrop = function (e) {
        e.preventDefault();
        setDragOver(false);
        onFile(e.dataTransfer.files);
    };
    // 拖拽逻辑
    var handleDrag = function (e, over) {
        e.preventDefault();
        setDragOver(over);
    };
    return (React.createElement("div", { className: klass, onDragOver: function (e) { handleDrag(e, true); }, onDragLeave: function (e) { handleDrag(e, false); }, onDrop: handleDrop }, children));
};
export default Dragger;
