import {FC} from 'react';

export declare type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    /** 请求的地址 */
    action: string;
    /** 请求中的回调 */
    onProgress?: (percentage: number, file: File) => void;
    /** 请求成功的回调 */
    onSuccess?: (data: any, file: File) => void;
    /** 请求失败的回调 */
    onError?: (err: any, file: File) => void;
    /** 上传前的限制函数: 是否上传|上传文件 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /** 默认文件列表 */
    defaultFileList?: UploadFile[];
    /** 文件状态变化的回调*/
    onChange?: (file: File) => void;
    /** 文件撤销的回调*/
    onRemove?: (file: UploadFile) => void;
    /** post属性-自定义headers */
    headers?: {
        [key: string]: any;
    };
    /** post请求-自定义name  */
    name?: string;
    /** post请求-自定义data  */
    data?: {
        [key: string]: any;
    };
    /** post请求-是否携带cookie  */
    withCredentials?: boolean;
    /** 支持文件类型  */
    accept?: string;
    /** 支持多文件  */
    multiple?: boolean;
    /** 支持拖拽 */
    drag?: boolean;
}
export declare const Upload: FC<UploadProps>;
export default Upload;
