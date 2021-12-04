import React from "react";
import {FontAwesomeIcon, FontAwesomeIconProps} from "@fortawesome/react-fontawesome";
import classNames from "classnames";
// 二次封装图标库
export type ThemeProps = 'primary'|'secondary'|'success'| 'info'|'warning'|"danger"|'light'|'dark'
export interface IconProps extends FontAwesomeIconProps{
    theme ?: ThemeProps
}

const Icon:React.FC<IconProps> = (props) => {
    const {className ,theme,...restProps} = props
    const classes = classNames('icon',className, {
        [`icon-${theme}`]: theme // 反引号
    })

    return (<FontAwesomeIcon className={classes} {...restProps} />)
}

export default Icon
