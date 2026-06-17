'use client'
import Modal from '@/components/modal'
import { useCheckDeviceScreen } from '@/hooks/common'
import { IItemType } from '@/interfaces/item-type'
import { IGetListWardrobe } from '@/interfaces/wardrobe'
import { BooleanEnum } from '@/utils/enum/common'
import { Checkbox, Col, Input, Row, Select } from 'antd'
import { useState } from 'react'

interface FilterModalProps {
  open: boolean
  onCancel: () => void
  query: IGetListWardrobe
  debouncedChangeQuery: (newQuery: IGetListWardrobe) => void
  itemTypes?: IItemType[]
}

const FilterModal = ({ open, onCancel, query, debouncedChangeQuery, itemTypes }: FilterModalProps) => {
  const isMobile = useCheckDeviceScreen('mobile')
  const [localQuery, setLocalQuery] = useState(query)

  return (
    <Modal
      open={open}
      title='Bộ lọc'
      onCancel={onCancel}
      width={isMobile ? '80vw' : '60vw'}
      centered
      onSubmit={() => {
        debouncedChangeQuery(localQuery)
        onCancel()
      }}
    >
      <Row className='px-2 mb-3 items-center' gutter={[8, 8]}>
        <Col span={12}>
          <Select
            placeholder='Loại trang phục'
            allowClear
            defaultValue={query?.itemTypeId}
            options={itemTypes
              ?.filter((item) => item?.category === localQuery?.itemCategory)
              .map((i) => ({
                label: i?.name,
                value: i?.id
              }))}
            onChange={(value) => {
              setLocalQuery((prev) => ({ ...prev, itemTypeId: value, currentPage: 1 }))
            }}
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder='Màu sắc'
            onChange={(e) => {
              setLocalQuery((prev) => ({ ...prev, color: e.target.value, currentPage: 1 }))
            }}
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder='Size'
            onChange={(e) => {
              setLocalQuery((prev) => ({ ...prev, size: e.target.value, currentPage: 1 }))
            }}
          />
        </Col>
        <Col span={12}>
          <Checkbox
            onChange={(e) => {
              setLocalQuery((prev) => ({
                ...prev,
                isFavourite: e.target.checked ? BooleanEnum.TRUE : undefined,
                currentPage: 1
              }))
            }}
          >
            Yêu thích
          </Checkbox>
        </Col>
      </Row>
    </Modal>
  )
}

export default FilterModal
