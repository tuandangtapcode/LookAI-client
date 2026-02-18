import { IUpdateUserSubscription, IUserSubscription } from '@/interfaces/user_subscription'
import axiosInstance, { IAxiosResponse } from '..'
import { apiGetSubscriptionByUser } from './url'

const getUserSubscription = (): Promise<IAxiosResponse<IUserSubscription>> =>
  axiosInstance.get(apiGetSubscriptionByUser)
const updateUserSubscription = (data: IUpdateUserSubscription): Promise<IAxiosResponse<IUserSubscription>> =>
  axiosInstance.put(apiGetSubscriptionByUser, data)

const UserSubscriptionService = {
  getUserSubscription,
  updateUserSubscription
}

export default UserSubscriptionService
