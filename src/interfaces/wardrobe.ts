import { BooleanEnum, ItemCategoryEnum } from '@/utils/enum/common'
import { IBaseData, IPagination } from './common'
import { IItemType } from './item-type'

export interface IWardrobe extends IBaseData {
  name: string
  userId: string
  itemType?: IItemType
  itemCategory: ItemCategoryEnum
  image: string
  color: string
  size?: string
  isFavourite: BooleanEnum
}

export interface ICreateWardrobe {
  name: string
  itemTypeId?: string
  itemCategory: ItemCategoryEnum
  image: string
  color: string
  size?: string
  isFavourite: BooleanEnum
}

export type IUpdateWardrobe = Partial<ICreateWardrobe> & {
  wardrobeId: string
}

export interface IGetListWardrobe extends IPagination {
  itemCategory: ItemCategoryEnum
  itemTypeId?: string
  color?: string
  size?: string
  isFavourite?: BooleanEnum
}

export interface IGetQuantityWardrobe {
  itemCategory: ItemCategoryEnum
  itemTypeId: string
  quantity: number
}
