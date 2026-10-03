import axiosInstance, { IAxiosResponse } from '..'
import { apiGetUploadUrl } from './url'

const getUploadUrl = (): Promise<IAxiosResponse<any>> => axiosInstance.get(apiGetUploadUrl)

const FileService = {
  getUploadUrl
}

export default FileService
