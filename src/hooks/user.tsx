import Button from '@/components/button'
import icons from '@/components/icons'
import Tag from '@/components/tag'
import { IGetListUser, IUserList } from '@/interfaces/user'
import { globalSelector } from '@/redux/store'
import { SYSTEM_KEY } from '@/utils/constant/common'
import { GenderEnum } from '@/utils/enum/user'
import { getListComboKey } from '@/utils/helper/common'
import { formatDate } from '@/utils/helper/date'
import { Space, TableColumnsType } from 'antd'
import { useSelector } from 'react-redux'

export const useGenerateUserColumn = (query: IGetListUser, onView: (userId: string) => void) => {
  const { listSystemKey } = useSelector(globalSelector)
  const GENDER = getListComboKey(SYSTEM_KEY.GENDER, listSystemKey)
  const USER_SUBSCRIPTION_STATUS = getListComboKey(SYSTEM_KEY.USER_SUBSCRIPTION_STATUS, listSystemKey)

  const columns: TableColumnsType<IUserList> = [
    {
      title: 'STT',
      width: 70,
      align: 'center',
      key: 'STT',
      render: (_: any, record: IUserList, index: number) => (
        <div className='text-center'>{query.pageSize * (query.currentPage - 1) + index + 1}</div>
      )
    },
    {
      title: 'Tên tài khoản',
      width: 180,
      align: 'center',
      key: 'userName',
      dataIndex: 'userName'
    },
    {
      title: 'Email',
      width: 240,
      align: 'center',
      key: 'email',
      dataIndex: 'email'
    },
    {
      title: 'Số điện thoại',
      width: 150,
      align: 'center',
      key: 'phone',
      dataIndex: 'phone'
    },
    {
      title: 'Giới tính',
      width: 120,
      align: 'center',
      key: 'gender',
      dataIndex: 'gender',
      render: (value: GenderEnum) => (
        <div className='text-center'>{GENDER.find((i) => i.keyValue === value)?.keyName}</div>
      )
    },
    {
      title: 'Ngày sinh',
      width: 150,
      align: 'center',
      key: 'dateOfBirth',
      dataIndex: 'dateOfBirth',
      render: (value: string) => <div className='text-center'>{formatDate(value)}</div>
    },
    {
      title: 'Dịch vụ đang sử dụng',
      width: 200,
      align: 'center',
      key: 'packageName',
      dataIndex: 'packageName'
    },
    {
      title: 'Trạng thái',
      width: 150,
      align: 'center',
      key: 'subscriptionStatus',
      dataIndex: 'subscriptionStatus',
      render: (value: number) => (
        <div className='text-center'>
          <Tag systemkeys={USER_SUBSCRIPTION_STATUS} colors={['success', 'warning', 'default']} value={value} />
        </div>
      )
    },
    {
      title: 'Input Token',
      width: 140,
      align: 'center',
      key: 'totalInputToken',
      dataIndex: 'totalInputToken'
    },
    {
      title: 'Output Token',
      width: 150,
      align: 'center',
      key: 'totalOutputToken',
      dataIndex: 'totalOutputToken'
    },
    {
      title: 'Chức năng',
      width: 120,
      align: 'center',
      key: 'action',
      render: (_: string, record: IUserList) => (
        <Space>
          <Button icon={icons.ICON_VIEW} tooltip='Chi tiết' onClick={() => onView(record?.id)} type='circle' />
        </Space>
      )
    }
  ]

  return columns
}
