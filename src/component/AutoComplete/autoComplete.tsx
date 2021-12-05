import React, {ChangeEvent, FC, KeyboardEvent, ReactElement, useEffect, useRef, useState} from 'react'
import classNames from 'classnames'
import Input, {InputProps} from '../Input/input'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

// 1. 展示自定义模板-提示数据的格式(4)
// 1.1 定义更加丰富的数据类型接口
interface DataSourceObject {
  value: string;
}
// 1.2 添加泛型，定义混合的复杂数据类型
export type DataSourceType<T = {}> = T & DataSourceObject
// 定义自动补全属性接口，继承自input组件属性
// omit<,>忽略同名属性的差异
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**  请求方案 */
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /**  选中回调函数 */
  onSelect ?: (item: DataSourceType) => void;
  /** 渲染候选方法 */
  renderOption ?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props
  // 定义inputValue状态,传给fetchSuggestions使用
  const [ inputValue, setInputValue ] = useState(value as string)
  // 定义提示框状态
  const [ suggestions, setSugestions ] = useState<DataSourceType[]>([])
  // 2. 添加加载图标(4)
  // 2.1 定义加载图标的状态
  const [ loading, setLoading ] = useState(false)
  // 7. 定义展示提示框的状态
  const [ showDropdown, setShowDropdown] = useState(false)
  // 4. 实现键盘事件支持(5)
  // 4.1 定义高亮条下标的状态，以添加样式
  const [ highlightIndex, setHighlightIndex] = useState(-1)
  // 5. 解决debounceValue因value改变而触发不必要的请求渲染问题-增加额外条件(4)->ref保存当前值的引用
  // 5.1 定义触发搜索引用
  const triggerSearch = useRef(false)
  // 6. 实现点击其他区域关闭提示框功能(3)-> ref操作dom
  // 6.1 定义节点引用
  const componentRef = useRef<HTMLDivElement>(null)
  // 6.3 调用点击区域外函数(自定义hook 分离于hooks文件夹)
  useClickOutside(componentRef, () => { setSugestions([])})

  // 3. 使用函数防抖，控制输入框请求次数(2)
  // 3.1 定义防抖值(自定义防抖hook分离于hooks文件夹)
  const debouncedValue = useDebounce(inputValue, 400)

  // 3.2 防抖值与useEffect结合使用
  // 请求逻辑,使用函数防抖
  useEffect(() => {
    // 5.4 请求时 期望触发搜索
    if (debouncedValue && triggerSearch.current) {
      setSugestions([])
      const results = fetchSuggestions(debouncedValue)
      // 判断返回结果类型
      if (results instanceof Promise) {
        // 2.2 异步请求时加载loading图标
        setLoading(true)
        results.then(data => {
          // 2.3 加载完数据，关闭loading
          setLoading(false)
          setSugestions(data)
          if (data.length > 0) {
            setShowDropdown(true)
          }
        })
      } else {
        setSugestions(results)
        // setShowDropdown(true)
        if (results.length > 0) {
          setShowDropdown(true)
        }
      }
    } else {
      setShowDropdown(false)
    }
    // 4.5 每次键入后重置高亮条
    setHighlightIndex(-1)
  }, [debouncedValue, fetchSuggestions])

  // 4.2 高亮条下标的移动逻辑
  const highlight = (index: number) => {
    // 高亮条在最上方继续向上移动-保持在最上方
    if (index < 0) index = 0
    // 高亮在最下方继续向下移动-保持在最下方
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    // 设置高亮条下标
    setHighlightIndex(index)
  }
  // 4.3 添加键盘事件
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
      case 13:
        // 回车键选择
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 38:
        // 向上箭头移动
        highlight(highlightIndex - 1)
        break
      case 40:
        // 向下箭头移动
        highlight(highlightIndex + 1)
        break
      case 27:
        // ESC键
        setShowDropdown(false)
        break
      default:
        break
    }
  }
  // input值变化逻辑
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    // 5.2 input值变化时 期望被触发
    triggerSearch.current = true
  }
  // 选中提示框中的值，填充到输入框中，并且隐藏提示框，触发select方法
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setShowDropdown(false)
    if (onSelect) {
      onSelect(item)
    }
    // 5.3 选中时不期望再触发搜索
    triggerSearch.current = false
  }
  // 1.3 自定义模板渲染逻辑
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  // 生成提示数据
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {setSugestions([])}}
      >
        {/* 2.4 使用loading图标 */}
        <ul className="suggestion-list">
          { loading &&
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin/>
            </div>
          }
          {/* 遍历提示框*/}
          {suggestions.map((item, index) => {
            // 4.4 添加高亮条样式
            const cnames = classNames('suggestion-item', {
              'is-active': index === highlightIndex
            })
            return (
              //  4.5 使用样高亮条式
              <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                {/* 1.4 调用自定义渲染模板方法 */}
                {renderTemplate(item)}
              </li>
            )
          })}
        </ul>
      </Transition>
    )
  }
  return (
      // 6.2 在根节点使用节点引用
      <div className="auto-complete" ref={componentRef}>
        <Input
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          {...restProps}
        />
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete;

