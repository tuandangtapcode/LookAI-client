'use client'
import Spin from '@/components/spin'
import Tag from '@/components/tag'
import { useUserSubscription } from '@/hooks/user-subscription'
import { globalSelector } from '@/redux/store'
import { SYSTEM_KEY } from '@/utils/constant/common'
import { UserSubscriptionStatusEnum } from '@/utils/enum/user_subscription'
import { getListComboKey } from '@/utils/helper/common'
import { formatMoney } from '@/utils/helper/string'
import { Card, Descriptions } from 'antd'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'

const Subscription = () => {
  const { subscription, loading } = useUserSubscription()
  const { listSystemKey } = useSelector(globalSelector)
  const USER_SUBSCRIPTION_STATUS = getListComboKey(SYSTEM_KEY.USER_SUBSCRIPTION_STATUS, listSystemKey)

  return (
    <Spin loading={loading}>
      <Card title='Thông tin gói đăng ký'>
        <Descriptions bordered column={1}>
          <Descriptions.Item label='Tên gói'>{subscription?.package?.name}</Descriptions.Item>
          <Descriptions.Item label='Mô tả'>
            <div dangerouslySetInnerHTML={{ __html: subscription?.package?.description || '' }} />
          </Descriptions.Item>
          <Descriptions.Item label='Giá'>{formatMoney(subscription?.package?.price || 0)} VNĐ</Descriptions.Item>
          <Descriptions.Item label='Thời hạn'>
            {subscription?.package?.duration ? `${subscription?.package?.duration} ngày` : 'Không giới hạn'}
          </Descriptions.Item>
          <Descriptions.Item label='Lượt tư vấn'>{subscription?.package?.quota}</Descriptions.Item>
          <Descriptions.Item label='Ngày bắt đầu'>
            {subscription?.startDate ? dayjs(subscription?.startDate).format('DD/MM/YYYY') : ''}
          </Descriptions.Item>
          <Descriptions.Item label='Ngày kết thúc'>
            {subscription?.endDate ? dayjs(subscription?.endDate).format('DD/MM/YYYY') : ''}
          </Descriptions.Item>
          <Descriptions.Item label='Lượt tư vấn đã sử dụng'>{subscription?.usedQuota}</Descriptions.Item>
          <Descriptions.Item label='Trạng thái'>
            <Tag
              systemkeys={USER_SUBSCRIPTION_STATUS}
              colors={['success', 'warning', 'default']}
              value={subscription?.status || UserSubscriptionStatusEnum.ACTIVE}
            />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Spin>
  )
}

export default Subscription
