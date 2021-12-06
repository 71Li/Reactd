import React from 'react';
import {CSSTransitionProps} from 'react-transition-group/CSSTransition';

declare type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';
declare type TransitionProps = CSSTransitionProps & {
    /** 动画类型 */
    animation?: AnimationName;
    /** 是否包裹 */
    wrapper?: boolean;
};
declare const Transition: React.FC<TransitionProps>;
export default Transition;
