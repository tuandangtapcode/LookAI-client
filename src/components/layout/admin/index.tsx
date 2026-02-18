'use client'
import Header from '@/components/header'
import icons from '@/components/icons'
import { routes } from '@/utils/constant/route'
import { handleLogout } from '@/utils/helper/common'
import { Menu, MenuProps } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const menu: MenuProps['items'] = [
    {
      key: routes.dashboard.source,
      label: 'Dashboard',
      icon: icons.ICON_DASBOARD
    },
    {
      key: routes.packagesAdmin.source,
      label: 'Gói',
      icon: icons.ICON_PACKAGE
    },
    {
      key: routes.itemTypes.source,
      label: 'Loại trang phục',
      icon: icons.ICON_ITEM_TYPE_ADMIN
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: icons.ICON_LOGOUT
    }
  ]

  return (
    <div>
      <Header />
      <div className='flex h-[calc(100dvh-100px)] mt-5'>
        <div
          className={`flex flex-col justify-between border-r border-r-(--color-matte) ${collapsed ? '' : 'w-[16%]!'}`}
        >
          <Menu
            defaultSelectedKeys={[pathName]}
            items={menu}
            inlineCollapsed={collapsed}
            mode='inline'
            onClick={({ key }) => {
              if (key === 'logout') {
                handleLogout(dispatch, router)
              } else {
                router.push(key)
              }
            }}
          />
          <div className='ml-1 pl-6 cursor-pointer' onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? icons.ICON_MENU_UNFOLD : icons.ICON_MENU_FOLD}
          </div>
        </div>
        <div className='flex-1 px-7 overflow-auto'>{children}</div>
      </div>
    </div>
  )
}

export default AdminLayout
