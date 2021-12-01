import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import Axios from 'axios'
import {fireEvent, render, RenderResult, waitFor} from '@testing-library/react'

import {Upload, UploadProps} from './upload'

jest.mock('../Icon/icon', () => {
  return ({icon, onClick}) => {
    return <span onClick={onClick}>{icon}</span>
  }
})
jest.mock('axios')
const mockedAxios = Axios as jest.Mocked<typeof Axios>

const testProps: UploadProps = {
  action: "fakeurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true
}
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['xyz'], 'test.png', {type: 'image/png'})
describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
    // @ts-ignore
    fileInput = wrapper.container.querySelector('.file-input')
    // @ts-ignore
    uploadArea = wrapper.queryByText('Click to upload')
  })
  it('upload process should works fine', async () => {
    const {queryByText} = wrapper
    // Axios.post.mockImplementation(() => {
    //   return Promise.resolve({'data': 'cool'})
    // })

    mockedAxios.post.mockResolvedValue({data: 'cool'})
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput, {target: {files: [testFile]}})
    expect(queryByText('spinner')).toBeInTheDocument()
    await waitFor(() => {
      expect(queryByText('test.png')).toBeInTheDocument()
    })
    expect(queryByText('check-circle')).toBeInTheDocument()
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
    expect(testProps.onChange).toHaveBeenCalledWith(testFile)

    //remove the uploaded file
    expect(queryByText('times')).toBeInTheDocument()
    // @ts-ignore
    fireEvent.click(queryByText('times'))
    expect(queryByText('test.png')).not.toBeInTheDocument()
    expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      name: 'test.png'
    }))
  })
//   it('drag and drop files should works fine', async () => {
//     fireEvent.dragOver(uploadArea)
//     expect(uploadArea).toHaveClass('is-dragover')
//     fireEvent.dragLeave(uploadArea)
//     expect(uploadArea).not.toHaveClass('is-dragover')
//     const mockDropEvent = createEvent.drop(uploadArea)
//     Object.defineProperty(mockDropEvent, "dataTransfer", {
//       value: {
//         files: [testFile]
//       }
//     })
//     fireEvent(uploadArea, mockDropEvent)
//
//     await waitFor(() => {
//       expect(wrapper.queryByText('test.png')).toBeInTheDocument()
//     })
//     expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
//   })
})
