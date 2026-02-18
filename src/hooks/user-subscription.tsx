import { globalSelector } from '@/redux/store'
import UserSubscriptionService from '@/services/user-subscription'
import { apiGetSubscriptionByUser } from '@/services/user-subscription/url'
import { useSelector } from 'react-redux'
import useSWR from 'swr'

export const useUserSubscription = () => {
  const { user } = useSelector(globalSelector)
  const { data, isLoading, mutate } = useSWR(`${apiGetSubscriptionByUser}/${user?.id}`, () =>
    UserSubscriptionService.getUserSubscription()
  )
  return {
    subscription: data?.data,
    loading: isLoading,
    refresh: mutate
  }
}
