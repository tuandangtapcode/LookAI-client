import { AccountStatusEnum, GenderEnum, UserRoleEnum } from '@/utils/enum/user'
import { UserSubscriptionStatusEnum } from '@/utils/enum/user_subscription'
import { IBaseData, IPagination } from './common'

export interface IUser extends IBaseData {
  email: string
  avatar?: string
  userName: string
  phone?: string
  dateOfBirth: string
  gender: GenderEnum
  height?: number
  weight?: number
  bust?: number
  waist?: number
  hip?: number
  skinColor?: string
  clothingSize?: string
  currentStyle?: string
  desiredStyle?: string
  occupation?: string
  place?: string
  status: AccountStatusEnum
  role: UserRoleEnum
}

export interface IUpdateProfile {
  avatar?: string
  userName: string
  phone?: string
  dateOfBirth: Date
  gender: GenderEnum
  height?: number
  weight?: number
  bust?: number
  waist?: number
  hip?: number
  clothingSize?: string
  skinColor?: string
  currentStyle?: string
  desiredStyle?: string
  occupation?: string
  place?: string
}

export interface IGetListUser extends IPagination {
  yearOfBirth?: string
  gender?: GenderEnum
}

export interface IUserList extends IBaseData {
  email: string
  userName: string
  phone?: string
  dateOfBirth: string
  gender: GenderEnum
  subscriptionStatus: UserSubscriptionStatusEnum
  packageName: string
  totalInputToken: string
  totalOutputToken: string
}
