import React, {ChangeEvent, FC, useRef, useState} from 'react'
import Axios from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
// 1. 实现上传文件列表
// 1.1 上传文件接口
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
  defaultFileList?: UploadFile[];
  /** 上传前的限制函数: 是否上传|上传文件 */
  beforeUpload ?: (file: File) => boolean | Promise<File>;
  /** 文件状态变化的回调*/
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
  headers?: {[key: string]: any };
  name?: string;
  data?: {[key: string]: any };
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  drag?: boolean;
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props
  // ref拿到file的dom节点
  const fileInput = useRef<HTMLInputElement>(null)
  // 1.2 定义上传文件列表状态
  const [ fileList, setFileList ] = useState<UploadFile[]>(defaultFileList || [])
  // 1.4 更新文件列表
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {  // 异步方法更新
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          // 更新文件到原文件列表
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }
  // 点击逻辑 触发文件点击操作
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }
  // 文件变化逻辑
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if(!files) {
      return
    }
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }
  // 上传文件
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        // 判断result类型：promise类型和普通文件类型
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }
  // 文件上传
  const post = (file: File) => {
    // 1.3 在文件上传开始 创建文件对象实例,更新文件列表
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    // 异步更新文件列表-传入函数
    setFileList(prevList => {
      return [_file, ...prevList]
    })
    // 创建表格数据，追加文件
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    // 发送post请求
    Axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      // 上传进度
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0;
        if (percentage < 100) {
          updateFileList(_file, { percent: percentage, status: 'uploading'})
          if (onProgress) {
            onProgress(percentage, file)
          }
        }
      }
    //  post成功时的回调
    }).then(resp => {
      updateFileList(_file, {status: 'success', response: resp.data})
      if (onSuccess) {
        onSuccess(resp.data, file)
      }
      if (onChange) {
        onChange(file)
      }
    //   post失败时的回调
    }).catch(err => {
      updateFileList(_file, { status: 'error', error: err})
      if (onError) {
        onError(err, file)
      }
      if (onChange) {
        onChange(file)
      }
    })
  }

  return (
    <div className="upload-component">
      <div className="upload-input"
        style={{display: 'inline-block'}}
        onClick={handleClick}>

        {drag ?
            <Dragger onFile={(files) => {uploadFiles(files)}}>
              {children}
            </Dragger>
              : children}
        <input
          className="file-input"
          style={{display: 'none'}}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />

      </div>

      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}
export default Upload;
