import React, {useContext, useState} from "react";
import classNames from 'classnames'
import {MenuContext} from './menu'
import {MenuItemProps} from "./menuItem";
import Icon from "../Icon/icon";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import Transition from "../Transition/transition";

// 下拉菜单接口
export interface SubMenuProps {
    /** 下拉菜单下标 */
    index ?: string;
    /** 下拉菜单标题 */
    title : string;
    /** 下拉菜单自定义样式 */
    className ?: string;
}


const SubMenu:React.FC<SubMenuProps>= ({index, title, className, children}) => {
    // 拿到父组件context，添加样式
    const context = useContext(MenuContext)
    // 4. 纵向菜单的默认展开功能
    const openSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpened = (index && context.mode === 'vertical') ? openSubMenus.includes(index):false
    const [menuOpen, setOpen] = useState(isOpened)
    // 添加样式
    const classes = classNames('menu-item submenu-item', className,{
        'is-active' : context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    })
    // 3. 菜单不同模式下展开-事件分类传入(3)
    // 3.1.1 点击展开逻辑
    const handleClick = (e:React.MouseEvent)=>{
        e.preventDefault()
        setOpen(!menuOpen)
    }
    // 3.1.2 悬浮展开逻辑
    let timer:any
    const handleMouse = (e:React.MouseEvent, toggle :boolean)=>{
        clearTimeout(timer);
        e.preventDefault()
        timer = setTimeout(()=>{
            setOpen(toggle)
        },300)
    }
    // 3.2 创建事件对象：点击事件对象用于纵向模式，悬浮事件对象用于横向模式
    const clickEvents = context.mode === 'vertical' ?{
        onClick: handleClick
    }: {}
    const hoverEvents = context.mode !== 'vertical' ?{
        onMouseEnter: (e:React.MouseEvent)=>{handleMouse(e,true)},
        onMouseLeave: (e:React.MouseEvent)=>{handleMouse(e,false)}
    }: {}
    // 1.2 添加循环渲染子组件方法
    const renderChilren = ()=>{
        // 为渲染子组件添加样式
        const subMenuClasses = classNames('submenu',{
            'menu-opened' : menuOpen
        })
        // 1.2.1 定义循环的子组件
        const childrenComponent = React.Children.map(children,(child,i) =>{
            const childElem = child as React.FunctionComponentElement<MenuItemProps>
            const {displayName} = childElem.type
            if(displayName === 'MenuItem'){
                return React.cloneElement(childElem,{index:`${index}-${i}`})
            }else {
                console.error('Warning: SubMenu has a child which is not a MenuItem component.')
            }
        })
        // 1.2.2 渲染由动画组件包裹的循环子组件
        return (
            <Transition in={menuOpen} timeout={ 300} classNames={'submenu'} animation={"zoom-in-bottom"}>
                <ul className={subMenuClasses}>
                    {childrenComponent}
                </ul>
            </Transition>
        )
    }
    return (
            // 3.3 事件对象使用：点击事件对象放title上，hover事件对象放最外层元素上
            <li key={index} className={classes} {...hoverEvents} >
                <div className={"submenu-title"} {...clickEvents}>
                    {title}<Icon icon={faAngleDown} theme={"dark"} className={'arrow-icon'} />
                </div>
                {/* 1.3 调用循环渲染子组件的方法*/}
                {renderChilren()}
        </li>
    )

}
// 1. 限制children类型.(3)
// 1.1 子组件添加内置静态属性 帮助判断类型
SubMenu.displayName = 'SubMenu'
export default SubMenu
