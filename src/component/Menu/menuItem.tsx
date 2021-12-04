import React, {useContext} from "react";
import classNames from 'classnames'
import {MenuContext} from "./menu";

// 子菜单属性的接口
export interface MenuItemProps{
    /** 自定义样式 */
    index ?: string,
    /** 菜单项禁用 */
    disabled ?: boolean,
    /** 自定义样式 */
    className ?: string,
    /** 自定义style */
    style ?: React.CSSProperties

}
const MenuItem :React.FC<MenuItemProps> = (props) => {
    // 属性展开
    const {index, disabled, className, style, children} = props
    // 引入上级组件的context,接受传递的数据,进行使用
    const context = useContext(MenuContext)
    // 添加组件样式,使用context传递的属性
    const classes = classNames('menu-item',className,{
        'is-disabled' : disabled,
        'is-active': context.index === index
    })
    // 点击逻辑
    const handleClick = ()=>{
        if(context.onSelect && !disabled && (typeof index === 'string')){
            context.onSelect(index)
        }
    }

    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}
// 1. 限制children类型.(3)
// 1.1 子组件添加内置静态属性 帮助判断类型
MenuItem.displayName = 'MenuItem'

export default MenuItem
