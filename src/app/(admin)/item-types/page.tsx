'use client'
import HeaderSection from '@/components/header/components/HeaderSection'
import Table from '@/components/table'
import { useGenerateItemTypeColumn, useItemTypes } from '@/hooks/item-type'
import { IItemType } from '@/interfaces/item-type'
import { useState } from 'react'
import UpsertItemType from './_modal/UpsertItemType'

const ItemTypes = () => {
  const { itemTypes, loading, refresh } = useItemTypes()
  const [upserttUpdateItemType, setUpserttUpdateItemType] = useState<IItemType | boolean>(false)

  return (
    <div>
      <HeaderSection title='Quản lý loại trang phục' onAddButton={() => setUpserttUpdateItemType(true)} />
      <div>
        <Table columns={useGenerateItemTypeColumn(setUpserttUpdateItemType)} data={itemTypes} loading={loading} />
      </div>

      {upserttUpdateItemType && (
        <UpsertItemType open={upserttUpdateItemType} onCancel={() => setUpserttUpdateItemType(false)} onOk={refresh} />
      )}
    </div>
  )
}

export default ItemTypes
