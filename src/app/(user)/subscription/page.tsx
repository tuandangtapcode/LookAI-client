'use client'
import Spin from '@/components/spin'
import { useGenerateUserSubscriptionDetail, useUserSubscription } from '@/hooks/user-subscription'
import { Card, Descriptions } from 'antd'

const Subscription = () => {
  const { subscription, loading } = useUserSubscription()

  return (
    <Spin loading={loading}>
      <Card title='Thông tin gói đăng ký'>
        <Descriptions bordered column={1} items={useGenerateUserSubscriptionDetail(subscription)} />
      </Card>
    </Spin>
  )
}

export default Subscription
