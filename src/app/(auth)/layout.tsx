'use client'
import CommonLayout from '@/components/layout/common'
import AuthenHoc from '@/hoc/AuthenHoc'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthenHoc>
      <CommonLayout>{children}</CommonLayout>
    </AuthenHoc>
  )
}

export default Layout
