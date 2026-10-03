import { GenderEnum, UserRoleEnum } from '@/utils/enum/user'

export interface IRegister {
  code: string
  phone?: string
  dateOfBirth: Date
  gender: GenderEnum
}

export interface ILogin {
  code: string
}

export interface ITokenData {
  id: string
  name: string
  role: UserRoleEnum
}
