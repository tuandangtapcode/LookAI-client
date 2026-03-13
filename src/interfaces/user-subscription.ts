import { IPackage } from '@/interfaces/package'
import { SubscriptionHistoryStatusEnum } from '@/utils/enum/subscription-history'
import { UserSubscriptionStatusEnum } from '@/utils/enum/user_subscription'
import { IBaseData, IPagination } from './common'
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

export interface IUserSubscriptionHistory extends IBaseData {
  package: IPackage
  status: SubscriptionHistoryStatusEnum
}

export interface IGetUserSubscriptionHistory extends IPagination {
  userId: string
}
