import Button from '@/components/button'
import icons from '@/components/icons'
import { IExpense, IGetListExpense } from '@/interfaces/expense'
import { formatDate } from '@/utils/helper/date'
import { formatMoney } from '@/utils/helper/string'
import { Space, TableColumnsType } from 'antd'

export const useGenerateExpenseColumn = (query: IGetListExpense, onEdit: (record: IExpense) => void) => {
  const columns: TableColumnsType<IExpense> = [
    {
      title: 'STT',
      align: 'center',
      key: 'STT',
      dataIndex: 'STT',
      render: (_: any, record: IExpense, index: number) => (
        <div className='text-center'>{query.pageSize * (query.currentPage - 1) + index + 1}</div>
      )
    },
    {
      title: 'Loại chi phí',
      align: 'center',
      key: 'type',
      dataIndex: 'type'
    },
    {
      title: 'Giá',
      align: 'center',
      key: 'amount',
      dataIndex: 'amount',
      render: (value: number) => <div className='text-center'>{formatMoney(value)}vnđ</div>
    },
    {
      title: 'Chi phí cho tháng/năm',
      align: 'center',
      key: 'month/year',
      dataIndex: 'month/year',
      render: (_: any, record: IExpense) => (
        <div className='text-center'>
          Tháng {record?.forMonth}/{record?.forYear}
        </div>
      )
    },
    {
      title: 'Ngày thanh toán',
      align: 'center',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (value: string) => <div className='text-center'>{formatDate(value, true)}</div>
    },
    {
      title: 'Chức năng',
      align: 'center',
      key: 'action',
      dataIndex: 'action',
      render: (_: any, record: IExpense) => (
        <Space>
          <Button icon={icons.ICON_EDIT} tooltip='Chỉnh sửa' onClick={() => onEdit(record)} type='circle' />
        </Space>
      )
    }
  ]

  return columns
}
