'use client'
import HeaderSection from '@/components/header/components/HeaderSection'
import Spin from '@/components/spin'
import Table from '@/components/table'
import { useGenerateItemTypeColumn, useItemTypes } from '@/hooks/item-type'
import { IItemType } from '@/interfaces/item-type'
import { useState } from 'react'
import UpsertItemType from './_modal/UpsertItemType'

const ItemTypes = () => {
  const { itemTypes, loading, refresh } = useItemTypes()
  const [openUpserttUpdateItemType, setOpenUpserttUpdateItemType] = useState<IItemType | boolean>(false)

  return (
    <Spin loading={loading}>
      <HeaderSection title='Quản lý loại trang phục' onAddButton={() => setOpenUpserttUpdateItemType(true)} />
      <div>
        <Table columns={useGenerateItemTypeColumn(setOpenUpserttUpdateItemType)} data={itemTypes} />
      </div>

      {openUpserttUpdateItemType && (
        <UpsertItemType
          open={openUpserttUpdateItemType}
          onCancel={() => setOpenUpserttUpdateItemType(false)}
          onOk={refresh}
        />
      )}
    </Spin>
  )
}

export default ItemTypes
