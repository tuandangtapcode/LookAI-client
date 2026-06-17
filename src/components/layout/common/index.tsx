'use client'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { routes } from '@/utils/constant/route'
import { usePathname } from 'next/navigation'

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname()

  return (
    <div className='h-screen flex flex-col'>
      <div className='shrink-0'>
        <Header />
      </div>
      <div
        className={`${
          [routes.login.source, routes.register.source].includes(pathName) ? 'w-[85%] lg:w-[60%]' : 'w-full'
        } mx-auto! pb-10 flex-1`}
      >
        {children}
      </div>
      <div className='shrink-0'>
        <Footer />
      </div>
    </div>
  )
}

export default CommonLayout
