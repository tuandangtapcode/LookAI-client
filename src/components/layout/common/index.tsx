'use client'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { routes } from '@/utils/constant/route'
import { usePathname } from 'next/navigation'

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname()

  return (
    <div>
      <Header />
      <div
        className={`${
          [routes.login.source, routes.register.source].includes(pathName) ? 'w-[85%] lg:w-[60%]' : 'w-full'
        } mx-auto!  pb-10 min-h-175`}
      >
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default CommonLayout
