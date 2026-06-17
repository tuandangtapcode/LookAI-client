'use client'
import Button from '@/components/button'
import icons from '@/components/icons'
import Spin from '@/components/spin'
import { useCheckDeviceScreen } from '@/hooks/common'
import { useGenerateItemCategoryMenu, useItemTypes } from '@/hooks/item-type'
import { useWardrobeQuantity } from '@/hooks/wardrobe'
import { IGetListWardrobe, IWardrobe } from '@/interfaces/wardrobe'
import WardrobeService from '@/services/wardrobe'
import { ItemCategoryEnum } from '@/utils/enum/common'
import { logError } from '@/utils/helper/log'
import { Col, Empty, Input, Menu, Pagination, Row } from 'antd'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import Filter from './_components/Filter'
import ItemCategoryMenu from './_components/ItemCategoryMenu'
import WardrobeItem from './_components/WardrobeItem'
import FilterModal from './_modal/FilterModal'
import UpsertWardrobe from './_modal/UpsertWardrobe'

const Wardrobes = () => {
  const [upsertWardrobe, setUpsertWardrobe] = useState<IWardrobe | boolean>(false)
  const [wardrobes, setWardrobes] = useState<IWardrobe[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState<IGetListWardrobe>({
    itemCategory: ItemCategoryEnum.TOP,
    pageSize: 10,
    currentPage: 1
  })
  const isPc = useCheckDeviceScreen('pc')
  const { itemTypes } = useItemTypes()
  const { quantities } = useWardrobeQuantity('item_category', wardrobes?.length)
  const menu = useGenerateItemCategoryMenu(quantities)
  const [openFilter, setOpenFilter] = useState(false)

  const getListWardrobe = async () => {
    try {
      setLoading(true)

      const res = await WardrobeService.getListWardrobe(query)
      if (res?.error) return

      setWardrobes(res?.data?.list)
      setTotal(res?.data?.total)
    } catch (error) {
      logError('Wardrobes.tsx-getListWardrobe', error)
    } finally {
      setLoading(false)
    }
  }

  const debouncedChangeQuery = debounce((newQuery: IGetListWardrobe) => {
    setQuery(newQuery)
  }, 500)

  useEffect(() => {
    getListWardrobe()
  }, [query])

  return (
    <div>
      <Row gutter={[8, 12]}>
        <Col xxl={4} xl={4} lg={5} md={5} sm={24} xs={24}>
          {!isPc && (
            <Row gutter={[8, 8]}>
              <Col span={22}>
                <Input
                  placeholder='Tên trang phục'
                  onChange={(e) => {
                    debouncedChangeQuery({ ...query, textSearch: e.target.value, currentPage: 1 })
                  }}
                />
              </Col>
              <Col span={2}>
                <Button type='outlineCircle' onClick={() => setOpenFilter(true)} icon={icons.ICON_FILTER} />
              </Col>
            </Row>
          )}
          {!isPc ? (
            <ItemCategoryMenu itemCategory={query.itemCategory} quantities={quantities} setQuery={setQuery} />
          ) : (
            <Menu
              selectedKeys={[`${query?.itemCategory}`]}
              items={menu}
              inlineCollapsed={!isPc}
              mode='inline'
              styles={{
                root: {
                  borderRadius: 8
                }
              }}
              onClick={({ key }) => {
                if (key === 'all') return
                if (key === 'create') {
                  setUpsertWardrobe(true)
                } else {
                  setQuery((pre) => ({ ...pre, itemCategory: Number(key), currentPage: 1 }))
                }
              }}
            />
          )}
        </Col>
        <Col xxl={20} xl={20} lg={19} md={19} sm={24} xs={24}>
          {isPc && <Filter query={query} debouncedChangeQuery={debouncedChangeQuery} itemTypes={itemTypes} />}
          <Spin loading={loading}>
            <div className='rounded-2xl bg-white min-h-[calc(100dvh-276px)] md:min-h-[calc(100dvh-212px)] p-4'>
              {wardrobes?.length ? (
                <Row gutter={[12, 12]}>
                  {wardrobes?.map((item) => (
                    <Col key={item.id} xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <WardrobeItem wardrobe={item} setWardrobes={setWardrobes} setUpsertWardrobe={setUpsertWardrobe} />
                    </Col>
                  ))}
                  {total / query.pageSize > 1 && (
                    <Col span={24} className='flex justify-items-center'>
                      <Pagination />
                    </Col>
                  )}
                </Row>
              ) : (
                <div className='mt-4'>
                  <Empty description='Chưa có trang phục nào trong tủ đồ.' />
                </div>
              )}
            </div>
          </Spin>
        </Col>
      </Row>

      {upsertWardrobe && (
        <UpsertWardrobe
          open={upsertWardrobe}
          itemCategory={query?.itemCategory}
          onCancel={() => setUpsertWardrobe(false)}
          setWardrobes={setWardrobes}
          itemTypes={itemTypes}
        />
      )}

      {openFilter && (
        <FilterModal
          open={openFilter}
          onCancel={() => setOpenFilter(false)}
          query={query}
          debouncedChangeQuery={debouncedChangeQuery}
          itemTypes={itemTypes}
        />
      )}
    </div>
  )
}

export default Wardrobes
