import Button from '@/components/button'
import icons from '@/components/icons'
import { ISystemkey } from '@/interfaces/systemkey'
import { Space, TableColumnsType } from 'antd'

export const useGenerateSystemkeyColumns = (onCreate: (parentId: string) => void) => {
  const columns: TableColumnsType<ISystemkey> = [
    {
      title: 'STT',
      align: 'center',
      key: 'STT',
      dataIndex: 'STT',
      render: (_: any, record: ISystemkey, index: number) => <div className='text-center'>{index + 1}</div>
    },
    {
      title: 'Key name',
      align: 'center',
      key: 'keyName',
      dataIndex: 'keyName',
      render: (value: string) => <div className='w-70 truncate'>{value}</div>
    },
    {
      title: 'Key value',
      align: 'center',
      key: 'keyValue',
      dataIndex: 'keyValue',
      render: (value: string) => <div className='w-70 truncate'>{value}</div>
    },
    {
      title: 'Chức năng',
      align: 'center',
      key: 'action',
      dataIndex: 'action',
      render: (_: any, record: ISystemkey) => {
        if (record.parentId) {
          return null
        }

        return (
          <Space>
            <Button
              icon={icons.ICON_PLUS}
              tooltip='Thêm children key'
              onClick={() => onCreate(record?.id)}
              type='circle'
            />
          </Space>
        )
      }
    }
  ]

  return columns
}
