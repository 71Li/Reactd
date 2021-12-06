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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import classNames from "classnames";

export var Button = function (props) {
    var _a;
    // 将属性展开
    var btnType = props.btnType, size = props.size, disabled = props.disabled, className = props.className, children = props.children, href = props.href, restProps = __rest(props
    // 为不同button快捷添加样式
    , ["btnType", "size", "disabled", "className", "children", "href"]);
    // 为不同button快捷添加样式
    var classes = classNames('btn', className, (_a = {},
        _a["btn-" + btnType] = btnType,
        _a["btn-" + size] = size,
        _a['disabled'] = (btnType === "link") && disabled //a本身不含disabled属性，在classes中为其添加
    ,
        _a));
    //根据不同类型button去渲染
    if (btnType === "link" && href) {
        return (React.createElement("a", __assign({ className: classes, href: href }, restProps), children));
    }
    else {
        return (React.createElement("button", __assign({ className: classes, disabled: disabled }, restProps), children));
    }
};
// 添加button默认值
Button.defaultProps = {
    disabled: false,
    btnType: "default",
    size: "default"
};
export default Button;
