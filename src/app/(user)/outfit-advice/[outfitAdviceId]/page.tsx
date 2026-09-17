'use client'
import Button from '@/components/button'
import Spin from '@/components/spin'
import { useUserSubscription } from '@/hooks/user-subscription'
import { IOutfitAdvice } from '@/interfaces/outfit-adivce'
import { globalSelector } from '@/redux/store'
import OutfitAdviceService from '@/services/outfit-advice'
import { SYSTEM_KEY } from '@/utils/constant/common'
import { routes } from '@/utils/constant/route'
import { getListComboKey } from '@/utils/helper/common'
import { logError } from '@/utils/helper/log'
import { formatAIAnswer } from '@/utils/helper/string'
import notify from '@/utils/notify'
import { Input, Rate, Typography } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const OutfitAdviceDetail = () => {
  const { outfitAdviceId } = useParams<{ outfitAdviceId: string }>()
  const { listSystemKey } = useSelector(globalSelector)
  const GENDER = getListComboKey(SYSTEM_KEY.GENDER, listSystemKey)
  const OUTFIT_ADVICE_RATING = getListComboKey(SYSTEM_KEY.OUTFIT_ADVICE_RATING, listSystemKey)
  const { subscription, loading: loadingSubscription } = useUserSubscription()
  const [outfitAdvices, setOutfitAdvices] = useState<IOutfitAdvice[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingRefine, setLoadingRefine] = useState(false)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const router = useRouter()

  const handleRefineOutfitAdvice = async () => {
    try {
      setLoadingRefine(true)

      const res = await OutfitAdviceService.refineOutfitAdvice({ outfitAdviceId, rating, feedback })
      if (res?.error) return notify('error', res?.msg)

      notify('success', 'Yêu cầu của bạn đã được ghi nhận, LookAI sẽ gợi ý thêm cho bạn sớm nhất!')
      setOutfitAdvices((prev) => [...prev, res?.data])
      setRating(0)
      setFeedback('')
    } catch (error) {
      logError('OutfitAdvice.tsx-handleRefineOutfitAdvice', error)
    } finally {
      setLoadingRefine(false)
    }
  }

  const getDetailOutfitAdvice = async () => {
    try {
      setLoading(true)

      const res = await OutfitAdviceService.getDetailOutfitAdvice(outfitAdviceId)
      if (res?.error) return notify('error', res?.msg)

      setOutfitAdvices(res?.data)
    } catch (error) {
      logError('OutfitAdvice.tsx-handleSubmit', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!outfitAdviceId) return router.replace(routes.notFound.source)

    getDetailOutfitAdvice()
  }, [outfitAdviceId])

  return (
    <Spin loading={loading || loadingSubscription}>
      <div className='bg-white p-6 border border-(--color-line)'>
        {outfitAdvices?.map((advice) => {
          const payload = JSON.parse(advice?.requestPayload)
          const isRefine = !!advice?.parentAdviceId

          return (
            <div className='space-y-4' key={advice?.id}>
              <div className='flex justify-end'>
                <div className='bg-white text-(--color-text-default) py-4 px-5 max-w-md border border-(--color-line) border-r-4 border-r-(--color-gold)'>
                  {!isRefine ? (
                    <>
                      <h3 className='tracking-label mb-3 text-(--color-gold)!'>Thông tin của bạn</h3>
                      <p>
                        <strong className='text-(--color-ink)'>Chiều cao:</strong> {payload?.height} cm
                      </p>
                      <p>
                        <strong className='text-(--color-ink)'>Cân nặng:</strong> {payload?.weight} kg
                      </p>
                      <p>
                        <strong className='text-(--color-ink)'>Màu da:</strong> {payload?.skinColor}
                      </p>
                      <p>
                        <strong className='text-(--color-ink)'>Giới tính:</strong>{' '}
                        {GENDER.find((item) => item.keyValue === payload?.gender)?.keyName}
                      </p>
                      <p>
                        <strong className='text-(--color-ink)'>Tuổi:</strong> {payload?.age}
                      </p>
                      <p>
                        <strong className='text-(--color-ink)'>Phong cách hiện tại:</strong> {payload?.currentStyle}
                      </p>
                      <p>
                        <strong className='text-(--color-ink)'>Phong cách mong muốn:</strong> {payload?.desiredStyle}
                      </p>
                      <p>
                        <strong className='text-(--color-ink)'>Nghề nghiệp:</strong> {payload?.occupation}
                      </p>
                      <p>
                        <strong className='text-(--color-ink)'>Nơi sống:</strong> {payload?.place}
                      </p>
                      <p>
                        <strong className='text-(--color-ink)'>Dịp:</strong> {payload?.occasion}
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className='tracking-label mb-3 text-(--color-gold)!'>Yêu cầu tinh chỉnh</h3>
                      <div className='mb-2 flex items-center gap-2'>
                        <Rate disabled value={payload?.rating} style={{ fontSize: 15 }} />
                        <span className='text-(--color-ink)'>
                          {OUTFIT_ADVICE_RATING.find((i) => i.keyValue === payload?.rating)?.keyName}
                        </span>
                      </div>
                      {!!payload?.feedback && (
                        <p>
                          <strong className='text-(--color-ink)'>Góp ý thêm:</strong> {payload?.feedback}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className='flex justify-start'>
                <div className='bg-(--color-ivory) text-(--color-text-default) py-4 px-5 max-w-md border border-(--color-line)'>
                  <span className='tracking-label mb-3 block text-(--color-gold)'>Gợi ý từ LookAI</span>
                  <div dangerouslySetInnerHTML={{ __html: formatAIAnswer(advice?.responsePayload) }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {subscription && subscription?.package?.refine + 1 <= outfitAdvices.length && (
        <div className='mt-6 border border-(--color-line) bg-white p-6'>
          <span className='tracking-label text-(--color-gold)'>Yêu cầu thêm gợi ý</span>
          <Typography.Title level={5} className='mb-1! mt-2! text-lg!'>
            Chưa ưng ý với gợi ý này?
          </Typography.Title>
          <Typography.Paragraph className='mb-4! text-(--color-text-default)/60!'>
            Cho LookAI biết mức độ phù hợp của gợi ý trên và mô tả thêm điều bạn mong muốn, chúng tôi sẽ gửi thêm gợi ý
            khác phù hợp hơn cho bạn.
          </Typography.Paragraph>

          <Rate
            value={rating}
            onChange={setRating}
            tooltips={OUTFIT_ADVICE_RATING.map((i) => i.keyName)}
            style={{ fontSize: 26 }}
          />
          {!!rating && (
            <div className='mt-1.5 text-sm text-(--color-gold)'>
              {OUTFIT_ADVICE_RATING.find((i) => i.keyValue === rating)?.keyName}
            </div>
          )}

          <Input.TextArea
            className='mt-4!'
            placeholder='Mô tả thêm điều bạn muốn thay đổi hoặc bổ sung (VD: cần phối màu tối hơn, thêm gợi ý cho mùa đông...)'
            autoSize={{ minRows: 3, maxRows: 6 }}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />

          <div className='mt-4'>
            <Button
              type='save'
              onClick={handleRefineOutfitAdvice}
              disabled={!rating && !feedback}
              loading={loadingRefine}
            >
              Gửi yêu cầu gợi ý mới
            </Button>
          </div>
        </div>
      )}

      <div className='mt-6'>
        <Button type='outlineFullWidth' onClick={() => router.push(routes.outfitAdvice.source)}>
          Tư vấn mới
        </Button>
      </div>
    </Spin>
  )
}

export default OutfitAdviceDetail
