import React, {FC} from 'react';
import {ThemeProps} from '../Icon/icon';

export interface ProgressProps {
    /** 百分比 */
    percent: number;
    /** 进度条高度 */
    strokeHeight?: number;
    /** 是否显示文字 */
    showText?: boolean;
    /** 颜色主题 */
    theme?: ThemeProps;
    /** 自定义styles */
    styles?: React.CSSProperties;
}
declare const Progress: FC<ProgressProps>;
export default Progress;
