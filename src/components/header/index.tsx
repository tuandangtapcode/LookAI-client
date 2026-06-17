'use client'
import { useCheckDeviceScreen } from '@/hooks/common'
import { globalSelector } from '@/redux/store'
import { routes } from '@/utils/constant/route'
import { UserRoleEnum } from '@/utils/enum/user'
import { handleLogout } from '@/utils/helper/common'
import { Dropdown, MenuProps } from 'antd'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../button'

const Header = () => {
  const router = useRouter()
  const pathName = usePathname()
  const { user } = useSelector(globalSelector)
  const dispatch = useDispatch()
  const isPc = useCheckDeviceScreen('pc')

  const menuAccountUser: MenuProps['items'] = [
    ...(!isPc
      ? [
          {
            key: routes.packagesList.source,
            label: 'Gói dịch vụ'
          }
        ]
      : []),
    {
      key: routes.profile.source,
      label: 'Thông tin tài khoản'
    },
    {
      key: 'Đóng góp ý kiến',
      label: 'Đóng góp ý kiến'
    },
    {
      key: 'logout',
      label: 'Đăng xuất'
    }
  ]

  const menuHeader = [
    {
      href: routes.home.source,
      label: 'Trang chủ'
    },
    {
      href: routes.packagesList.source,
      label: 'Gói dịch vụ'
    }
  ]

  return (
    <div
      className={`bg-(--color-primary)! min-h-15 py-2 ${
        [routes.login.source, routes.register.source].includes(pathName) ? 'mb-10' : ''
      }`}
    >
      <div className='flex justify-between items-center sm:w-[85%] w-[90%] m-auto'>
        <img
          src='/logo-header.png'
          alt=''
          className='h-15! object-contain! cursor-pointer'
          onClick={() => router.push(routes.home.source)}
        />
        <div className='flex justify-between items-center gap-x-5'>
          {(!user || user?.role !== UserRoleEnum.ADMIN) && (
            <div className='justify-between items-center gap-x-5 text-white hidden sm:flex'>
              {menuHeader.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${
                    item.href === pathName
                      ? `bg-(--color-background)! hover:bg-(--color-background)! text-white! rounded-[30px]! ${isPc ? 'px-4!' : 'px-2!'} py-1!`
                      : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
          {user ? (
            <div className='cursor-pointer'>
              <Dropdown
                menu={{
                  items: user?.role !== UserRoleEnum.ADMIN ? menuAccountUser : [],
                  onClick: ({ key }) => {
                    if (key === 'logout') {
                      handleLogout(dispatch, router)
                    } else {
                      router.push(key)
                    }
                  }
                }}
                trigger={['click']}
              >
                <div className='flex items-center gap-x-2 text-white'>
                  <img className='h-10! w-10! object-cover! rounded-full!' src={user?.avatar} alt='' />
                  <div className='text-[15px]'>{user?.userName}</div>
                </div>
              </Dropdown>
            </div>
          ) : (
            <div className='flex justify-between items-center gap-x-4'>
              <Button onClick={() => router.push(routes.login.source)} type='login'>
                Đăng nhập
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
