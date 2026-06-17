import { IGetListResponse } from '@/interfaces/common'
import { ICreateLog, IGetListLog, ILog } from '@/interfaces/log'
import { truncateParams } from '@/utils/helper/common'
import axiosInstance, { IAxiosResponse } from '..'
import { baseRouteLog } from './urls'

const createLog = (body: ICreateLog): Promise<IAxiosResponse<null>> => axiosInstance.post(baseRouteLog, body)
const getListLog = (params: IGetListLog): Promise<IAxiosResponse<IGetListResponse<ILog>>> => {
  const _params = truncateParams(params)
  return axiosInstance.get(`${baseRouteLog}${_params}`)
}

const LogService = {
  createLog,
  getListLog
}

export default LogService
