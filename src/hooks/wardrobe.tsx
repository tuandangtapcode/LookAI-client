import WardrobeService from '@/services/wardrobe'
import { apiGetQuantityWardrobe } from '@/services/wardrobe/urls'
import useSWR from 'swr'

export const useWardrobeQuantity = (field: 'item_category' | 'item_type', total: number) => {
  const { data, isLoading, mutate } = useSWR(`${apiGetQuantityWardrobe}?field=${field}&total=${total}`, () =>
    WardrobeService.getQuantityWardrobe(field)
  )

  return {
    quantities: data?.data || [],
    loading: isLoading,
    refresh: mutate
  }
}
