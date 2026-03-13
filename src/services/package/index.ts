import { ICreatePackage, IGetListPackage, IPackage, IUpdatePackage } from '@/interfaces/package'
import { truncateParams } from '@/utils/helper/common'
import axiosInstance, { IAxiosResponse } from '..'
import { baseRoutePackage } from './urls'

const createPackage = (body: ICreatePackage): Promise<IAxiosResponse<IPackage>> =>
  axiosInstance.post(baseRoutePackage, body)
const updatePackage = (body: IUpdatePackage): Promise<IAxiosResponse<IPackage>> =>
  axiosInstance.put(baseRoutePackage, body)
const getListPackage = (params: IGetListPackage): Promise<IAxiosResponse<IPackage[]>> => {
  const _params = truncateParams(params)
  return axiosInstance.get(`${baseRoutePackage}${_params}`)
}
const getDetailPackage = (id: string): Promise<IAxiosResponse<IPackage>> =>
  axiosInstance.get(`${baseRoutePackage}/${id}`)

const PackageService = {
  createPackage,
  updatePackage,
  getListPackage,
  getDetailPackage
}

export default PackageService
