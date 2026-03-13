import { BooleanEnum } from '@/utils/enum/common'
import { IBaseData } from './common'

export interface IPackage extends IBaseData {
  name: string
  duration?: number
  price: number
  quota: number
  description: string
  isActive: BooleanEnum
}

export interface ICreatePackage {
  name: string
  duration?: number
  price: number
  quota: number
  description: string
  isActive: BooleanEnum
}

export interface IUpdatePackage extends ICreatePackage {
  packageId: string
}

export interface IGetListPackage {
  isActive?: BooleanEnum
}
