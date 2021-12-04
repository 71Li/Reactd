import React, {createContext, ReactNode, useState} from "react";
import classNames from 'classnames'
import {MenuItemProps} from "./menuItem";

// 使用字符串字面量类型,约束取值只能是其中之一
type MenuMode = 'horizontal'|'vertical'
type SelectCallback = (selectedIndex:string)=>void

// 接口描述Menu属性
export interface MenuProps {
    /** 菜单模式 */
    mode ?: MenuMode,
    /** 默认高亮 */
    defaultIndex ?: string,
    /** 自定义样式 */
    className ?: string,
    /** 自定义style */
    style ?: React.CSSProperties,
    /** 选中触发的自定义回调函数 */
    onSelect ?:SelectCallback,
    children ?: ReactNode,
    defaultOpenSubMenus ?: string[]
}

// 使用useContext向子组件传递数据
// 定义context接口、创建context、定义传递给子组件的数据、向子组件注入数据
interface IMenuContext {
    mode ?: MenuMode,
    index : string,
    onSelect ?: SelectCallback,
    defaultOpenSubMenus ?: string[]
}
export const MenuContext = createContext<IMenuContext>({index:"0"});

// 函数主体
const Menu:React.FC<MenuProps> =  (props) => {
    // 将属性展开
    const {defaultIndex, className, style, mode, children, onSelect, defaultOpenSubMenus} = props
    // 定义激活下标
    const [currentActive, setActive] = useState(defaultIndex);
    // 为组件添加样式
    const classes = classNames('menu',className,{
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })
    // 点击操作:激活当前下标项,触发回调
    const handleClick = (index:string)=>{
        setActive(index);
        if(onSelect){
            onSelect(index)
        }
    }
    // 定义传递的context数据: 判断当前项是否激活、触发回调函数
    const passedContext:IMenuContext = {
        index: currentActive ? currentActive :"0",
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus
    }
    // 1.2 添加循环渲染子组件的方法
    const renderChildren = ()=>{
        // React.Children.map()循环不透明数据结构children，将其直接返回
        return React.Children.map(children,(child, index) => {
            // 为child添加类型断言 将其转为FC实例,拿到子组件的displayName,进行displayName逻辑渲染
            const childElem = child as React.FunctionComponentElement<MenuItemProps>
            const {displayName} = childElem.type
            if(displayName === 'MenuItem'|| displayName === 'SubMenu'){
                // 2. 实现子组件自动添加index (2)
                // 2.1 子组件index属性设为可选属性,增加子组件handleClick判断条件
                // 2.2 return调用React.cloneElement()克隆子组件,并将index属性加入克隆
                return React.cloneElement(childElem,{index:index.toString()})
            }else {
               console.error('Warning: Menu has a child which is not a MenuItem component.')
            }
        })
    }
    return (
        <ul  className={classes} style={style} data-testid={'test-menu'}>
            {/* 向子组件注入数据 */}
            <MenuContext.Provider value={passedContext}>
                {/* 1.3 调用循环渲染子组件的方法*/}
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )}
// 添加默认值
Menu.defaultProps = {
    defaultIndex : "0",
    mode: "horizontal",
    defaultOpenSubMenus: []
}

export default Menu
