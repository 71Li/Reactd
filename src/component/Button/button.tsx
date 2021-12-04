import React, {AnchorHTMLAttributes, ButtonHTMLAttributes, FC} from "react";
import classNames from "classnames";

// 使用字符串字面量类型约束取值只能是其中之一
type ButtonSize = 'lg'|'sm'|'default';
type ButtonType = 'primary'|'danger'|'link'|'default'|'success'
// 使用接口描述组件属性
interface BaseButtonProps{
    /** 设置button禁用 */
    disabled ?: boolean;
    /** 设置button大小 */
    size ?: ButtonSize;
    /** 设置button类型 */
    btnType ?: ButtonType;
    /** 设置button链接地址 */
    href ?: string;
    /** 设置用户自定义classname */
    className ?: string;
    children : React.ReactNode;
}
// 添加类型别名,使用交叉类型&获得button/链接的本身属性+组件属性
// 使用partial<>将两类button属性设为可选属性
type nativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type anchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type buttonProps = Partial<nativeButtonProps & anchorButtonProps>


export const Button: FC<buttonProps>= (props) => {
    // 将属性展开
    const {
        btnType,
        size,
        disabled,
        className,
        children,
        href,
        ...restProps
    }= props

    // 为不同button快捷添加样式
    const classes = classNames('btn',className,{
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === "link") && disabled //a本身不含disabled属性，在classes中为其添加
    })

    //根据不同类型button去渲染
    if (btnType === "link" && href ) {
        return (
            <a
                className={classes}
                href={href}
                {...restProps}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}
// 添加button默认值
Button.defaultProps = {
    disabled: false,
    btnType: "default",
    size: "default"
}

export default Button;
