import React, {ChangeEvent, FC, InputHTMLAttributes, ReactElement} from 'react'
import classNames from 'classnames'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'

type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size' > {
  /**是否禁用input */
  disabled?: boolean;
  /** input大小 */
  size?: InputSize;
  /** 添加右侧提示图标 */
  icon?: IconProp;
  /** 添加前缀  */
  prepend?: string | ReactElement;
  /** 添加后缀 */
  append?: string | ReactElement;
  /** input值改变触发的回调*/
  onChange? : (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input输入框 通过鼠标或键盘输入内容
 */
export const Input: FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...restProps
  } = props
  const cnames = classNames('input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })

  // 对受控组件的缺点进行修补
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  // 受控组件value与非受控组件defaultValue的使用优先级
  if('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }
  return (
    <div className={cnames} style={style}>
      {prepend && <div className="input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
      <input
        className="input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="input-group-append">{append}</div>}
    </div>
  )
}

export default Input;
