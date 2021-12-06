import React, {AnchorHTMLAttributes, ButtonHTMLAttributes, FC} from "react";

export declare type ButtonSize = 'lg' | 'sm' | 'default';
export declare type ButtonType = 'primary' | 'danger' | 'link' | 'default' | 'success';
interface BaseButtonProps {
    /** 设置button禁用 */
    disabled?: boolean;
    /** 设置button大小 */
    size?: ButtonSize;
    /** 设置button类型 */
    btnType?: ButtonType;
    /** 设置button链接地址 */
    href?: string;
    /** 设置用户自定义classname */
    className?: string;
    children: React.ReactNode;
}
declare type nativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type anchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type buttonProps = Partial<nativeButtonProps & anchorButtonProps>;
export declare const Button: FC<buttonProps>;
export default Button;
