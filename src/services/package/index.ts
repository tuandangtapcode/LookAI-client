import { ICreatePackage, IGetListPackage, IPackage, IUpdatePackage } from '@/interfaces/package'
import { truncateParams } from '@/utils/helper/common'
import axiosInstance, { IAxiosResponse } from '..'
import { baseRoutePackage } from './urls'

const createPackage = (body: ICreatePackage): Promise<IAxiosResponse<IPackage>> =>
  axiosInstance.post(baseRoutePackage, body)
const updatePackage = (body: IUpdatePackage): Promise<IAxiosResponse<IPackage>> =>
  axiosInstance.put(baseRoutePackage, body)
const getListPackage = (query: IGetListPackage): Promise<IAxiosResponse<IPackage[]>> => {
  const params = truncateParams(query)
  return axiosInstance.get(`${baseRoutePackage}${params}`)
}

const PackageService = {
  createPackage,
  updatePackage,
  getListPackage
}

export default PackageService
