import React, {ReactNode} from "react";

declare type MenuMode = 'horizontal' | 'vertical';
declare type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    /** 菜单模式 */
    mode?: MenuMode;
    /** 默认高亮 */
    defaultIndex?: string;
    /** 自定义样式 */
    className?: string;
    /** 自定义style */
    style?: React.CSSProperties;
    /** 选中触发的自定义回调函数 */
    onSelect?: SelectCallback;
    children?: ReactNode;
    defaultOpenSubMenus?: string[];
}
interface IMenuContext {
    mode?: MenuMode;
    index: string;
    onSelect?: SelectCallback;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
declare const Menu: React.FC<MenuProps>;
export default Menu;
