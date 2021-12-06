import {useEffect} from "react";

// 点击区域外hook
function useClickOutside(ref, handler) {
    useEffect(function () {
        // 监听器逻辑
        var listener = function (event) {
            // 根据是否在区域内 执行相应操作
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        // 给点击事件添加监听器
        document.addEventListener('click', listener);
        // useEffect删除事件监听
        return function () {
            document.removeEventListener('click', listener);
        };
    }, [ref, handler]);
}
export default useClickOutside;
