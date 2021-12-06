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
import React, {useContext, useState} from "react";
import classNames from 'classnames';
import {MenuContext} from './menu';
import Icon from "../Icon/icon";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import Transition from "../Transition/transition";

var SubMenu = function (_a) {
    var index = _a.index, title = _a.title, className = _a.className, children = _a.children;
    // 拿到父组件context，添加样式
    var context = useContext(MenuContext);
    // 4. 纵向菜单的默认展开功能
    var openSubMenus = context.defaultOpenSubMenus;
    var isOpened = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false;
    var _b = useState(isOpened), menuOpen = _b[0], setOpen = _b[1];
    // 添加样式
    var classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    });
    // 3. 菜单不同模式下展开-事件分类传入(3)
    // 3.1.1 点击展开逻辑
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    // 3.1.2 悬浮展开逻辑
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    // 3.2 创建事件对象：点击事件对象用于纵向模式，悬浮事件对象用于横向模式
    var clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    var hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); }
    } : {};
    // 1.2 添加循环渲染子组件方法
    var renderChilren = function () {
        // 为渲染子组件添加样式
        var subMenuClasses = classNames('submenu', {
            'menu-opened': menuOpen
        });
        // 1.2.1 定义循环的子组件
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElem = child;
            var displayName = childElem.type.displayName;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElem, { index: index + "-" + i });
            }
            else {
                console.error('Warning: SubMenu has a child which is not a MenuItem component.');
            }
        });
        // 1.2.2 渲染由动画组件包裹的循环子组件
        return (React.createElement(Transition, { in: menuOpen, timeout: 300, classNames: 'submenu', animation: "zoom-in-bottom", wrapper: true },
            React.createElement("ul", { className: subMenuClasses }, childrenComponent)));
    };
    return (
    // 3.3 事件对象使用：点击事件对象放title上，hover事件对象放最外层元素上
    React.createElement("li", __assign({ key: index, className: classes }, hoverEvents),
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvents),
            title,
            React.createElement(Icon, { icon: faAngleDown, theme: "dark", className: 'arrow-icon' })),
        renderChilren()));
};
// 1. 限制children类型.(3)
// 1.1 子组件添加内置静态属性 帮助判断类型
SubMenu.displayName = 'SubMenu';
export default SubMenu;
