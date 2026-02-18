'use client'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { globalSelector } from '@/redux/store'
import { noFooterRoutes, routes } from '@/utils/constant/route'
import { UserRoleEnum } from '@/utils/enum/user'
import { handleLogout } from '@/utils/helper/common'
import { Image, Menu, MenuProps } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector(globalSelector)

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
      key: 'logout',
      label: 'Đăng xuất',
      role: [UserRoleEnum.STYLIST, UserRoleEnum.USER]
    }
  ]

  return (
    <div>
      <Header />
      {noFooterRoutes.includes(pathName) ? (
        <div className='bg-(--color-primary-matte) p-3'>
          <div className='bg-gray-100 text-black h-full rounded-md py-3 px-4'>{children}</div>
        </div>
      ) : (
        <>
          <div className='bg-(--color-primary-matte) py-10'>
            <div className='flex w-[80%] m-auto h-[calc()100dvh] gap-x-6'>
              <div className='w-[27%]! bg-white rounded-xl self-start'>
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
                  defaultSelectedKeys={[pathName]}
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
