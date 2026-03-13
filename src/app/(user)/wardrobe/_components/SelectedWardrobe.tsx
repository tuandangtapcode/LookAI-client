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
    <div className='mt-4 rounded-xl bg-[#e8ffff] p-4'>
      <Row gutter={[16, 16]}>
        <Col span={5}>
          <Image
            src={selectedWardrobe?.image}
            alt={selectedWardrobe?.name}
            className='w-47.5! object-contain rounded-md'
          />
        </Col>
        <Col span={19}>
          <div className='flex flex-col gap-3'>
            <div>
              <div className='flex items-center gap-x-4'>
                <div className='text-lg font-semibold'>{selectedWardrobe?.name}</div>
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
              <span className='rounded-full bg-white px-4 py-1 text-[13px]'>Màu sắc: {selectedWardrobe?.color}</span>
              <span className='rounded-full bg-white px-4 py-1 text-[13px]'>Size: {selectedWardrobe?.size}</span>
              <span className='rounded-full bg-white px-4 py-1 text-[13px]'>
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
