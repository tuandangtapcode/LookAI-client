'use client'
import CommonLayout from '@/components/layout/common'
import UnauthHoc from '@/hoc/UnauthHoc'
import { UserRoleEnum } from '@/utils/enum/user'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UnauthHoc allowRoles={[UserRoleEnum.USER, UserRoleEnum.STYLIST]}>
      <CommonLayout>{children}</CommonLayout>
    </UnauthHoc>
  )
}

export default Layout
