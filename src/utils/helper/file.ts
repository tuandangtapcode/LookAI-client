import FileService from '@/services/file'
import { message, Upload } from 'antd'
import { RcFile } from 'antd/es/upload'
import axios from 'axios'
import notify from '../notify'
import { logError } from './log'

export const handleBeforeUpload = (file: RcFile, setPreview: (url: string) => void) => {
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  const isAllowedType = allowedImageTypes.includes(file.type)
  if (!isAllowedType) {
    message.error('Yêu cầu chọn file ảnh (jpg, png, gif, webp)')
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    message.error('Dung lượng file tải lên phải nhỏ 5MB')
    return
  }
  setPreview(URL.createObjectURL(file))
  return isAllowedType ? false : Upload.LIST_IGNORE
}

export const handleUploadFile = async (file: any) => {
  try {
    const res = await FileService.getUploadUrl()
    if (res?.error) return notify('error', res?.msg)

    const { uploadUrl, ...fields } = res?.data
    const formData = new FormData()
    formData.append('file', file)
    Object.entries(fields).forEach(([k, v]) => formData.append(k, String(v)))

    const { data } = await axios.post(uploadUrl, formData)

    return data?.secure_url ?? ''
  } catch (error) {
    logError('utils/helper/file.ts-handleUploadFile', error)
  }
}
