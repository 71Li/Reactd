import React from "react";

export interface MenuItemProps {
    /** 自定义样式 */
    index?: string;
    /** 菜单项禁用 */
    disabled?: boolean;
    /** 自定义样式 */
    className?: string;
    /** 自定义style */
    style?: React.CSSProperties;
}
declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
