import React, {ChangeEvent, InputHTMLAttributes, ReactElement} from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames"
import Icon from "../Icon/icon";

export type InputSize = 'lg'|'sm'
// omit忽略接口中的值(值与原型中的类型冲突)
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>,"size">{
    disabled ?: boolean,
    size ?: InputSize,
    prepend ?: string|ReactElement,
    append ?: string|ReactElement,
    icon ?: IconProp,
    onChange ?: (e:ChangeEvent<HTMLInputElement>) => void

}
export const Input:React.FC<InputProps> = (props) => {
    const{
        size,disabled, append, prepend, children, icon,style, ...restProps
    } = props
 const classes = classNames('input-wrapper',{
     "is-disabled" : disabled,
     [`input-size-${size}`]: size,
     'input-group': prepend || append,
     'input-group-append': !!append,
     'input-group-prepend': !!prepend
 })
 const fixControlledValue = (value: any) => {
        if (typeof value === 'undefined' || value === null) {
            return ''
        }
        return value
    }
    if('value' in props) {
        delete restProps.defaultValue
        restProps.value = fixControlledValue(props.value)
    }
    return (
        <div className={classes} >
            {prepend && <div className="input-group-prepend">{prepend}</div>}
            {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
            <input
                className="input-inner"
                disabled={disabled}
                style={style}
                {...restProps}
            />
            {append && <div className="input-group-append">{append}</div>}
        </div>
    )
}

export default Input;
