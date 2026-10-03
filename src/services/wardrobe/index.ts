import { IGetListResponse } from '@/interfaces/common'
import {
  IAnalyzeWardrobeImageBody,
  IAnalyzeWardrobeImageResult,
  ICreateWardrobe,
  IGetListWardrobe,
  IGetQuantityWardrobe,
  IUpdateWardrobe,
  IWardrobe
} from '@/interfaces/wardrobe'
import { truncateParams } from '@/utils/helper/common'
import axiosInstance, { IAxiosResponse } from '..'
import { apiAnalyzeWardrobeImage, apiGetQuantityWardrobe, baseRouteWardrobe } from './urls'

const createWardrobe = (body: ICreateWardrobe): Promise<IAxiosResponse<IWardrobe>> =>
  axiosInstance.post(baseRouteWardrobe, body)

const updateWardrobe = (body: IUpdateWardrobe): Promise<IAxiosResponse<IWardrobe>> =>
  axiosInstance.put(baseRouteWardrobe, body)

const getListWardrobe = (params: IGetListWardrobe): Promise<IAxiosResponse<IGetListResponse<IWardrobe>>> => {
  const _params = truncateParams(params)
  return axiosInstance.get(`${baseRouteWardrobe}${_params}`)
}

const getQuantityWardrobe = (field: 'item_category' | 'item_type'): Promise<IAxiosResponse<IGetQuantityWardrobe[]>> =>
  axiosInstance.get(apiGetQuantityWardrobe, { params: { field } })

const analyzeWardrobeImage = (body: IAnalyzeWardrobeImageBody): Promise<IAxiosResponse<IAnalyzeWardrobeImageResult>> =>
  axiosInstance.post(apiAnalyzeWardrobeImage, body)

const WardrobeService = {
  createWardrobe,
  updateWardrobe,
  getListWardrobe,
  getQuantityWardrobe,
  analyzeWardrobeImage
}

export default WardrobeService
