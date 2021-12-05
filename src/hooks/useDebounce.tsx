import {useEffect, useState} from 'react'

// 自定义hook实现函数防抖
function useDebounce(value: any, delay = 300) {
  // 定义防抖值的状态
  const [debouncedValue, setDebouncedValue] = useState(value)
  // useEffect延时更新防抖值(异步执行)
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    // 清除副作用
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}

export default useDebounce;
