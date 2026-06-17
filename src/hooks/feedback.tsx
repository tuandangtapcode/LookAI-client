import Button from '@/components/button'
import icons from '@/components/icons'
import { IFeedback } from '@/interfaces/feedback'
import { globalSelector } from '@/redux/store'
import { SYSTEM_KEY } from '@/utils/constant/common'
import { FeedbackTypeEnum } from '@/utils/enum/feedback'
import { getListComboKey } from '@/utils/helper/common'
import { Space, TableColumnsType } from 'antd'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'

export const useGenerateFeedbackColumn = (onEdit: (record: IFeedback) => void) => {
  const { listSystemKey } = useSelector(globalSelector)
  const FEEDBACK_TYPE = getListComboKey(SYSTEM_KEY.FEEDBACK_TYPE, listSystemKey)

  const columns: TableColumnsType<IFeedback> = [
    {
      title: 'STT',
      align: 'center',
      key: 'STT',
      dataIndex: 'STT',
      render: (_: any, record: IFeedback, index: number) => <div className='text-center'>{index + 1}</div>
    },
    {
      title: 'Nội dung',
      align: 'center',
      key: 'content',
      dataIndex: 'content',
      render: (value: string) => <div className='w-70 truncate'>{value}</div>
    },
    {
      title: 'Loại phản hồi',
      align: 'center',
      key: 'type',
      dataIndex: 'type',
      render: (value: FeedbackTypeEnum) => (
        <div className='text-center'>{FEEDBACK_TYPE?.find((i) => i?.keyValue === value)?.keyName}</div>
      )
    },
    {
      title: 'Ngày tạo',
      align: 'center',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (value: string) => <div className='text-center'>{dayjs(value).format('DD/MM/YYYY HH:mm')}</div>
    },
    {
      title: 'Chức năng',
      align: 'center',
      key: 'action',
      dataIndex: 'action',
      render: (_: any, record: IFeedback) => (
        <Space>
          <Button icon={icons.ICON_EDIT} tooltip='Chỉnh sửa' onClick={() => onEdit(record)} type='circle' />
        </Space>
      )
    }
  ]

  return columns
}
