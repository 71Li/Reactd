import React,{FC,ButtonHTMLAttributes,AnchorHTMLAttributes}from "react";
import classNames from 'classnames'

export const enum ButtonSize{
    Large = 'lg',
    Small = 'sm',
    Default = 'default'
}

export const enum ButtonType{

    Primary = 'primary',
    Danger = 'danger',
    Link = 'link',
    Default = 'default',
    Success = 'success'
}

interface BaseButtonProps{
    className ?: string;
    /** 设置button禁用 */
    disabled ?: boolean;
    size ?: ButtonSize;
    btnType ?: ButtonType;
    children : React.ReactNode;
    href ?: string
}
type nativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type anchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type buttonProps = Partial<nativeButtonProps & anchorButtonProps>

export const Button: FC<buttonProps>= (props) => {
    const {
        btnType,
        disabled,
        className,
        size,
        children,
        href,
        ...restProps
    }= props

    // btn, btn-lg, btn-primary
    const classes = classNames('btn',className,{
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType.Link) && disabled
    })


    if (btnType === ButtonType.Link && href ) {
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

Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default,
    size: ButtonSize.Default
}

export default Button;
