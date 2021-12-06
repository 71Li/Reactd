import Menu from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

var transMenu = Menu;
transMenu.Item = MenuItem;
transMenu.SubMenu = SubMenu;
export default Menu;
