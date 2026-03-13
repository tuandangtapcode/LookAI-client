'use client'
import Spin from '@/components/spin'
import { IUser } from '@/interfaces/user'
import { formatDate } from '@/utils/helper/date'

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
      <div className='bg-white shadow-sm rounded-lg p-4'>
        <div className='flex flex-col md:flex-row md:items-start gap-4'>
          <div className='shrink-0'>
            <div className='w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center'>
              <img src={user?.avatar} alt={user?.userName} className='w-24 h-24 object-cover' />
            </div>
          </div>

          <div className='flex-1'>
            <div className='flex justify-between items-start'>
              <div>
                <h3 className='text-xl font-semibold text-gray-900'>{user?.userName}</h3>
                <div className='text-sm text-gray-500 mt-1'>{user?.email}</div>
              </div>

              <div className='flex items-center gap-2'>
                <span className={`px-2 py-1 rounded-md text-sm bg-${status.color}-100`}></span>
                <div className='flex items-center gap-2'>
                  <div className='text-sm'>
                    <span className='inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs'>
                      {status.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700'>
              <div>
                <div className='text-xs text-gray-400'>Nghề nghiệp</div>
                <div className='mt-1'>{user?.occupation}</div>
              </div>

              <div>
                <div className='text-xs text-gray-400'>Giới tính</div>
                <div className='mt-1'>{user?.gender === 1 ? 'Nam' : user?.gender === 2 ? 'Nữ' : '-'}</div>
              </div>

              <div>
                <div className='text-xs text-gray-400'>Số điện thoại</div>
                <div className='mt-1'>{user?.phone || '-'}</div>
              </div>

              <div>
                <div className='text-xs text-gray-400'>Địa chỉ</div>
                <div className='mt-1'>{user?.place || '-'}</div>
              </div>

              <div>
                <div className='text-xs text-gray-400'>Ngày sinh</div>
                <div className='mt-1'>{formatDate(user?.dateOfBirth)}</div>
              </div>

              <div>
                <div className='text-xs text-gray-400'>Ngày tham gia</div>
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
