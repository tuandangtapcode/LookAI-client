import env from '@/utils/config/env'
import notify from '@/utils/notify'
import axios, { AxiosResponse } from 'axios'

export interface IAxiosResponse<T> {
  data: T
  error: boolean
  msg: string
}

const axiosInstance = axios.create({
  timeout: 60000
})

const parseBody = (response: AxiosResponse) => {
  return response.data
}

axiosInstance.interceptors.request.use(
  (config) => {
    config.baseURL = env.ROOT_SERVER_URL
    config.withCredentials = true
    config.headers['X-Platform'] = env.X_PLATFORM
    return config
  },
  (error) => Promise.reject(error.message)
)

axiosInstance.interceptors.response.use(
  (response) => parseBody(response),
  (error) => {
    if (+error?.response?.status >= 500) {
      notify(
        'error',
        'Hệ thống đang tạm thời gián đoạn. Xin vui lòng trở lại sau hoặc thông báo với ban quản trị để được hỗ trợ'
      )
    } else if (+error?.response?.status == 400) {
      notify('error', 'Hệ thống xảy ra lỗi. Xin vui lòng trở lại sau hoặc thông báo với ban quản trị để được hỗ trợ')
    } else if (+error?.response?.status == 401) {
      notify('error', 'Hệ thống xảy ra lỗi. Phiên làm việc đã hết hạn. Hãy đăng nhập lại để tiếp tục sử dụng')
      window.location.replace('dang-nhap')
    } else if (+error?.response?.status == 403) {
      notify('error', 'Bạn không có quyền truy cập')
    } else if (error.code === 'ERR_NETWORK') {
      notify('error', 'Hệ thống đang bị gián đoạn, vui lòng kiểm tra lại đường truyền')
    } else if (+error?.response?.status == 404) {
      notify('error', 'API không tồn tại')
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
