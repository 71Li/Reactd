import React, {DragEvent, FC, useState} from 'react'
import classNames from 'classnames'

interface DraggerProps {
  /** 拖拽文件的回调 */
  onFile: (files: FileList) => void;
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props
  // 是否完成拖拽状态
  const [ dragOver, setDragOver ] = useState(false)
  // 添加拖拽激活样式
  const klass = classNames('uploader-dragger', {
    'is-dragover': dragOver
  })
  // 放置文件逻辑
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    onFile(e.dataTransfer.files)
  }
  // 拖拽逻辑
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }
  return (
    <div
      className={klass}
      onDragOver={e => { handleDrag(e, true)}}
      onDragLeave={e => { handleDrag(e, false)}}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger;
