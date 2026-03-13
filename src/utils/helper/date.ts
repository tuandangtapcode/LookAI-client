import dayjs from 'dayjs'

export const formatDate = (day?: string | Date, includeTime: boolean = false) => {
  if (!day) return '-'
  return includeTime ? dayjs(day).format('DD/MM/YYYY HH:mm:ss') : dayjs(day).format('DD/MM/YYYY')
}
