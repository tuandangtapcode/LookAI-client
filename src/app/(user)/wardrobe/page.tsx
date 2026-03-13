'use client'
import Spin from '@/components/spin'
import { useCheckDeviceScreen } from '@/hooks/common'
import { useGenerateItemCategoryMenu, useItemTypes } from '@/hooks/item-type'
import { IGetListWardrobe, IWardrobe } from '@/interfaces/wardrobe'
import WardrobeService from '@/services/wardrobe'
import { BooleanEnum, ItemCategoryEnum } from '@/utils/enum/common'
import { Card, Checkbox, Col, Empty, Input, Menu, Row, Select } from 'antd'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import 'swiper/css'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import SelectedWardrobe from './_components/SelectedWardrobe'
import UpsertWardrobe from './_modal/UpsertWardrobe'

const Wardrobe = () => {
  const [upsertWardrobe, setUpsertWardrobe] = useState<IWardrobe | boolean>(false)
  const [wardrobes, setWardrobes] = useState<IWardrobe[]>([])
  const [selectedWardrobe, setSelectedWardrobe] = useState<IWardrobe>()
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState<IGetListWardrobe>({
    itemCategory: ItemCategoryEnum.TOP
  })
  const [swiperInstance, setSwiperInstance] = useState<any>()
  const isMobile = useCheckDeviceScreen('mobile')
  const { itemTypes } = useItemTypes()

  const getListWardrobe = async () => {
    try {
      setLoading(true)
      const res = await WardrobeService.getListWardrobe(query)
      if (res?.error) return
      setWardrobes(res?.data)
      setSelectedWardrobe(res?.data[0])
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
    <div className='h-[calc(100dvh-124px)] overflow-hidden'>
      <Row gutter={[0, 12]}>
        <Col xxl={1} xl={2} lg={2} md={2} sm={24} xs={24}>
          <div className='px-2'>
            <Menu
              selectedKeys={[`${query?.itemCategory}`]}
              items={useGenerateItemCategoryMenu()}
              {...(isMobile && { inlineCollapsed: true })}
              mode={!isMobile ? 'horizontal' : 'inline'}
              onClick={({ key }) => {
                if (key === 'create') {
                  setUpsertWardrobe(true)
                } else {
                  setQuery((pre) => ({ ...pre, itemCategory: Number(key) }))
                }
              }}
              className={`${!isMobile ? 'w-full' : 'w-15!'}`}
            />
          </div>
        </Col>
        <Col xxl={23} xl={22} lg={22} md={22} sm={24} xs={24}>
          <Row className='px-2 mb-3 items-center' gutter={[8, 8]}>
            <Col xxl={7} xl={7} lg={7} md={7} sm={12} xs={12}>
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
                  debouncedChangeQuery({ ...query, itemTypeId: value })
                }}
              />
            </Col>
            <Col xxl={7} xl={7} lg={7} md={7} sm={12} xs={12}>
              <Input
                placeholder='Màu sắc'
                onChange={(e) => {
                  debouncedChangeQuery({ ...query, color: e.target.value })
                }}
              />
            </Col>
            <Col xxl={7} xl={7} lg={7} md={7} sm={12} xs={12}>
              <Input
                placeholder='Size'
                onChange={(e) => {
                  debouncedChangeQuery({ ...query, size: e.target.value })
                }}
              />
            </Col>
            <Col xxl={3} xl={3} lg={3} md={3} sm={12} xs={12}>
              <Checkbox
                onChange={(e) => {
                  debouncedChangeQuery({
                    ...query,
                    isFavourite: e.target.checked ? BooleanEnum.TRUE : undefined
                  })
                }}
              >
                Yêu thích
              </Checkbox>
            </Col>
          </Row>
          <Spin loading={loading}>
            <div className='flex flex-col px-2 overflow-y-auto h-[calc(100%-120px)] md:overflow-hidden md:h-auto'>
              <div className='rounded-2xl bg-white p-4'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                  <div className='text-xl font-semibold'>Tủ đồ</div>
                  <div className='rounded-full px-3 py-1 text-sm bg-(--color-primary-matte) text-(--color-primary)'>
                    {wardrobes?.length} món đồ
                  </div>
                </div>

                {wardrobes?.length ? (
                  <>
                    <div className='mt-4'>
                      <Swiper
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                        spaceBetween={16}
                        slidesPerView={2.2}
                        onSwiper={setSwiperInstance}
                        breakpoints={{
                          640: { slidesPerView: 3.2 },
                          1024: { slidesPerView: 4.2 }
                        }}
                      >
                        {wardrobes?.map((item, index) => (
                          <SwiperSlide key={item?.id}>
                            <Card
                              onClick={() => {
                                setSelectedWardrobe(item)
                                swiperInstance?.slideTo(index)
                              }}
                              className={`cursor-pointer border-2! ${selectedWardrobe?.id === item?.id ? 'border-(--color-primary)!' : 'border-none'}`}
                              cover={<img src={item?.image} alt={item?.name} className='h-40 w-full object-cover' />}
                            >
                              <Card.Meta
                                title={<div className='truncate'>{item?.name}</div>}
                                description={
                                  <div className='text-xs matte-text'>{item?.itemType?.name || 'Chưa phân loại'}</div>
                                }
                              />
                            </Card>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>

                    {selectedWardrobe && (
                      <SelectedWardrobe selectedWardrobe={selectedWardrobe} setUpsertWardrobe={setUpsertWardrobe} />
                    )}
                  </>
                ) : (
                  <div className='mt-4'>
                    <Empty description='Chưa có trang phục nào trong tủ đồ.' />
                  </div>
                )}
              </div>
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
          setSelectedWardrobe={setSelectedWardrobe}
          itemTypes={itemTypes}
        />
      )}
    </div>
  )
}

export default Wardrobe
