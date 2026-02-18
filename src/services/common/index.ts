import { ICreateSystemkey, IInsertChildkey, ISystemkey } from '@/interfaces/systemkey'
import axiosInstance, { IAxiosResponse } from '..'
import { apiInsertChildkey, baseRouteSystemkey } from './url'

const getListSystemkey = (): Promise<IAxiosResponse<ISystemkey[]>> => axiosInstance.get(baseRouteSystemkey)
const createSystemkey = (body: ICreateSystemkey): Promise<IAxiosResponse<null>> =>
  axiosInstance.post(baseRouteSystemkey, body)
const insertChildkey = (body: IInsertChildkey): Promise<IAxiosResponse<null>> =>
  axiosInstance.post(apiInsertChildkey, body)

const CommonService = {
  getListSystemkey,
  createSystemkey,
  insertChildkey
}

export default CommonService
