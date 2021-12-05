import {RefObject, useEffect} from "react";

// 点击区域外hook
function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    // 监听器逻辑
    const listener = (event: MouseEvent) => {
      // 根据是否在区域内 执行相应操作
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return
      }
      handler(event)
    }
    // 给点击事件添加监听器
    document.addEventListener('click', listener)
    // useEffect删除事件监听
    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref, handler])
}

export default useClickOutside
