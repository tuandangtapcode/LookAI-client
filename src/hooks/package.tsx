import Button from '@/components/button'
import icons from '@/components/icons'
import { IGetListPackage, IPackage } from '@/interfaces/package'
import PackageService from '@/services/package'
import { baseRoutePackage } from '@/services/package/urls'
import { truncateParams } from '@/utils/helper/common'
import { formatMoney } from '@/utils/helper/string'
import { Space, TableColumnsType } from 'antd'
import useSWR from 'swr'

export const usePackages = (query: IGetListPackage) => {
  const params = truncateParams(query)
  const { data, isLoading, mutate } = useSWR(`${baseRoutePackage}${params}`, () =>
    PackageService.getListPackage(query)
  )
  return {
    packages: data?.data || [],
    loading: isLoading,
    refresh: mutate
  }
}

export const useGeneratePackageColumn = (onEdit: (record: IPackage) => void) => {
  const columns: TableColumnsType<IPackage> = [
    {
      title: 'STT',
      align: 'center',
      key: 'STT',
      dataIndex: 'STT',
      render: (_: any, record: IPackage, index: number) => <div className='text-center'>{index + 1}</div>
    },
    {
      title: 'Tên gói',
      align: 'center',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: 'Thời hạn (ngày)',
      align: 'center',
      key: 'duration',
      dataIndex: 'duration'
    },
    {
      title: 'Giá (VNĐ)',
      align: 'center',
      key: 'price',
      dataIndex: 'price',
      render: (value: number) => <div className='text-center'>{formatMoney(value)}</div>
    },
    {
      title: 'Số lượng request (lượt/ngày)',
      align: 'center',
      key: 'quota',
      dataIndex: 'quota'
    },
    {
      title: 'Chức năng',
      align: 'center',
      key: 'action',
      dataIndex: 'action',
      render: (_: any, record: IPackage) => (
        <Space>
          <Button icon={icons.ICON_EDIT} tooltip='Chỉnh sửa' onClick={() => onEdit(record)} type='circle' />
        </Space>
      )
    }
  ]

  return columns
}
