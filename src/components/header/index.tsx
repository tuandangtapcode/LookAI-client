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
      className={`bg-white! border-b border-(--color-line) min-h-17 py-2.5 sticky top-0 z-50 backdrop-blur-md ${
        [routes.login.source, routes.register.source].includes(pathName) ? 'mb-10' : ''
      }`}
    >
      <div className='flex justify-between items-center sm:w-[85%] w-[90%] m-auto'>
        <img
          src='/logo-header.png'
          alt=''
          className='h-12! object-contain! cursor-pointer brightness-0!'
          onClick={() => router.push(routes.home.source)}
        />
        <div className='flex justify-between items-center gap-x-6'>
          {(!user || user?.role !== UserRoleEnum.ADMIN) && (
            <div className='justify-between items-center gap-x-8 text-(--color-ink) hidden sm:flex'>
              {menuHeader.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-1.5 text-[13px]! uppercase! tracking-[0.14em]! transition-colors! duration-200! hover:text-(--color-gold)! ${
                    item.href === pathName
                      ? 'text-(--color-ink)! font-semibold! after:absolute after:-bottom-3.25 after:left-0 after:h-0.5 after:w-full after:bg-(--color-gold)'
                      : 'text-(--color-ink)/70!'
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
                <div className='flex items-center gap-x-2.5 text-(--color-ink)'>
                  <img
                    className='h-9! w-9! object-cover! rounded-full! border! border-(--color-line)!'
                    src={user?.avatar}
                    alt=''
                  />
                  <div className='text-[14px] hidden sm:block'>{user?.userName}</div>
                </div>
              </Dropdown>
            </div>
          ) : (
            <div className='flex justify-between items-center gap-x-4'>
              <Link
                href={routes.login.source}
                className='text-[13px]! uppercase! tracking-[0.14em]! text-(--color-ink)! hover:text-(--color-gold)! transition-colors! hidden sm:inline-block'
              >
                Đăng nhập
              </Link>
              <Button onClick={() => router.push(routes.register.source)} type='register'>
                Đăng ký
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
