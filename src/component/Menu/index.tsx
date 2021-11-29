import {FC} from 'react'
import Menu, {MenuProps} from "./menu";
import MenuItem, {MenuItemProps} from "./menuItem";
import SubMenu, {SubMenuProps} from "./subMenu";

export type IMenuComponent = FC<MenuProps> & {
    Item : FC<MenuItemProps>;
    SubMenu : FC<SubMenuProps>
}

const  transMenu = Menu as IMenuComponent
transMenu.Item = MenuItem
transMenu.SubMenu = SubMenu

export default Menu
