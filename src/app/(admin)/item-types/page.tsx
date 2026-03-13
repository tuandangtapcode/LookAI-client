'use client'
import HeaderSection from '@/components/header/components/HeaderSection'
import Table from '@/components/table'
import { useGenerateItemTypeColumn, useItemTypes } from '@/hooks/item-type'
import { IItemType } from '@/interfaces/item-type'
import { useState } from 'react'
import UpsertItemType from './_modal/UpsertItemType'

const ItemTypes = () => {
  const { itemTypes, loading, refresh } = useItemTypes()
  const [openUpserttUpdateItemType, setOpenUpserttUpdateItemType] = useState<IItemType | boolean>(false)

  return (
    <div>
      <HeaderSection title='Quản lý loại trang phục' onAddButton={() => setOpenUpserttUpdateItemType(true)} />
      <div>
        <Table columns={useGenerateItemTypeColumn(setOpenUpserttUpdateItemType)} data={itemTypes} loading={loading} />
      </div>

      {openUpserttUpdateItemType && (
        <UpsertItemType
          open={openUpserttUpdateItemType}
          onCancel={() => setOpenUpserttUpdateItemType(false)}
          onOk={refresh}
        />
      )}
    </div>
  )
}

export default ItemTypes
