import { AccountStatusEnum, GenderEnum, UserRoleEnum } from '@/utils/enum/user'
import { IBaseData } from './common'

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
  clothingSize?: string
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
}
