'use client'
import icons from '@/components/icons'
import { useOutfitAdviceHistory } from '@/hooks/outfit-advice'
import { routes } from '@/utils/constant/route'
import { formatDate } from '@/utils/helper/date'
import { Dropdown } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

const OutfitAdviceLayout = ({ children }: { children: ReactNode }) => {
  const { outfitAdvices } = useOutfitAdviceHistory()
  const router = useRouter()

  return (
    <div className='flex flex-col lg:flex-row gap-x-6 lg:h-[calc(100vh-167px)] lg:overflow-hidden'>
      <div className='hidden lg:block lg:w-1/4 bg-white px-4 pt-4 overflow-y-auto border border-(--color-line)'>
        <h2 className='font-serif text-xl font-semibold mb-4 text-(--color-ink) flex items-center gap-2'>
          <div className='w-1.5 h-6 bg-(--color-gold)'></div>
          Lịch sử tư vấn
        </h2>
        <ul className='space-y-2'>
          {outfitAdvices?.map((item) => (
            <li
              key={item?.id}
              className='p-3 border border-(--color-line) hover:border-(--color-gold) cursor-pointer transition-all duration-300'
              onClick={() => router.push(`${routes.outfitAdvice.source}/${item?.id}`)}
            >
              <h3 className='font-medium text-(--color-ink)'>{JSON.parse(item?.requestPayload)?.occasion}</h3>
              <p className='text-sm text-(--color-text-default)/60'>{formatDate(item?.createdAt)}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className='w-full lg:w-3/4 mx-auto'>
        <div className='flex items-center justify-end mb-4 lg:mb-0 lg:hidden'>
          <Dropdown
            trigger={['click']}
            popupRender={() => (
              <div>
                {outfitAdvices?.map((item) => (
                  <div
                    key={item?.id}
                    className='p-3 bg-white border border-(--color-line) hover:border-(--color-gold) cursor-pointer transition-all duration-300 max-w-75'
                    onClick={() => router.push(`${routes.outfitAdvice.source}/${item?.id}`)}
                  >
                    <h3 className='font-medium text-(--color-ink) truncate'>
                      {JSON.parse(item?.requestPayload)?.occasion}
                    </h3>
                    <p className='text-sm text-(--color-text-default)/60'>{formatDate(item?.createdAt)}</p>
                  </div>
                ))}
              </div>
            )}
          >
            <button className='p-1 bg-white border border-(--color-line) hover:border-(--color-gold) transition-colors'>
              {icons.ICON_MENU}
            </button>
          </Dropdown>
        </div>
        <div className='h-[calc(100%-10px)] overflow-y-auto overflow-x-hidden bg-white p-6 border border-(--color-line)'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default OutfitAdviceLayout
