'use client'
import Footer from '@/components/footer'
import Header from '@/components/header'
import icons from '@/components/icons'
import { useCheckDeviceScreen } from '@/hooks/common'
import { globalSelector } from '@/redux/store'
import { noFooterRoutes, routes } from '@/utils/constant/route'
import { UserRoleEnum } from '@/utils/enum/user'
import { handleLogout } from '@/utils/helper/common'
import { Dropdown, Image, Menu, MenuProps } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname()
  const splitedPath = pathName.split('/')[1]
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector(globalSelector)
  const isPc = useCheckDeviceScreen('pc')

  type MenuItem = Required<MenuProps>['items'][number] & {
    role: UserRoleEnum[]
  }

  const menu: MenuItem[] = [
    {
      key: routes.profile.source,
      label: 'Thông tin cá nhân',
      role: [UserRoleEnum.STYLIST, UserRoleEnum.USER]
    },
    {
      key: routes.wardrobe.source,
      label: 'Tủ quần áo',
      role: [UserRoleEnum.STYLIST, UserRoleEnum.USER]
    },
    {
      key: routes.outfitAdvice.source,
      label: 'Tư vấn phối đồ',
      role: [UserRoleEnum.USER]
    },
    {
      key: routes.userSubscription.source,
      label: 'Gói đăng ký',
      role: [UserRoleEnum.USER]
    },
    {
      key: routes.myFeedbacks.source,
      label: 'Đóng góp ý kiến',
      role: [UserRoleEnum.USER]
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      role: [UserRoleEnum.STYLIST, UserRoleEnum.USER]
    }
  ]

  const menuDropdown = (
    <Dropdown
      trigger={['click']}
      popupRender={() => (
        <Menu
          selectedKeys={[pathName]}
          items={menu.filter((i) => user && i.role.includes(user?.role))}
          className='rounded-b-xl'
          onClick={({ key }) => {
            if (key === 'logout') {
              handleLogout(dispatch, router)
            } else {
              router.push(key)
            }
          }}
        />
      )}
    >
      <button className='p-1 bg-white rounded-lg border border-gray-200'>{icons.ICON_MENU}</button>
    </Dropdown>
  )

  return (
    <div>
      <Header />
      {noFooterRoutes.includes(`/${splitedPath}`) ? (
        <div className='bg-(--color-primary-matte) p-3'>
          <div className='bg-transparent text-black h-full rounded-md py-3 px-4'>
            {menuDropdown}
            <div className='mt-2'>{children}</div>
          </div>
        </div>
      ) : (
        <>
          <div className='bg-(--color-primary-matte) py-10'>
            <div
              className={`flex ${!isPc && 'flex-col'} w-[90%] md:w-[85%] lg:w-[80%] m-auto h-[calc()100dvh] gap-y-2 gap-x-2`}
            >
              {isPc ? (
                <div className='w-[27%] bg-white rounded-xl self-start'>
                  <div className='pt-3 px-5 mb-5'>
                    <div className='flex items-center mb-3 gap-x-2'>
                      <div className='w-15 h-15 shrink-0'>
                        <Image
                          preview={false}
                          src={user?.avatar}
                          alt=''
                          className='rounded-[50%] w-full h-full object-cover'
                        />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div>{user?.userName}</div>
                        <div className='text-[14px] matte-text truncate'>{user?.email}</div>
                      </div>
                    </div>
                    <div className='h-px bg-(--color-matte) px-5'></div>
                  </div>
                  <Menu
                    selectedKeys={[pathName]}
                    items={menu.filter((i) => user && i.role.includes(user?.role))}
                    mode='inline'
                    className='rounded-b-xl'
                    onClick={({ key }) => {
                      if (key === 'logout') {
                        handleLogout(dispatch, router)
                      } else {
                        router.push(key)
                      }
                    }}
                  />
                </div>
              ) : (
                <div className='self-start'>{menuDropdown}</div>
              )}
              <div className='flex-1 py-4 px-5 bg-white rounded-xl min-h-137.5'>{children}</div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  )
}

export default UserLayout
