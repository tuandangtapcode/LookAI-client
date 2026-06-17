import Button from '@/components/button'
import icons from '@/components/icons'
import { IItemType } from '@/interfaces/item-type'
import { IGetQuantityWardrobe } from '@/interfaces/wardrobe'
import { globalSelector } from '@/redux/store'
import ItemTypeService from '@/services/item-type'
import { baseRouteItemType } from '@/services/item-type/urls'
import { SYSTEM_KEY } from '@/utils/constant/common'
import { ItemCategoryEnum } from '@/utils/enum/common'
import { getListComboKey } from '@/utils/helper/common'
import { MenuProps, Space, TableColumnsType } from 'antd'
import { useSelector } from 'react-redux'
import useSWR from 'swr'

export const useItemTypes = () => {
  const { data, isLoading, mutate } = useSWR(baseRouteItemType, () => ItemTypeService.getListItemType())

  return {
    itemTypes: data?.data || [],
    loading: isLoading,
    refresh: mutate
  }
}

export const useGenerateItemTypeColumn = (onEdit: (record: IItemType) => void) => {
  const { listSystemKey } = useSelector(globalSelector)
  const ITEM_CATEGORY = getListComboKey(SYSTEM_KEY.ITEM_CATEGORY, listSystemKey)

  const columns: TableColumnsType<IItemType> = [
    {
      title: 'STT',
      align: 'center',
      key: 'STT',
      dataIndex: 'STT',
      render: (_: any, record: IItemType, index: number) => <div className='text-center'>{index + 1}</div>
    },
    {
      title: 'Loại trang phục',
      align: 'center',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: 'Danh mục',
      align: 'center',
      key: 'category',
      dataIndex: 'category',
      render: (value: ItemCategoryEnum) => (
        <div className='text-center'>{ITEM_CATEGORY?.find((i) => i?.keyValue === value)?.keyName}</div>
      )
    },
    {
      title: 'Chức năng',
      align: 'center',
      key: 'action',
      dataIndex: 'action',
      render: (_: any, record: IItemType) => (
        <Space>
          <Button icon={icons.ICON_EDIT} tooltip='Chỉnh sửa' onClick={() => onEdit(record)} type='circle' />
        </Space>
      )
    }
  ]

  return columns
}

export const useGenerateItemCategoryMenu = (quantities: IGetQuantityWardrobe[]) => {
  const menu: MenuProps['items'] = [
    {
      key: `all`,
      label: `Tất cả (${quantities?.reduce((acc, i) => acc + Number(i?.quantity || 0), 0)})`,
      icon: icons.ICON_DASBOARD
    },
    {
      key: `${ItemCategoryEnum.TOP}`,
      label: `Áo (${quantities?.find((i) => i?.itemCategory === ItemCategoryEnum.TOP)?.quantity || 0})`,
      icon: icons.ICON_TOP
    },
    {
      key: `${ItemCategoryEnum.BOTTOM}`,
      label: `Quần (${quantities?.find((i) => i?.itemCategory === ItemCategoryEnum.BOTTOM)?.quantity || 0})`,
      icon: icons.ICON_BOTTOM
    },
    {
      key: `${ItemCategoryEnum.JEWELRY}`,
      label: `Trang sức (${quantities?.find((i) => i?.itemCategory === ItemCategoryEnum.JEWELRY)?.quantity || 0})`,
      icon: icons.ICON_JEWELRY
    },
    {
      key: `${ItemCategoryEnum.FOOTWEAR}`,
      label: `Giầy dép (${quantities?.find((i) => i?.itemCategory === ItemCategoryEnum.FOOTWEAR)?.quantity || 0})`,
      icon: icons.ICON_FOOTWEAR
    },
    {
      key: `${ItemCategoryEnum.ACCESSORY}`,
      label: `Phụ kiện (${quantities?.find((i) => i?.itemCategory === ItemCategoryEnum.ACCESSORY)?.quantity || 0})`,
      icon: icons.ICON_ACCESSORY
    },
    {
      key: `${ItemCategoryEnum.DRESS}`,
      label: `Váy (${quantities?.find((i) => i?.itemCategory === ItemCategoryEnum.DRESS)?.quantity || 0})`,
      icon: icons.ICON_DRESS
    },
    {
      key: `${ItemCategoryEnum.SKIRT}`,
      label: `Váy ngắn (${quantities?.find((i) => i?.itemCategory === ItemCategoryEnum.SKIRT)?.quantity || 0})`,
      icon: icons.ICON_SKIRT
    },
    {
      key: `create`,
      label: 'Thêm trang phục',
      icon: icons.ICON_PLUS_FS20
    }
  ]

  return menu
}
