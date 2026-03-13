import { GenderEnum, UserRoleEnum } from '@/utils/enum/user'

export interface IRegister {
  email: string
  avatar?: string
  userName: string
  phone?: string
  dateOfBirth: Date
  gender: GenderEnum
  sub: string
}

export interface ILogin {
  email: string
  sub: string
}

export interface ITokenData {
  id: string
  name: string
  role: UserRoleEnum
}
