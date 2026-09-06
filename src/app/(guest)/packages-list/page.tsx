'use client'
import { usePackages } from '@/hooks/package'
import { useUserSubscription } from '@/hooks/user-subscription'
import { routes } from '@/utils/constant/route'
import { BooleanEnum } from '@/utils/enum/common'
import { usePathname, useRouter } from 'next/navigation'

const Packages = () => {
  const { packages, loading: packagesLoading } = usePackages({ isActive: BooleanEnum.TRUE })
  const { subscription, loading: subscriptionLoading } = useUserSubscription()
  const router = useRouter()
  const pathName = usePathname()

  if (true) return router.replace(routes.developing.source)

  // return (
  //   <Spin loading={packagesLoading || subscriptionLoading}>
  //     <div className='bg-(--color-ivory) py-14'>
  //       <div className='p-6 max-w-7xl mx-auto'>
  //         <div className='mb-12 text-center'>
  //           <span className='tracking-label text-(--color-gold)'>Bảng giá</span>
  //           <h1 className='mt-3 font-serif text-4xl font-semibold text-(--color-ink)'>Gói dịch vụ</h1>
  //           <p className='mt-2 text-sm text-(--color-text-default)/60'>Chọn gói phù hợp với nhu cầu của bạn</p>
  //         </div>

  //         <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
  //           {packages.map((pkg: IPackage) => (
  //             <article
  //               key={pkg?.id}
  //               className='group flex flex-col gap-y-6 justify-between bg-white p-7 transition-all duration-300 border border-(--color-line) hover:border-(--color-ink) hover:shadow-[0_18px_40px_rgba(26,23,20,0.1)]'
  //             >
  //               <div className='flex flex-col flex-1 border-b border-(--color-line) pb-6'>
  //                 <div className='font-serif text-xl font-semibold text-(--color-ink)'>{pkg?.name}</div>
  //                 <div className='mt-2 text-2xl font-semibold text-(--color-gold)'>
  //                   {formatMoney(pkg?.price)} <span className='text-base font-normal'>đ</span>
  //                 </div>
  //                 <div
  //                   className='mt-3 text-sm text-(--color-text-default)/70'
  //                   dangerouslySetInnerHTML={{ __html: pkg?.description }}
  //                 />
  //               </div>

  //               <div className='flex items-center justify-between'>
  //                 <span className='tracking-label border border-(--color-line) px-3 py-1 text-(--color-text-default)/60'>
  //                   {pkg?.duration ? `${pkg?.duration} ngày` : '—'}
  //                 </span>

  //                 <div className='flex items-center gap-3'>
  //                   <Button
  //                     onClick={() => {
  //                       if (!subscription) {
  //                         return router.push(`${routes.login.source}?redir=${encodeURIComponent(pathName)}`)
  //                       }
  //                       if (subscription?.package?.id === pkg?.id) {
  //                         router.push(routes.outfitAdvice.source)
  //                       } else {
  //                         router.push(`${routes.checkout.root}/${pkg?.id}`)
  //                       }
  //                     }}
  //                     type='save'
  //                   >
  //                     Sử dụng
  //                   </Button>
  //                 </div>
  //               </div>
  //             </article>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   </Spin>
  // )
}

export default Packages
