import React, {createContext, useState} from "react";
import classNames from 'classnames';

export var MenuContext = createContext({ index: "0" });
// 函数主体
var Menu = function (props) {
    // 将属性展开
    var defaultIndex = props.defaultIndex, className = props.className, style = props.style, mode = props.mode, children = props.children, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus;
    // 定义激活下标
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    // 为组件添加样式
    var classes = classNames('menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    });
    // 点击操作:激活当前下标项,触发回调
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    // 定义传递的context数据: 判断当前项是否激活、触发回调函数
    var passedContext = {
        index: currentActive ? currentActive : "0",
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus
    };
    // 1.2 添加循环渲染子组件的方法
    var renderChildren = function () {
        // React.Children.map()循环不透明数据结构children，将其直接返回
        return React.Children.map(children, function (child, index) {
            // 为child添加类型断言 将其转为FC实例,拿到子组件的displayName,进行displayName逻辑渲染
            var childElem = child;
            var displayName = childElem.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // 2. 实现子组件自动添加index (2)
                // 2.1 子组件index属性设为可选属性,增加子组件handleClick判断条件
                // 2.2 return调用React.cloneElement()克隆子组件,并将index属性加入克隆
                return React.cloneElement(childElem, { index: index.toString() });
            }
            else {
                console.error('Warning: Menu has a child which is not a MenuItem component.');
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": 'test-menu' },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
// 添加默认值
Menu.defaultProps = {
    defaultIndex: "0",
    mode: "horizontal",
    defaultOpenSubMenus: []
};
export default Menu;
