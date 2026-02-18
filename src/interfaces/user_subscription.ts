import { UserSubscriptionStatusEnum } from '@/utils/enum/user_subscription'
import { IBaseData } from './common'
import { IPackage } from './package'
import { IUser } from './user'

export interface IUserSubscription extends IBaseData {
  user: IUser
  package: IPackage
  startDate: Date
  endDate: Date
  quota: number
  usedQuota: number
  status: UserSubscriptionStatusEnum
}

export interface IUpdateUserSubscription {
  userSubscriptionId: string
}
