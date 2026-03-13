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
        <div className='hidden lg:block lg:w-1/4 bg-white px-4 pt-3 overflow-y-auto rounded-2xl'>
          <h2 className='text-xl font-bold mb-4 text-(--color-primary) flex items-center gap-2'>
            <div className='w-2 h-8 bg-(--color-primary) rounded-full'></div>
            Lịch sử tư vấn
          </h2>
          <ul className='space-y-2'>
            {history.map((item) => (
              <li
                key={item.id}
                className='p-3 bg-(--color-primary-matte) rounded-lg hover:bg-(--color-primary-hover) cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100'
              >
                <h3 className='font-semibold text-gray-800'>{item.title}</h3>
                <p className='text-sm text-gray-600'>{item.date}</p>
                <span className='text-xs text-(--color-primary) font-medium bg-(--color-primary-matte) px-2 py-0.5 rounded-full'>
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className='w-full lg:w-3/4 mx-auto'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold text-(--color-primary)'>Tư vấn trang phục</h1>
          {!!subscription?.package?.price && (
            <div className='block lg:hidden'>
              <Dropdown
                trigger={['click']}
                popupRender={() => (
                  <div>
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className='p-3 bg-(--color-primary-matte) rounded-lg hover:bg-(--color-primary-hover) cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100 max-w-75'
                      >
                        <h3 className='font-semibold text-gray-800 truncate'>{item.title}</h3>
                        <p className='text-sm text-gray-600'>{item.date}</p>
                        <span className='text-xs text-(--color-primary) font-medium bg-(--color-primary-matte) px-2 py-0.5 rounded-full'>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              >
                <button className='p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200'>
                  {icons.ICON_MENU}
                </button>
              </Dropdown>
            </div>
          )}
        </div>
        <div className='h-[calc(100%-50px)] overflow-y-auto overflow-x-hidden bg-white rounded-2xl p-6 border border-gray-100'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default OutfitAdviceLayout
