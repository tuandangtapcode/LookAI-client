import { IGetListOutfitAdvice, IOutfitAdvice } from '@/interfaces/outfit-adivce'
import { formatDate } from '@/utils/helper/date'
import { TableColumnsType } from 'antd'

export const useGenerateOutfitAdviceColumn = (query: IGetListOutfitAdvice) => {
  const columns: TableColumnsType<IOutfitAdvice> = [
    {
      title: 'STT',
      align: 'center',
      key: 'STT',
      dataIndex: 'STT',
      render: (_: any, record: IOutfitAdvice, index: number) => (
        <div className='text-center'>{query.pageSize * (query.currentPage - 1) + index + 1}</div>
      )
    },
    {
      title: 'Input Token',
      align: 'center',
      key: 'inputToken',
      dataIndex: 'inputToken'
    },
    {
      title: 'Output Token',
      align: 'center',
      key: 'outputToken',
      dataIndex: 'outputToken'
    },
    {
      title: 'Tên gói dịch vụ',
      align: 'center',
      key: 'packageName',
      dataIndex: 'packageName'
    },
    {
      title: 'Ngày tạo',
      align: 'center',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (createdAt: string) => <div className='text-center'>{formatDate(createdAt, true)}</div>
    }
  ]

  return columns
}
