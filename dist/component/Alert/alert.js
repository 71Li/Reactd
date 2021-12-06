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
import React, {useState} from "react";
import classNames from 'classnames';

var Alert = function (props) {
    var _a;
    var _b = useState(false), altElem = _b[0], setAltElem = _b[1];
    var altType = props.altType, message = props.message, show = props.show, className = props.className, children = props.children, restProps = __rest(props, ["altType", "message", "show", "className", "children"]);
    var classes = classNames('alert', className, (_a = {},
        _a["alt-" + altType] = altType,
        _a));
    var altShow = function () {
        setAltElem(true);
    };
    return (React.createElement("div", __assign({ className: classes }, restProps),
        React.createElement("div", null,
            React.createElement("span", { className: 'alt-message' }, message),
            React.createElement("span", { className: 'alt-desc' }, children)),
        show && React.createElement("span", { className: 'alt-cancel', onClick: altShow }, "x")));
};
Alert.defaultProps = {
    altType: "info" /* Info */,
    message: '标题',
    show: true
};
export default Alert;
