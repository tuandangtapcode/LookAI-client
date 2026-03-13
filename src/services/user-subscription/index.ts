import { IGetListResponse } from '@/interfaces/common'
import {
  IGetUserSubscriptionHistory,
  IUpdateUserSubscription,
  IUserSubscription,
  IUserSubscriptionHistory
} from '@/interfaces/user-subscription'
import axiosInstance, { IAxiosResponse } from '..'
import { apiGetSubscriptionByUser, apiGetUserSubscriptionHistory, baseRouteUserSubscription } from './url'

const getUserSubscription = (): Promise<IAxiosResponse<IUserSubscription>> =>
  axiosInstance.get(apiGetSubscriptionByUser)
const updateUserSubscription = (data: IUpdateUserSubscription): Promise<IAxiosResponse<IUserSubscription>> =>
  axiosInstance.put(apiGetSubscriptionByUser, data)
const getDetailUserSubscription = (userId: string): Promise<IAxiosResponse<IUserSubscription>> =>
  axiosInstance.get(`${baseRouteUserSubscription}/${userId}`)
const getUserSubscriptionHistory = (
  params: IGetUserSubscriptionHistory
): Promise<IAxiosResponse<IGetListResponse<IUserSubscriptionHistory>>> =>
  axiosInstance.get(apiGetUserSubscriptionHistory, { params })

const UserSubscriptionService = {
  getUserSubscription,
  updateUserSubscription,
  getDetailUserSubscription,
  getUserSubscriptionHistory
}

export default UserSubscriptionService
