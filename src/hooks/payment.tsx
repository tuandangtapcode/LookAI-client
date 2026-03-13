import { IPackage } from '@/interfaces/package'
import { IGetListPayment, IPayment } from '@/interfaces/payment'
import { IUser } from '@/interfaces/user'
import { routes } from '@/utils/constant/route'
import { formatDate } from '@/utils/helper/date'
import { formatMoney } from '@/utils/helper/string'
import { TableColumnsType } from 'antd'
import Link from 'next/link'

export const useGeneratePaymentColumn = (query: IGetListPayment) => {
  const columns: TableColumnsType<IPayment> = [
    {
      title: 'STT',
      align: 'center',
      key: 'STT',
      dataIndex: 'STT',
      render: (_: any, record: IPayment, index: number) => (
        <div className='text-center'>{query.pageSize * (query.currentPage - 1) + index + 1}</div>
      )
    },
    {
      title: 'Tên người dùng',
      align: 'center',
      key: 'user',
      dataIndex: 'user',
      render: (value: IUser) => (
        <Link href={`${routes.users.source}/${value?.id}`} className='text-center'>
          {value?.userName}
        </Link>
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
      title: 'Giá',
      align: 'center',
      key: 'amount',
      dataIndex: 'amount',
      render: (value: number) => <div className='text-center'>{formatMoney(value)}vnđ</div>
    },
    {
      title: 'Mã thanh toán',
      align: 'center',
      key: 'orderCode',
      dataIndex: 'orderCode'
    },
    {
      title: 'Ngày thanh toán',
      align: 'center',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (value: string) => <div className='text-center'>{formatDate(value, true)}</div>
    }
  ]

  return columns
}
