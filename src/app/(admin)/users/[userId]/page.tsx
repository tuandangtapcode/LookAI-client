'use client'
import HeaderDetail from '@/components/header/components/HeaderDetail'
import { IUser } from '@/interfaces/user'
import UserService from '@/services/user'
import { logError } from '@/utils/helper/log'
import notify from '@/utils/notify'
import { Tabs, TabsProps } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import OutfitAdvice from './_components/OutfitAdvice'
import UserInfor from './_components/UserInfor'
import UserSubscription from './_components/UserSubscription'
import UserSubscriptionHistory from './_components/UserSubscriptionHistory'

const UserDetail = () => {
  const { userId } = useParams<{ userId: string }>()
  const [user, setUser] = useState<IUser>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('1')

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Thông tin người dùng',
      children: <UserInfor user={user} loading={loading} />
    },
    {
      key: '2',
      label: 'Thông tin gói dịch vụ',
      children: <UserSubscription userId={userId} />
    },
    {
      key: '3',
      label: 'Lịch sử tư vấn',
      children: <OutfitAdvice userId={userId} />
    },
    {
      key: '4',
      label: 'Lịch sử gói dịch vụ',
      children: <UserSubscriptionHistory userId={userId} />
    }
  ]

  const getDetailUser = async () => {
    try {
      setLoading(true)

      const res = await UserService.getDetailUser(userId)
      if (res?.error) return notify('error', res?.msg)

      setUser(res?.data)
    } catch (error) {
      logError('UserDetail.tsx-getDetailUser', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDetailUser()
  }, [userId])

  return (
    <div>
      <HeaderDetail title={user?.userName || ''} onBack={() => router.back()} />
      <Tabs activeKey={activeTab} items={items} onChange={setActiveTab} />
    </div>
  )
}

export default UserDetail
