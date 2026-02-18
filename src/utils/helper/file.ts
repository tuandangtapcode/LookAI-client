import { message, Upload } from 'antd'
import { RcFile } from 'antd/es/upload'

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
