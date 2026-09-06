'use client'
import icons from '@/components/icons'
import { useUserSubscription } from '@/hooks/user-subscription'
import { Dropdown, MenuProps } from 'antd'
import { ReactNode, useState } from 'react'

const OutfitAdviceLayout = ({ children }: { children: ReactNode }) => {
  const { subscription } = useUserSubscription()
  const [history] = useState([
    { id: 1, title: 'Tư vấn trang phục đi làm', date: '2023-10-01', status: 'Hoàn thành' },
    { id: 2, title: 'Tư vấn trang phục dạ tiệc', date: '2023-09-15', status: 'Hoàn thành' },
    { id: 3, title: 'Tư vấn trang phục hàng ngày', date: '2023-08-20', status: 'Hoàn thành' }
  ])

  const items: MenuProps['items'] = history?.map((item) => ({
    key: item.id,
    label: item.title
  }))

  return (
    <div className='flex flex-col lg:flex-row gap-x-6 lg:h-[calc(100vh-167px)] lg:overflow-hidden'>
      {!!subscription?.package?.price && (
        <div className='hidden lg:block lg:w-1/4 bg-white px-4 pt-4 overflow-y-auto border border-(--color-line)'>
          <h2 className='font-serif text-xl font-semibold mb-4 text-(--color-ink) flex items-center gap-2'>
            <div className='w-1.5 h-6 bg-(--color-gold)'></div>
            Lịch sử tư vấn
          </h2>
          <ul className='space-y-2'>
            {history.map((item) => (
              <li
                key={item.id}
                className='p-3 border border-(--color-line) hover:border-(--color-gold) cursor-pointer transition-all duration-300'
              >
                <h3 className='font-medium text-(--color-ink)'>{item.title}</h3>
                <p className='text-sm text-(--color-text-default)/60'>{item.date}</p>
                <span className='tracking-label text-(--color-gold)'>{item.status}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className='w-full lg:w-3/4 mx-auto'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='font-serif text-2xl font-semibold text-(--color-ink)'>Tư vấn trang phục</h1>
          {!!subscription?.package?.price && (
            <div className='block lg:hidden'>
              <Dropdown
                trigger={['click']}
                popupRender={() => (
                  <div>
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className='p-3 bg-white border border-(--color-line) hover:border-(--color-gold) cursor-pointer transition-all duration-300 max-w-75'
                      >
                        <h3 className='font-medium text-(--color-ink) truncate'>{item.title}</h3>
                        <p className='text-sm text-(--color-text-default)/60'>{item.date}</p>
                        <span className='tracking-label text-(--color-gold)'>{item.status}</span>
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
          )}
        </div>
        <div className='h-[calc(100%-50px)] overflow-y-auto overflow-x-hidden bg-white p-6 border border-(--color-line)'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default OutfitAdviceLayout
