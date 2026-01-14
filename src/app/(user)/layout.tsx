'use client'
import UserLayout from '@/components/layout/user'
import AuthHoc from '@/hoc/AuthHoc'
import { UserRoleEnum } from '@/utils/enum/user'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthHoc allowRoles={[UserRoleEnum.USER, UserRoleEnum.STYLIST]}>
      <UserLayout>{children}</UserLayout>
    </AuthHoc>
  )
}

export default Layout
