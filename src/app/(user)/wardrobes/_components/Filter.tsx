import { IItemType } from '@/interfaces/item-type'
import { IGetListWardrobe } from '@/interfaces/wardrobe'
import { BooleanEnum } from '@/utils/enum/common'
import { Checkbox, Col, Input, Row, Select } from 'antd'
import { memo } from 'react'

interface FilterProps {
  query: IGetListWardrobe
  debouncedChangeQuery: (newQuery: IGetListWardrobe) => void
  itemTypes?: IItemType[]
}

const Filter = ({ query, debouncedChangeQuery, itemTypes }: FilterProps) => {
  return (
    <Row className='px-2 mb-3 items-center' gutter={[8, 8]}>
      <Col xxl={8} xl={8} lg={6} md={6}>
        <Input
          placeholder='Tên trang phục'
          onChange={(e) => {
            debouncedChangeQuery({ ...query, textSearch: e.target.value, currentPage: 1 })
          }}
        />
      </Col>
      <Col xxl={5} xl={5} lg={5} md={5}>
        <Select
          placeholder='Loại trang phục'
          allowClear
          options={itemTypes
            ?.filter((item) => item?.category === query?.itemCategory)
            .map((i) => ({
              label: i?.name,
              value: i?.id
            }))}
          onChange={(value) => {
            debouncedChangeQuery({ ...query, itemTypeId: value, currentPage: 1 })
          }}
        />
      </Col>
      <Col xxl={4} xl={4} lg={5} md={5}>
        <Input
          placeholder='Màu sắc'
          onChange={(e) => {
            debouncedChangeQuery({ ...query, color: e.target.value, currentPage: 1 })
          }}
        />
      </Col>
      <Col xxl={4} xl={4} lg={4} md={4}>
        <Input
          placeholder='Size'
          onChange={(e) => {
            debouncedChangeQuery({ ...query, size: e.target.value, currentPage: 1 })
          }}
        />
      </Col>
      <Col xxl={3} xl={3} lg={4} md={4}>
        <Checkbox
          onChange={(e) => {
            debouncedChangeQuery({
              ...query,
              isFavourite: e.target.checked ? BooleanEnum.TRUE : undefined,
              currentPage: 1
            })
          }}
        >
          Yêu thích
        </Checkbox>
      </Col>
    </Row>
  )
}

export default memo(Filter)
