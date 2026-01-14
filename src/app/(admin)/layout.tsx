'use client'
import AdminLayout from '@/components/layout/admin'
import AuthHoc from '@/hoc/AuthHoc'
import { UserRoleEnum } from '@/utils/enum/user'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthHoc allowRoles={[UserRoleEnum.ADMIN]}>
      <AdminLayout>{children}</AdminLayout>
    </AuthHoc>
  )
}

export default Layout
