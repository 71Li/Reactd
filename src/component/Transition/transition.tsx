import React from 'react'
import {CSSTransition} from 'react-transition-group'
import {CSSTransitionProps} from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

// 使用类型联合描述组件属性
type TransitionProps = CSSTransitionProps & {
  /** 动画类型 */
  animation ?: AnimationName,
  /** 是否包裹 */
  wrapper ?: boolean,
}

const Transition: React.FC<TransitionProps> = (props) => {
  const {
    animation,
    wrapper,
    children,
    className,
    ...restProps
  } = props

  return (
    <CSSTransition
      className = { className ? className : animation}
      {...restProps}
    >
      {/* 套一层div,防止多个transition发生覆盖*/}
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}
Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
}

export default Transition
