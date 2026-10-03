'use client'
import CommonLayout from '@/components/layout/common'
import UnauthHoc from '@/hoc/UnauthHoc'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UnauthHoc>
      <CommonLayout>{children}</CommonLayout>
    </UnauthHoc>
  )
}

export default Layout
