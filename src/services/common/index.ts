import { ICreateSystemkey, IInsertChildkey, ISystemkey } from '@/interfaces/systemkey'
import axiosInstance, { IAxiosResponse } from '..'
import { apiCreateSystemkey, apiGetListSystemkey, apiInsertChildkey } from './url'

const getListSystemkey = (): Promise<IAxiosResponse<ISystemkey[]>> => axiosInstance.get(apiGetListSystemkey)
const createSystemkey = (body: ICreateSystemkey): Promise<IAxiosResponse<null>> =>
  axiosInstance.post(apiCreateSystemkey, body)
const insertChildkey = (body: IInsertChildkey): Promise<IAxiosResponse<null>> =>
  axiosInstance.post(apiInsertChildkey, body)

const CommonService = {
  getListSystemkey,
  createSystemkey,
  insertChildkey
}

export default CommonService
