import {FC} from 'react';

interface DraggerProps {
    /** 拖拽文件的回调 */
    onFile: (files: FileList) => void;
}
export declare const Dragger: FC<DraggerProps>;
export default Dragger;
