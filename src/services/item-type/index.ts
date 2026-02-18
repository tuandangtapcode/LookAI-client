import { ICreateItemType, IItemType, IUpdateItemType } from '@/interfaces/item-type'
import axiosInstance, { IAxiosResponse } from '..'
import { baseRouteItemType } from './urls'

const createItemType = (body: ICreateItemType): Promise<IAxiosResponse<IItemType>> =>
  axiosInstance.post(baseRouteItemType, body)
const updateItemType = (body: IUpdateItemType): Promise<IAxiosResponse<IItemType>> =>
  axiosInstance.put(baseRouteItemType, body)
const getListItemType = (): Promise<IAxiosResponse<IItemType[]>> => axiosInstance.get(baseRouteItemType)

const ItemTypeService = {
  createItemType,
  updateItemType,
  getListItemType
}

export default ItemTypeService
