import { SubscriptionHistoryStatusEnum } from '@/utils/enum/subscription-history'
import { IBaseData, IPagination } from './common'
import { IPackage } from './package'
import { IUser } from './user'

export interface ICreatePayment {
  packageId: string
  amount: number
  orderCode: string
  subscriptionHistoryStatus: SubscriptionHistoryStatusEnum
}

export interface IPayment extends IBaseData {
  user: IUser
  package: IPackage
  amount: number
  orderCode: string
}

export interface IGetListPayment extends IPagination {
  packageName?: string
  orderCode?: string
}
