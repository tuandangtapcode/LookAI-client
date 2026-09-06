'use client'
import { IPackage } from '@/interfaces/package'
import PackageService from '@/services/package'
import PaymentService from '@/services/payment'
import { routes } from '@/utils/constant/route'
import { SubscriptionHistoryStatusEnum } from '@/utils/enum/subscription-history'
import { logError } from '@/utils/helper/log'
import notify from '@/utils/notify'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Checkout = () => {
  const { packageId } = useParams<{ packageId: string }>()
  const [packageDetail, setPackageDetail] = useState<IPackage>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const getDetailPackage = async () => {
    try {
      setLoading(true)

      const res = await PackageService.getDetailPackage(packageId)
      if (res?.error) return router.replace(routes.notFound.source)

      setPackageDetail(res.data)
    } catch (error) {
      logError('Checkout.tsx-getDetailPackage', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCompleteCheckout = async () => {
    try {
      setLoading(true)

      if (!packageDetail) return

      const res = await PaymentService.createPayment({
        packageId: packageDetail?.id,
        amount: packageDetail?.price,
        orderCode: '123456',
        subscriptionHistoryStatus: SubscriptionHistoryStatusEnum.REGISTER
      })
      if (res?.error) return notify('error', res?.msg)

      notify('success', 'Thanh toán thành công')
      router.push(routes.userSubscription.source)
    } catch (error) {
      logError('Checkout.tsx-handleCompleteCheckout', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (packageId) getDetailPackage()
  }, [packageId])

  if (true) return router.replace(routes.developing.source)

  // return (
  //   <div className='md:h-[calc(100vh-167px)] lg:overflow-hidden'>
  //     <Spin loading={loading}>
  //       <div className='mb-4'>
  //         <span className='tracking-label text-(--color-gold)'>Xác nhận đơn hàng</span>
  //         <h1 className='font-serif text-2xl font-semibold text-(--color-ink) mt-1'>Thanh toán</h1>
  //       </div>
  //       <div className='grid md:grid-cols-2 gap-x-6 gap-y-3'>
  //         <div className='bg-white border border-(--color-line) p-6'>
  //           <div className='p-4 text-white font-semibold text-lg bg-(--color-ink)'>Gói {packageDetail?.name}</div>
  //           <div className='mt-5'>
  //             <div className='text-2xl font-semibold text-(--color-gold)'>
  //               {formatMoney(packageDetail?.price || 0)}₫
  //               <span className='text-sm font-medium matte-text'> / {packageDetail?.duration} ngày</span>
  //             </div>
  //             <div className='mt-3' dangerouslySetInnerHTML={{ __html: packageDetail?.description || '' }} />
  //           </div>
  //         </div>
  //         <div className='bg-white border border-(--color-line) p-6 flex flex-col'>
  //           <div className='flex items-center justify-between'>
  //             <div>
  //               <div className='text-sm matte-text'>Tổng quan đơn hàng</div>
  //               <div className='mt-2 font-serif text-lg font-semibold text-(--color-ink)'>{packageDetail?.name}</div>
  //             </div>
  //           </div>
  //           <div className='mt-5 border-t border-(--color-line) pt-4'>
  //             <div className='flex items-center justify-between'>
  //               <div className='matte-text'>Giá gốc</div>
  //               <div>{formatMoney(packageDetail?.price || 0)}₫</div>
  //             </div>
  //             <div className='flex items-center justify-between mt-3'>
  //               <div className='matte-text'>Giảm giá</div>
  //               <div className='primary-text'>0₫</div>
  //             </div>
  //             <div className='flex items-center justify-between mt-4 pt-4 border-t border-(--color-line)'>
  //               <div className='text-lg font-semibold text-(--color-ink)'>Tổng phải trả</div>
  //               <div className='text-xl font-semibold text-(--color-gold)'>
  //                 {formatMoney(packageDetail?.price || 0)}₫
  //               </div>
  //             </div>
  //           </div>
  //           <div className='mt-6 flex-1 flex items-end'>
  //             <div className='w-full'>
  //               <Button type='saveFullWidth' onClick={handleCompleteCheckout}>
  //                 Thanh toán và hoàn tất
  //               </Button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </Spin>
  //   </div>
  // )
}

export default Checkout
