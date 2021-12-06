import React, {FC} from 'react'
import {ThemeProps} from '../Icon/icon'

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

const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight,
    showText,
    styles,
    theme,
  } = props
  return (
    <div className="progress-bar" style={styles}>
      <div className="progress-bar-outer" style={{ height: `${strokeHeight}px`}}>
        <div
          className={`progress-bar-inner color-${theme}`}
          style={{width: `${percent}%`}}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
}
export default Progress;
