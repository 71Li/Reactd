import React from "react";

export interface SubMenuProps {
    /** 下拉菜单下标 */
    index?: string;
    /** 下拉菜单标题 */
    title: string;
    /** 下拉菜单自定义样式 */
    className?: string;
}
declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
