import React from "react";

export declare const enum AltType {
    Info = "info",
    Error = "error",
    Warning = "warning",
    Success = "success"
}
interface AltProps {
    altType?: AltType;
    message?: string;
    show?: boolean;
    className?: string;
    children?: React.ReactNode;
}
export declare type altProps = Partial<React.ButtonHTMLAttributes<HTMLElement> & AltProps>;
declare const Alert: React.FC<altProps>;
export default Alert;
