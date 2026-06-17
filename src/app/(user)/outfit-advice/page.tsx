'use client'
import Button from '@/components/button'
import Spin from '@/components/spin'
import { useUserSubscription } from '@/hooks/user-subscription'
import { ICreateOutfitAdviceResponse } from '@/interfaces/outfit-adivce'
import { IUserSubscription } from '@/interfaces/user-subscription'
import OutfitAdviceService from '@/services/outfit-advice'
import { UserSubscriptionStatusEnum } from '@/utils/enum/user_subscription'
import { logError } from '@/utils/helper/log'
import notify from '@/utils/notify'
import { Form } from 'antd'
import { useEffect, useState } from 'react'
import OutfitAdviceForm from './_components/OutfitAdviceForm'
import OutfitAdviceResult from './_components/OutfitAdviceResult'

const OutfitAdvice = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ICreateOutfitAdviceResponse>()
  const { subscription, loading: subscriptionLoading } = useUserSubscription()
  const [currentSubscription, setCurrentSubscription] = useState<IUserSubscription>()

  const handleSubmit = async () => {
    try {
      setLoading(true)

      const values = await form.validateFields()

      const res = await OutfitAdviceService.createOutfitAdvice(values)
      if (res?.error) return notify('error', res?.msg)

      setResult(res?.data)
      setCurrentSubscription((prev) => prev && { ...prev, usedQuota: prev?.usedQuota + 1 })
    } catch (error) {
      logError('OutfitAdvice.tsx-handleSubmit', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (subscription) setCurrentSubscription(subscription)
  }, [subscription])

  return (
    <Spin loading={subscriptionLoading}>
      {!result ? (
        <div className='lg:w-[75%] w-full mx-auto'>
          <OutfitAdviceForm form={form} />
          <Button
            type='saveFullWidth'
            onClick={handleSubmit}
            loading={loading}
            disabled={
              currentSubscription?.usedQuota === currentSubscription?.quota ||
              currentSubscription?.status !== UserSubscriptionStatusEnum.ACTIVE
            }
            tooltip={
              currentSubscription?.usedQuota === currentSubscription?.quota
                ? 'Bạn đã sử dụng hết số lượt tư vấn'
                : currentSubscription?.status !== UserSubscriptionStatusEnum.ACTIVE
                  ? 'Gói của bạn đã hết hạn hoặc không còn hiệu lực'
                  : ''
            }
          >
            Gửi yêu cầu tư vấn
          </Button>
        </div>
      ) : (
        <OutfitAdviceResult
          answer={result?.answer}
          payload={result?.payload}
          onNewAdvice={() => {
            form.resetFields()
            setResult(undefined)
          }}
        />
      )}
    </Spin>
  )
}

export default OutfitAdvice
