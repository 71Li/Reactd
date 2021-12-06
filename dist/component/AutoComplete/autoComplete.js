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
import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import Input from '../Input/input';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';

export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props
    // 定义inputValue状态,传给fetchSuggestions使用
    , ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    // 定义inputValue状态,传给fetchSuggestions使用
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    // 定义提示框状态
    var _b = useState([]), suggestions = _b[0], setSugestions = _b[1];
    // 2. 添加加载图标(4)
    // 2.1 定义加载图标的状态
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    // 7. 定义展示提示框的状态
    var _d = useState(false), showDropdown = _d[0], setShowDropdown = _d[1];
    // 4. 实现键盘事件支持(5)
    // 4.1 定义高亮条下标的状态，以添加样式
    var _e = useState(-1), highlightIndex = _e[0], setHighlightIndex = _e[1];
    // 5. 解决debounceValue因value改变而触发不必要的请求渲染问题-增加额外条件(4)->ref保存当前值的引用
    // 5.1 定义触发搜索引用
    var triggerSearch = useRef(false);
    // 6. 实现点击其他区域关闭提示框功能(3)-> ref操作dom
    // 6.1 定义节点引用
    var componentRef = useRef(null);
    // 6.3 调用点击区域外函数(自定义hook 分离于hooks文件夹)
    useClickOutside(componentRef, function () { setSugestions([]); });
    // 3. 使用函数防抖，控制输入框请求次数(2)
    // 3.1 定义防抖值(自定义防抖hook分离于hooks文件夹)
    var debouncedValue = useDebounce(inputValue, 400);
    // 3.2 防抖值与useEffect结合使用
    // 请求逻辑,使用函数防抖
    useEffect(function () {
        // 5.4 请求时 期望触发搜索
        if (debouncedValue && triggerSearch.current) {
            setSugestions([]);
            var results = fetchSuggestions(debouncedValue);
            // 判断返回结果类型
            if (results instanceof Promise) {
                // 2.2 异步请求时加载loading图标
                setLoading(true);
                results.then(function (data) {
                    // 2.3 加载完数据，关闭loading
                    setLoading(false);
                    setSugestions(data);
                    if (data.length > 0) {
                        setShowDropdown(true);
                    }
                });
            }
            else {
                setSugestions(results);
                // setShowDropdown(true)
                if (results.length > 0) {
                    setShowDropdown(true);
                }
            }
        }
        else {
            setShowDropdown(false);
        }
        // 4.5 每次键入后重置高亮条
        setHighlightIndex(-1);
    }, [debouncedValue, fetchSuggestions]);
    // 4.2 高亮条下标的移动逻辑
    var highlight = function (index) {
        // 高亮条在最上方继续向上移动-保持在最上方
        if (index < 0)
            index = 0;
        // 高亮在最下方继续向下移动-保持在最下方
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        // 设置高亮条下标
        setHighlightIndex(index);
    };
    // 4.3 添加键盘事件
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13:
                // 回车键选择
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 38:
                // 向上箭头移动
                highlight(highlightIndex - 1);
                break;
            case 40:
                // 向下箭头移动
                highlight(highlightIndex + 1);
                break;
            case 27:
                // ESC键
                setShowDropdown(false);
                break;
            default:
                break;
        }
    };
    // input值变化逻辑
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        // 5.2 input值变化时 期望被触发
        triggerSearch.current = true;
    };
    // 选中提示框中的值，填充到输入框中，并且隐藏提示框，触发select方法
    var handleSelect = function (item) {
        setInputValue(item.value);
        setShowDropdown(false);
        if (onSelect) {
            onSelect(item);
        }
        // 5.3 选中时不期望再触发搜索
        triggerSearch.current = false;
    };
    // 1.3 自定义模板渲染逻辑
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    // 生成提示数据
    var generateDropdown = function () {
        return (React.createElement(Transition, { in: showDropdown || loading, animation: "zoom-in-top", timeout: 300, onExited: function () { setSugestions([]); } },
            React.createElement("ul", { className: "suggestion-list" },
                loading &&
                    React.createElement("div", { className: "suggstions-loading-icon" },
                        React.createElement(Icon, { icon: "spinner", spin: true })),
                suggestions.map(function (item, index) {
                    // 4.4 添加高亮条样式
                    var cnames = classNames('suggestion-item', {
                        'is-active': index === highlightIndex
                    });
                    return (
                    //  4.5 使用样高亮条式
                    React.createElement("li", { key: index, className: cnames, onClick: function () { return handleSelect(item); } }, renderTemplate(item)));
                }))));
    };
    return (
    // 6.2 在根节点使用节点引用
    React.createElement("div", { className: "auto-complete", ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)),
        generateDropdown()));
};
export default AutoComplete;
