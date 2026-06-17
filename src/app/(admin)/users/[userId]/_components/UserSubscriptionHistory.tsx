'use client'
import Spin from '@/components/spin'
import Table from '@/components/table'
import { useGenerateUserSubscriptionHistory } from '@/hooks/user-subscription'
import { IGetUserSubscriptionHistory, IUserSubscriptionHistory } from '@/interfaces/user-subscription'
import UserSubscriptionService from '@/services/user-subscription'
import { logError } from '@/utils/helper/log'
import notify from '@/utils/notify'
import { useEffect, useState } from 'react'

interface UserSubscriptionHistoryProps {
  userId: string
}

const UserSubscriptionHistory = ({ userId }: UserSubscriptionHistoryProps) => {
  const [subscriptionHistories, setSubscriptionHistories] = useState<IUserSubscriptionHistory[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState<IGetUserSubscriptionHistory>({
    currentPage: 1,
    pageSize: 10,
    textSearch: '',
    userId
  })

  const getUserSubscriptionHistory = async () => {
    try {
      setLoading(true)

      const res = await UserSubscriptionService.getUserSubscriptionHistory(query)
      if (res?.error) return notify('error', res?.msg)

      setSubscriptionHistories(res?.data?.list)
      setTotal(res?.data?.total)
    } catch (error) {
      logError('UserSubscriptionHistory.tsx-getUserSubscriptionHistory', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserSubscriptionHistory()
  }, [query, userId])

  return (
    <Spin loading={loading}>
      <div className='shadow-sm'>
        <Table
          columns={useGenerateUserSubscriptionHistory(query)}
          data={subscriptionHistories}
          total={total}
          setPagination={setQuery}
        />
      </div>
    </Spin>
  )
}

export default UserSubscriptionHistory
