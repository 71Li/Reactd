import React from "react";
import classNames from 'classnames'
import {useState} from 'react'

export const enum AltType{
    Info = 'info',
    Error = 'error',
    Warning = 'warning',
    Success = 'success'
}

interface AltProps{
    altType ?: AltType;
    message ?: string;
    show ?: boolean;
    className ?: string
    children ?: React.ReactNode
}
export type altProps = Partial<React.ButtonHTMLAttributes<HTMLElement> & AltProps>

const Alert:React.FC<altProps>= (props) => {
    const [altElem, setAltElem] = useState(false);
    const {
        altType,
        message,
        show,
        className,
        children,
        ...restProps
    } = props
    const classes = classNames('alert',className, {
        [`alt-${altType}`]: altType
    });
    const altShow = ()=>{
        setAltElem(true)
    }

    return (
        <div className={classes} {...restProps}>
            <div>
                <span className={'alt-message'}>{message}</span>
                <span className={'alt-desc'}>{children}</span>
            </div>
            {show && <span className={'alt-cancel'} onClick={altShow}>x</span>}



        </div>
    );}

Alert.defaultProps = {
        altType: AltType.Info,
        message: '标题',
        show:true
    }

export default Alert;
