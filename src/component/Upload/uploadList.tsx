import React, {FC} from 'react'
import {UploadFile} from './upload'
import Icon from '../Icon/icon'
import Progress from '../Progress/progress'

// 上传文件列表的展示

interface UploadListProps {
  /** 文件列表 */
  fileList: UploadFile[];
  /** 文件撤销回调 */
  onRemove: (_file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = (props) => {
  const {fileList, onRemove,} = props

  return (
    <ul className="upload-list">
      {/* 循环展示文件列表 */}
      {fileList.map(item => {
        return (
          <li className="upload-list-item" key={item.uid}>
            {/* 左侧文件图标+文件名 */}
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon="file-alt" theme="secondary" />
              {item.name}
            </span>
            {/* 右侧状态图标 */}
            <span className="file-status">
              {(item.status === 'uploading' || item.status === 'ready') && <Icon icon="spinner" spin theme="primary" />}
              {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
              {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
            </span>
            {/* 右侧撤销图标 */}
            <span className="file-actions">
              <Icon icon="times" onClick={() => { onRemove(item)}}/>
            </span>
            {/* 进度条显示 */}
            {item.status === 'uploading' &&
              <Progress percent={item.percent || 0}/>
            }
          </li>
        )
      })}
    </ul>
  )

}

export default UploadList;
