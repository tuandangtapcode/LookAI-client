'use client'
import { IGetListWardrobe, IGetQuantityWardrobe } from '@/interfaces/wardrobe'
import { globalSelector } from '@/redux/store'
import { SYSTEM_KEY } from '@/utils/constant/common'
import { ItemCategoryEnum } from '@/utils/enum/common'
import { getListComboKey } from '@/utils/helper/common'
import { memo } from 'react'
import { useSelector } from 'react-redux'

interface ItemCategoryMenuProps {
  quantities: IGetQuantityWardrobe[]
  itemCategory: ItemCategoryEnum
  setQuery: (callback: (prev: IGetListWardrobe) => IGetListWardrobe) => void
}

const ItemCategoryMenu = ({ quantities, itemCategory, setQuery }: ItemCategoryMenuProps) => {
  const { listSystemKey } = useSelector(globalSelector)
  const ITEM_CATEGORY = getListComboKey(SYSTEM_KEY.ITEM_CATEGORY, listSystemKey)

  return (
    <div className='flex items-center gap-x-2.5 overflow-x-auto py-2'>
      <div className='px-4 py-1.5 whitespace-nowrap border border-(--color-line) text-(--color-text-default)/70 cursor-default text-[13px]'>
        Tất cả ({quantities?.reduce((total, q) => total + Number(q.quantity || 0), 0) || 0})
      </div>
      {ITEM_CATEGORY.map((i) => (
        <div
          key={i.keyValue}
          className={`px-4 py-1.5 whitespace-nowrap text-[13px] transition-colors ${itemCategory === i.keyValue ? 'bg-(--color-ink) text-white border border-(--color-ink)' : 'border border-(--color-line) text-(--color-text-default)/70 cursor-pointer hover:border-(--color-gold)'}`}
          onClick={() => setQuery((pre) => ({ ...pre, itemCategory: Number(i.keyValue), currentPage: 1 }))}
        >
          {i.keyName} ({quantities?.find((q) => q?.itemCategory === i.keyValue)?.quantity || 0})
        </div>
      ))}
    </div>
  )
}

export default memo(ItemCategoryMenu)
