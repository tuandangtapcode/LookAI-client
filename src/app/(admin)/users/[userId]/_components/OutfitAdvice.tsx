'use client'
import Spin from '@/components/spin'
import Table from '@/components/table'
import { useGenerateOutfitAdviceColumn } from '@/hooks/outfit-advice'
import { IGetListOutfitAdvice, IOutfitAdvice } from '@/interfaces/outfit-adivce'
import OutfitAdviceService from '@/services/outfit-advice'
import notify from '@/utils/notify'
import { useEffect, useState } from 'react'

interface OutfitAdviceProps {
  userId: string
}

const OutfitAdvice = ({ userId }: OutfitAdviceProps) => {
  const [outfitAdvices, setOutfitAdvices] = useState<IOutfitAdvice[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState<IGetListOutfitAdvice>({
    currentPage: 1,
    pageSize: 10,
    textSearch: '',
    userId
  })

  const getListOutfitAdvice = async () => {
    try {
      setLoading(true)
      const res = await OutfitAdviceService.getListOutfitAdviceByAdmin(query)
      if (res?.error) return notify('error', res?.msg)
      setOutfitAdvices(res?.data?.list)
      setTotal(res?.data?.total)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListOutfitAdvice()
  }, [query])

  return (
    <Spin loading={loading}>
      <div className='shadow-sm'>
        <Table
          columns={useGenerateOutfitAdviceColumn(query)}
          data={outfitAdvices}
          total={total}
          setPagination={setQuery}
        />
      </div>
    </Spin>
  )
}

export default OutfitAdvice
