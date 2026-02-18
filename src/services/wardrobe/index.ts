import { ICreateWardrobe, IGetListWardrobe, IUpdateWardrobe, IWardrobe } from '@/interfaces/wardrobe'
import { truncateParams } from '@/utils/helper/common'
import axiosInstance, { IAxiosResponse } from '..'
import { baseRouteWardrobe } from './urls'

const createWardrobe = (body: ICreateWardrobe): Promise<IAxiosResponse<IWardrobe>> =>
  axiosInstance.post(baseRouteWardrobe, body)
const updateWardrobe = (body: IUpdateWardrobe): Promise<IAxiosResponse<IWardrobe>> =>
  axiosInstance.put(baseRouteWardrobe, body)
const getListWardrobe = (query: IGetListWardrobe): Promise<IAxiosResponse<IWardrobe[]>> => {
  const params = truncateParams(query)
  return axiosInstance.get(`${baseRouteWardrobe}${params}`)
}

const WardrobeService = {
  createWardrobe,
  updateWardrobe,
  getListWardrobe
}

export default WardrobeService
