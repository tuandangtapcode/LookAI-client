'use client'
import Spin from '@/components/spin'
import { useGenerateUserSubscriptionDetail } from '@/hooks/user-subscription'
import { IUserSubscription } from '@/interfaces/user-subscription'
import UserSubscriptionService from '@/services/user-subscription'
import notify from '@/utils/notify'
import { Descriptions } from 'antd'
import { useEffect, useState } from 'react'

interface UserSubscriptionProps {
  userId: string
}

const UserSubscription = ({ userId }: UserSubscriptionProps) => {
  const [userSubscription, setUserSubscription] = useState<IUserSubscription>()
  const [loading, setLoading] = useState(false)

  const getDetailUserSubscription = async () => {
    try {
      setLoading(true)
      const res = await UserSubscriptionService.getDetailUserSubscription(userId)
      if (res?.error) return notify('error', res?.msg)
      setUserSubscription(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDetailUserSubscription()
  }, [userId])

  return (
    <Spin loading={loading}>
      <div className='shadow-sm'>
        <Descriptions bordered column={1} items={useGenerateUserSubscriptionDetail(userSubscription)} />
      </div>
    </Spin>
  )
}

export default UserSubscription
