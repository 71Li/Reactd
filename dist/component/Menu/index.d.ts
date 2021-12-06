import {FC} from 'react';
import Menu, {MenuProps} from "./menu";
import {MenuItemProps} from "./menuItem";
import {SubMenuProps} from "./subMenu";

export declare type IMenuComponent = FC<MenuProps> & {
    Item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuProps>;
};
export default Menu;
