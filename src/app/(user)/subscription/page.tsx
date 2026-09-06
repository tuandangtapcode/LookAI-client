'use client'
import Spin from '@/components/spin'
import { useGenerateUserSubscriptionDetail, useUserSubscription } from '@/hooks/user-subscription'
import { Card, Descriptions } from 'antd'

const Subscription = () => {
  const { subscription, loading } = useUserSubscription()

  return (
    <Spin loading={loading}>
      <span className='tracking-label mb-2 block text-(--color-gold)'>Gói đăng ký</span>
      <Card title='Thông tin gói đăng ký' className='border-(--color-line)!'>
        <Descriptions bordered column={1} items={useGenerateUserSubscriptionDetail(subscription)} />
      </Card>
    </Spin>
  )
}

export default Subscription
