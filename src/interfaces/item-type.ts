import { ItemCategoryEnum } from '@/utils/enum/common'
import { IBaseData } from './common'

export interface ICreateItemType {
  name: string
  category: ItemCategoryEnum
}

export type IUpdateItemType = Partial<ICreateItemType> & {
  itemTypeId: string
}

export interface IItemType extends IBaseData {
  name: string
  category: ItemCategoryEnum
}
