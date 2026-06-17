'use client'
import HeaderSection from '@/components/header/components/HeaderSection'
import Table from '@/components/table'
import { useGenerateFeedbackColumn } from '@/hooks/feedback'
import { IFeedback, IGetListFeedback } from '@/interfaces/feedback'
import FeedbackService from '@/services/feedback'
import { logError } from '@/utils/helper/log'
import { useEffect, useState } from 'react'
import UpsertFeedback from './_components/UpsertFeedback'

const MyFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [query, setQuery] = useState<IGetListFeedback>({
    pageSize: 10,
    currentPage: 1
  })
  const [upsertFeedback, setUpsertFeedback] = useState<IFeedback | boolean>(false)

  const getListFeedback = async () => {
    try {
      setLoading(true)

      const res = await FeedbackService.getListFeedbackByUser(query)
      if (res?.error) return

      setFeedbacks(res?.data?.list)
      setTotal(res?.data?.total)
    } catch (error) {
      logError('MyFeedbacks.tsx-getListFeedback', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListFeedback()
  }, [query])

  return (
    <div>
      <HeaderSection title='Đóng góp ý kiến' onAddButton={() => setUpsertFeedback(true)} />
      <div>
        <Table columns={useGenerateFeedbackColumn(setUpsertFeedback)} data={feedbacks} loading={loading} />
      </div>

      {upsertFeedback && (
        <UpsertFeedback open={upsertFeedback} onCancel={() => setUpsertFeedback(false)} setFeedbacks={setFeedbacks} />
      )}
    </div>
  )
}

export default MyFeedbacks
