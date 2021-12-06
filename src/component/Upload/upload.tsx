import React, {ChangeEvent, FC, useRef, useState} from 'react'
import axios from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
// 1. 创建上传文件列表的数据(6)
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
  /** 上传前的限制函数: 是否上传|上传文件 */
  beforeUpload ?: (file: File) => boolean | Promise<File>;
  /** 默认文件列表 */
  defaultFileList ?: UploadFile[];
  /** 文件状态变化的回调*/
  onChange ?: (file: File) => void;
  /** 文件撤销的回调*/
  onRemove ?: (file: UploadFile) => void;
  /** post属性-自定义headers */
  headers ?: {[key: string]: any };
  /** post请求-自定义name  */
  name ?: string;
  /** post请求-自定义data  */
  data ?: {[key: string]: any };
  /** post请求-是否携带cookie  */
  withCredentials ?: boolean;
  /** 支持文件类型  */
  accept ?: string;
  /** 支持多文件  */
  multiple ?: boolean;
  /** 支持拖拽 */
  drag ?: boolean;
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
  // 1.3 定义更新文件状态函数
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {  // 异步方法更新
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          // 覆盖更新的文件的某值
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }

  // 点击区域逻辑 触发文件点击操作
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
    console.log("click")
  }

  // 文件变化逻辑
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if(!files) {
      return
    }
    // 进行文件上传过程
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }
  // 2. 上传文件列表的展示(2)
  // 2.1 使用文件列表组件<UploadList>
  // 2.2 定义文件撤销逻辑
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }

  // 1.4 文件上传过程
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

  // 1.5 具体的文件上传请求
  const post = (file: File) => {
    //  在文件上传开始 创建文件对象实例,更新文件列表
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
    if (data) { // 追加自定义数据
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    // 发送post请求
    // 1.6 在上传中，成功失败回调时调用文件状态更新函数
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
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
      {/* 支持拖拽上传*/}
      <div className="upload-input"
        style={{display: 'inline-block'}}
        onClick={handleClick}>
        {drag ?
            <Dragger onFile={(files) => {uploadFiles(files)}}>
              {children}
            </Dragger>
              : children}
      </div>
      {/* 点击上传 */}
      <input
          className="file-input"
          // style={{display: 'none'}}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
      />

      {/* 2.1 使用文件列表组件 */}
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
