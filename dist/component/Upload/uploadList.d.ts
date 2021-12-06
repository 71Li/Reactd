import {FC} from 'react';
import {UploadFile} from './upload';

interface UploadListProps {
    /** 文件列表 */
    fileList: UploadFile[];
    /** 文件撤销回调 */
    onRemove: (_file: UploadFile) => void;
}
export declare const UploadList: FC<UploadListProps>;
export default UploadList;
