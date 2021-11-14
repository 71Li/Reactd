import React from "react";
// import classNames from 'classnames'

export const enum AltMessage{
    TiShi = '提示',
    JingGao = '警告',
    ShiBai= '失败',
    ChengGong = '成功'
}

export const enum AltType{
    Info = 'info',
    Error = 'error',
    Warning = 'waring',
    Success = 'success'
}

interface AltProps{
    // className ?: string;
    closable ?: boolean;
    message ?: AltMessage;
    type ?: AltType;
    children : React.ReactNode;
    icon : boolean;
    description ?:string
}
type nativeAltProps = AltProps & React.AllHTMLAttributes<HTMLElement>
type anchorAltProps = AltProps & React.AnchorHTMLAttributes<HTMLElement>
export type altProps = Partial<nativeAltProps & anchorAltProps>

const Alert: React.FC<altProps>= (props) => {
    const {
        // className,
        closable ,
        message,
        type ,
        children,
        icon ,
        description ,
        ...restProps
    }= props


    // const classes = classNames('alt',className,{
    //     [`alt-${type}`]: type
    // })


    return (
            <Alert
                // className={classes}
                closable={closable}
                {...restProps}
            >    {children}
            </Alert>
        )
}

Alert.defaultProps = {
    closable: true,
    type: AltType.Info
}

export default Alert;
