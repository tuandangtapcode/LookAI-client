'use client'
import Button from '@/components/button'
import icons from '@/components/icons'
import { IWardrobe } from '@/interfaces/wardrobe'
import { BooleanEnum } from '@/utils/enum/common'
import { Col, Image, Row } from 'antd'
import { memo } from 'react'

interface SelectedWardrobeProps {
  selectedWardrobe: IWardrobe
  setUpsertWardrobe: (value: IWardrobe) => void
}

const SelectedWardrobe = ({ selectedWardrobe, setUpsertWardrobe }: SelectedWardrobeProps) => {
  return (
    <div className='mt-4 border border-(--color-line) bg-(--color-ivory) p-4'>
      <Row gutter={[16, 16]}>
        <Col span={5}>
          <Image
            src={selectedWardrobe?.image}
            alt={selectedWardrobe?.name}
            className='w-47.5! object-contain! border border-(--color-line)'
          />
        </Col>
        <Col span={19}>
          <div className='flex flex-col gap-3'>
            <div>
              <div className='flex items-center gap-x-4'>
                <div className='font-serif text-lg font-semibold text-(--color-ink)'>{selectedWardrobe?.name}</div>
                <Button
                  type='circle'
                  onClick={() => setUpsertWardrobe(selectedWardrobe)}
                  icon={icons.ICON_EDIT_MINI}
                  tooltip='Chỉnh sửa'
                />
              </div>
              <div className='text-sm matte-text'>{selectedWardrobe?.itemType?.name}</div>
            </div>

            <div className='flex flex-wrap gap-2'>
              <span className='border border-(--color-line) bg-white px-4 py-1 text-[13px] text-(--color-text-default)/80'>
                Màu sắc: {selectedWardrobe?.color}
              </span>
              <span className='border border-(--color-line) bg-white px-4 py-1 text-[13px] text-(--color-text-default)/80'>
                Size: {selectedWardrobe?.size}
              </span>
              <span className='border border-(--color-line) bg-white px-4 py-1 text-[13px] text-(--color-text-default)/80'>
                Yêu thích: {selectedWardrobe?.isFavourite === BooleanEnum.TRUE ? 'Có' : 'Không'}
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default memo(SelectedWardrobe)
