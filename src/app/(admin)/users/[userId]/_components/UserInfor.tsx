'use client'
import Spin from '@/components/spin'
import { IUser } from '@/interfaces/user'
import { formatDate } from '@/utils/helper/date'
import { Tag, Typography } from 'antd'

const { Title, Text } = Typography

interface UserInforProps {
  user: IUser | undefined
  loading: boolean
}

const UserInfor = ({ user, loading }: UserInforProps) => {
  const getStatus = (status?: number) => {
    switch (status) {
      case 1:
        return { label: 'Normal', color: 'default' }
      case 2:
        return { label: 'Premium', color: 'gold' }
      case 3:
        return { label: 'Premium Expired', color: 'orange' }
      case 4:
        return { label: 'Banned', color: 'red' }
      default:
        return { label: '-', color: 'default' }
    }
  }

  const status = getStatus(user?.status)

  return (
    <Spin loading={loading}>
      <div className='bg-white border border-(--color-line) p-6'>
        <div className='flex flex-col md:flex-row md:items-start gap-4'>
          <div className='shrink-0'>
            <div className='w-24 h-24 rounded-full overflow-hidden bg-(--color-ivory-deep) flex items-center justify-center'>
              <img src={user?.avatar} alt={user?.userName} className='w-24 h-24 object-cover' />
            </div>
          </div>

          <div className='flex-1'>
            <div className='flex justify-between items-start'>
              <div>
                <Title level={4} className='mb-0!'>
                  {user?.userName}
                </Title>
                <Text className='text-(--color-text-default)/60'>{user?.email}</Text>
              </div>

              <div className='flex items-center gap-2'>
                {status.color === 'default' ? (
                  <Tag>{status.label}</Tag>
                ) : (
                  <Tag color={status.color}>{status.label}</Tag>
                )}
              </div>
            </div>

            <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-(--color-text-default)'>
              <div>
                <div className='tracking-label text-(--color-ink)/40'>Nghề nghiệp</div>
                <div className='mt-1'>{user?.occupation}</div>
              </div>

              <div>
                <div className='tracking-label text-(--color-ink)/40'>Giới tính</div>
                <div className='mt-1'>{user?.gender === 1 ? 'Nam' : user?.gender === 2 ? 'Nữ' : '-'}</div>
              </div>

              <div>
                <div className='tracking-label text-(--color-ink)/40'>Số điện thoại</div>
                <div className='mt-1'>{user?.phone || '-'}</div>
              </div>

              <div>
                <div className='tracking-label text-(--color-ink)/40'>Địa chỉ</div>
                <div className='mt-1'>{user?.place || '-'}</div>
              </div>

              <div>
                <div className='tracking-label text-(--color-ink)/40'>Ngày sinh</div>
                <div className='mt-1'>{formatDate(user?.dateOfBirth)}</div>
              </div>

              <div>
                <div className='tracking-label text-(--color-ink)/40'>Ngày tham gia</div>
                <div className='mt-1'>{formatDate(user?.createdAt)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default UserInfor
