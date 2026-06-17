import Tag from '@/components/tag'
import { IPackage } from '@/interfaces/package'
import {
  IGetUserSubscriptionHistory,
  IUserSubscription,
  IUserSubscriptionHistory
} from '@/interfaces/user-subscription'
import { globalSelector } from '@/redux/store'
import UserSubscriptionService from '@/services/user-subscription'
import { apiGetSubscriptionByUser } from '@/services/user-subscription/url'
import { SYSTEM_KEY } from '@/utils/constant/common'
import { SubscriptionHistoryStatusEnum } from '@/utils/enum/subscription-history'
import { UserSubscriptionStatusEnum } from '@/utils/enum/user_subscription'
import { getListComboKey } from '@/utils/helper/common'
import { formatDate } from '@/utils/helper/date'
import { formatMoney } from '@/utils/helper/string'
import { DescriptionsProps, TableColumnsType } from 'antd'
import { useSelector } from 'react-redux'
import useSWR from 'swr'

export const useUserSubscription = () => {
  const { user } = useSelector(globalSelector)
  const { data, isLoading, mutate } = useSWR(user ? `${apiGetSubscriptionByUser}/${user?.id}` : null, () =>
    UserSubscriptionService.getUserSubscription()
  )

  return {
    subscription: data?.data,
    loading: isLoading,
    refresh: mutate
  }
}

export const useGenerateUserSubscriptionDetail = (subscription?: IUserSubscription | undefined) => {
  const { listSystemKey } = useSelector(globalSelector)
  const USER_SUBSCRIPTION_STATUS = getListComboKey(SYSTEM_KEY.USER_SUBSCRIPTION_STATUS, listSystemKey)

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Tên gói',
      children: subscription?.package?.name
    },
    {
      key: '2',
      label: 'Mô tả',
      children: <div dangerouslySetInnerHTML={{ __html: subscription?.package?.description || '' }} />
    },
    {
      key: '3',
      label: 'Giá',
      children: `${formatMoney(subscription?.package?.price || 0)} VNĐ`
    },
    {
      key: '4',
      label: 'Thời hạn',
      children: subscription?.package?.duration ? `${subscription?.package?.duration} ngày` : 'Không giới hạn'
    },
    {
      key: '5',
      label: 'Lượt tư vấn',
      children: subscription?.package?.quota
    },
    {
      key: '6',
      label: 'Ngày bắt đầu',
      children: formatDate(subscription?.startDate)
    },
    {
      key: '7',
      label: 'Ngày kết thúc',
      children: formatDate(subscription?.endDate)
    },
    {
      key: '8',
      label: 'Lượt tư vấn đã sử dụng',
      children: subscription?.usedQuota
    },
    {
      key: '9',
      label: 'Trạng thái',
      children: (
        <Tag
          systemkeys={USER_SUBSCRIPTION_STATUS}
          colors={['success', 'warning', 'default']}
          value={subscription?.status || UserSubscriptionStatusEnum.ACTIVE}
        />
      )
    }
  ]

  return items
}

export const useGenerateUserSubscriptionHistory = (query: IGetUserSubscriptionHistory) => {
  const { listSystemKey } = useSelector(globalSelector)
  const SUBSCRIPTION_HISTORY_STATUS = getListComboKey(SYSTEM_KEY.SUBSCRIPTION_HISTORY_STATUS, listSystemKey)

  const columns: TableColumnsType<IUserSubscriptionHistory> = [
    {
      title: 'STT',
      align: 'center',
      key: 'STT',
      dataIndex: 'STT',
      render: (_: any, record: IUserSubscriptionHistory, index: number) => (
        <div className='text-center'>{query.pageSize * (query.currentPage - 1) + index + 1}</div>
      )
    },
    {
      title: 'Tên gói dịch vụ',
      align: 'center',
      key: 'package',
      dataIndex: 'package',
      render: (value: IPackage) => <div className='text-center'>{value?.name}</div>
    },
    {
      title: 'Trạng thái',
      align: 'center',
      key: 'status',
      dataIndex: 'status',
      render: (value: SubscriptionHistoryStatusEnum) => (
        <div className='text-center'>
          {SUBSCRIPTION_HISTORY_STATUS.find((item) => item.keyValue === value)?.keyName}
        </div>
      )
    },
    {
      title: 'Ngày tạo',
      align: 'center',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (value: string) => <div className='text-center'>{formatDate(value, true)}</div>
    }
  ]

  return columns
}
