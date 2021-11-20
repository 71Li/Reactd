import React, {ReactNode,useState,createContext} from "react";
import classNames from 'classnames'
import {MenuItemProps} from "./menuItem";


type MenuMode = 'horizontal'|'vertical'
type SelectCallback = (selectedIndex:string)=>void
export interface MenuProps {
    defaultIndex ?: string,
    className ?: string,
    style ?: React.CSSProperties,
    mode ?:MenuMode,
    onSelect ?:SelectCallback,
    children ?: ReactNode,
    defaultOPenSubMenus ?: string[]
}

interface IMenuContext {
    index : string,
    onSelect ?:SelectCallback,
    mode ?: MenuMode,
    defaultOPenSubMenus ?: string[]
}

export const MenuContext = createContext<IMenuContext>({index:"0"});

const Menu:React.FC<MenuProps> =  (props) => {
    const {defaultIndex, className, style, mode,children,onSelect,defaultOPenSubMenus} = props
    const [currentActive, setActive] = useState(defaultIndex);
    const classes = classNames('menu',className,{
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'

    })

    const handleClick = (index:string)=>{
        setActive(index);
        if(onSelect){
            onSelect(index)
        }

    }
    const passedContext:IMenuContext = {
        index: currentActive ? currentActive :"0",
        onSelect :handleClick,
        mode ,
        defaultOPenSubMenus
    }

    const renderChildren = ()=>{
        return React.Children.map(children,(child, index) => {
            const childElem = child as React.FunctionComponentElement<MenuItemProps>
            const {displayName} = childElem.type
            if(displayName === 'MenuItem'|| displayName === 'SubMenu'){
                return React.cloneElement(childElem,{index:index.toString()})
            }else {
               console.error('Warning: Menu has a child which is not a MenuItem component.')
            }
        })
    }
    return (
        <ul  className={classes} style={style} data-testid={'test-menu'}>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>

    )

}

Menu.defaultProps = {
    defaultIndex : "0",
    mode: "horizontal",
    defaultOPenSubMenus: []
}

export default Menu
