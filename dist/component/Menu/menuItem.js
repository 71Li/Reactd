import React, {useContext} from "react";
import classNames from 'classnames';
import {MenuContext} from "./menu";

var MenuItem = function (props) {
    // 属性展开
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    // 引入上级组件的context,接受传递的数据,进行使用
    var context = useContext(MenuContext);
    // 添加组件样式,使用context传递的属性
    var classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });
    // 点击逻辑
    var handleClick = function () {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    return (React.createElement("li", { className: classes, style: style, onClick: handleClick }, children));
};
// 1. 限制children类型.(3)
// 1.1 子组件添加内置静态属性 帮助判断类型
MenuItem.displayName = 'MenuItem';
export default MenuItem;
