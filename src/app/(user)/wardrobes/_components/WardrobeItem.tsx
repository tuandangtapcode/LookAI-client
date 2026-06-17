'use client'
import Button from '@/components/button'
import icons from '@/components/icons'
import { IWardrobe } from '@/interfaces/wardrobe'
import WardrobeService from '@/services/wardrobe'
import { BooleanEnum } from '@/utils/enum/common'
import { logError } from '@/utils/helper/log'
import notify from '@/utils/notify'
import { HeartFilled } from '@ant-design/icons'
import { Card } from 'antd'
import { BiHeart } from 'react-icons/bi'

const { Meta } = Card

interface WardrobeItemProps {
  wardrobe: IWardrobe
  setWardrobes: (callback: (prev: IWardrobe[]) => IWardrobe[]) => void
  setUpsertWardrobe: (wardrobe: IWardrobe | boolean) => void
}

const WardrobeItem = ({ wardrobe, setWardrobes, setUpsertWardrobe }: WardrobeItemProps) => {
  const handleFavourite = async () => {
    try {
      const res = await WardrobeService.updateWardrobe({
        wardrobeId: wardrobe.id,
        isFavourite: wardrobe?.isFavourite ? BooleanEnum.FALSE : BooleanEnum.TRUE
      })
      if (res?.error) return notify('error', res?.msg)

      setWardrobes((prev) =>
        prev.map((item) => (item.id === wardrobe.id ? { ...item, isFavourite: res?.data?.isFavourite } : item))
      )
    } catch (error) {
      notify('error', 'Có lỗi xảy ra khi cập nhật yêu thích')
      logError('WardrobeItem.tsx-handleFavourite', error)
    }
  }

  return (
    <div className='group relative'>
      <Card
        hoverable
        className='rounded-lg overflow-hidden h-[323px]'
        cover={
          <img src={wardrobe.image || '/placeholder.png'} alt={wardrobe.name} className='w-full h-50 object-cover' />
        }
      >
        <div
          className={`absolute right-3 top-4 ${wardrobe?.isFavourite ? 'text-red-500' : ''} z-10`}
          onClick={handleFavourite}
        >
          {wardrobe?.isFavourite ? <HeartFilled className='text-[18px]!' /> : <BiHeart className='text-[18px]!' />}
        </div>
        <div className='absolute right-9 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-20'>
          <Button type='circle' icon={icons.ICON_EDIT_USER} onClick={() => setUpsertWardrobe(wardrobe)} />
          <Button type='circle' icon={icons.ICON_DELETE_USER} onClick={() => {}} />
        </div>
        <Meta title={wardrobe.name} className='-mt-2.5' />
        <div className='flex flex-wrap gap-2 mt-2'>
          {wardrobe?.itemType && (
            <span className='rounded-full bg-(--color-primary-matte) text-(--color-text-default) px-4 py-1 text-[13px]'>
              Loại: {wardrobe?.itemType?.name}
            </span>
          )}
          <span className='rounded-full bg-(--color-primary-matte) text-(--color-text-default) px-4 py-1 text-[13px]'>
            Màu sắc: {wardrobe?.color}
          </span>
          <span className='rounded-full bg-(--color-primary-matte) text-(--color-text-default) px-4 py-1 text-[13px]'>
            Size: {wardrobe?.size}
          </span>
        </div>
      </Card>
    </div>
  )
}

export default WardrobeItem
