import React, {ReactNode,useState,createContext} from "react";
import classNames from 'classnames'
import MenuItemProps from "./menuItem";


type MenuMode = 'horizontal'|'vertical'
type SelectCallback = (selectedIndex:number)=>void
export interface MenuProps {
    defaultIndex ?: number,
    className ?: string,
    style ?: React.CSSProperties,
    mode ?:MenuMode,
    onSelect ?:SelectCallback,
    children ?: ReactNode
}

interface IMenuContext {
    index : number,
    onSelect ?:SelectCallback,
}

export const MenuContext = createContext<IMenuContext>({index:0});

const Menu:React.FC<MenuProps> =  (props) => {
    const {defaultIndex, className, style, mode,children,onSelect} = props
    const [currentActive, setActive] = useState(defaultIndex);
    const classes = classNames('menu',className,{
        'menu-vertical': mode === 'vertical'
    })

    const handleClick = (index:number)=>{
        setActive(index);
        if(onSelect){
            onSelect(index)
        }

    }
    const passedContext:IMenuContext = {
        index: currentActive ? currentActive :0,
        onSelect :handleClick
    }
    return (
        <ul  className={classes} style={style} data-testid={'test-menu'}>
            <MenuContext.Provider value={passedContext}>
                {children}
            </MenuContext.Provider>
        </ul>

    )

}

Menu.defaultProps = {
    defaultIndex : 0,
    mode: "horizontal"
}

export default Menu
