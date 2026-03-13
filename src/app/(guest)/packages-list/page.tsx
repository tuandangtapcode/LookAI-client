'use client'
import Button from '@/components/button'
import Spin from '@/components/spin'
import { usePackages } from '@/hooks/package'
import { useUserSubscription } from '@/hooks/user-subscription'
import { IPackage } from '@/interfaces/package'
import { routes } from '@/utils/constant/route'
import { BooleanEnum } from '@/utils/enum/common'
import { formatMoney } from '@/utils/helper/string'
import { usePathname, useRouter } from 'next/navigation'

const Packages = () => {
  const { packages, loading: packagesLoading } = usePackages({ isActive: BooleanEnum.TRUE })
  const { subscription, loading: subscriptionLoading } = useUserSubscription()
  const router = useRouter()
  const pathName = usePathname()

  return (
    <Spin loading={packagesLoading || subscriptionLoading}>
      <div className='p-6 max-w-7xl mx-auto'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h1 className='text-3xl font-bold text-(--color-text-default)'>Gói dịch vụ</h1>
            <p className='mt-1 text-sm matte-text'>Chọn gói phù hợp với nhu cầu của bạn</p>
          </div>
        </div>

        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {packages.map((pkg: IPackage) => (
            <article
              key={pkg?.id}
              className='flex flex-col gap-y-5 justify-between rounded-2xl bg-white/80 p-5 shadow-md hover:shadow-lg transition-shadow border border-transparent hover:border-(--color-primary)'
            >
              <div className='flex flex-col flex-1 border-b border-(--color-matte) pb-5'>
                <div className='text-xl font-semibold text-(--color-text-default)'>{pkg?.name}</div>
                <div className='text-xl font-bold text-(--color-primary)'>{formatMoney(pkg?.price)} đ</div>
                <div dangerouslySetInnerHTML={{ __html: pkg?.description }} />
              </div>

              <div className='flex items-center justify-between'>
                <span className='inline-flex items-center rounded-full bg-(--color-primary)/10 text-(--color-primary) px-3 py-0.5 text-sm'>
                  {pkg?.duration ? `${pkg?.duration} ngày` : '—'}
                </span>

                <div className='flex items-center gap-3'>
                  <Button
                    onClick={() => {
                      if (!subscription) {
                        return router.push(`${routes.login.source}?redir=${encodeURIComponent(pathName)}`)
                      }
                      if (subscription?.package?.id === pkg?.id) {
                        router.push(routes.outfitAdvice.source)
                      } else {
                        router.push(`${routes.checkout.root}/${pkg?.id}`)
                      }
                    }}
                    type='save'
                  >
                    Sử dụng
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Spin>
  )
}

export default Packages
