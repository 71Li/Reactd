import {useEffect, useState} from 'react';

// 自定义hook实现函数防抖
function useDebounce(value, delay) {
    if (delay === void 0) { delay = 300; }
    // 定义防抖值的状态
    var _a = useState(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    // useEffect延时更新防抖值(异步执行)
    useEffect(function () {
        var handler = window.setTimeout(function () {
            setDebouncedValue(value);
        }, delay);
        // 清除副作用
        return function () {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}
export default useDebounce;
