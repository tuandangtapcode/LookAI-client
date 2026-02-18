import { IFile, IUploadSingleFile } from '@/interfaces/file'
import axiosInstance, { IAxiosResponse } from '..'
import { apiUploadMultipleFile, apiUploadSingleFile } from './url'

const uploadSingleFile = (body: IUploadSingleFile): Promise<IAxiosResponse<string>> =>
  axiosInstance.post(apiUploadSingleFile, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
const uploadMultipleFile = (body: FormData): Promise<IAxiosResponse<IFile[]>> =>
  axiosInstance.post(apiUploadMultipleFile, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

const FileService = {
  uploadSingleFile,
  uploadMultipleFile
}

export default FileService
