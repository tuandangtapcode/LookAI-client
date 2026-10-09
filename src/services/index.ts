import env from '@/utils/config/env'
import { ERROR_MESSAGES } from '@/utils/constant/common'
import { routes } from '@/utils/constant/route'
import notify from '@/utils/notify'
import axios, { AxiosResponse } from 'axios'
import AuthService from './auth'

export interface IAxiosResponse<T> {
  data: T
  error: boolean
  msg: string
}

const axiosInstance = axios.create({
  timeout: 60000
})

let refreshPromise: Promise<unknown> | null = null

const parseBody = (response: AxiosResponse) => {
  return response.data
}

axiosInstance.interceptors.request.use(
  (config) => {
    config.baseURL = env.ROOT_SERVER_URL
    config.withCredentials = true
    return config
  },
  (error) => Promise.reject(error.message)
)

axiosInstance.interceptors.response.use(
  (response) => parseBody(response),
  async (error) => {
    if (+error?.response?.status >= 500) {
      notify(
        'error',
        'Hệ thống đang tạm thời gián đoạn. Xin vui lòng trở lại sau hoặc thông báo với ban quản trị để được hỗ trợ'
      )
    } else if (+error?.response?.status === 400) {
      notify('error', 'Hệ thống xảy ra lỗi. Xin vui lòng trở lại sau hoặc thông báo với ban quản trị để được hỗ trợ')
    } else if (+error?.response?.status === 401) {
      const originalRequest = error.config
      if (error.response.data?.msg === ERROR_MESSAGES.TOKEN_EXPIRED && !originalRequest._retry) {
        originalRequest._retry = true
        refreshPromise ??= AuthService.refresh().finally(() => (refreshPromise = null))
        return refreshPromise.then(() => axiosInstance(originalRequest))
      }
      notify('error', 'Hệ thống xảy ra lỗi. Phiên làm việc đã hết hạn. Hãy đăng nhập lại để tiếp tục sử dụng')
      window.location.replace(routes.login.source)
    } else if (+error?.response?.status === 403) {
      notify('error', 'Bạn không có quyền truy cập')
    } else if (error.code === 'ERR_NETWORK') {
      notify('error', 'Hệ thống đang bị gián đoạn, vui lòng kiểm tra lại đường truyền')
    } else if (+error?.response?.status === 404) {
      notify('error', 'API không tồn tại')
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
