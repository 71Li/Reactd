import {ChangeEvent, FC, InputHTMLAttributes, ReactElement} from 'react';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

declare type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /**是否禁用input */
    disabled?: boolean;
    /** input大小 */
    size?: InputSize;
    /** 添加右侧提示图标 */
    icon?: IconProp;
    /** 添加前缀  */
    prepend?: string | ReactElement;
    /** 添加后缀 */
    append?: string | ReactElement;
    /** input值改变触发的回调*/
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * Input输入框 通过鼠标或键盘输入内容
 */
export declare const Input: FC<InputProps>;
export default Input;
