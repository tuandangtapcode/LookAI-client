import LogService from '@/services/log'
import { LogServiceEnum, LogTypeEnum } from '../enum/log'

export const logError = (title: string, error: any) => {
  const endpoint = typeof window !== 'undefined' ? window.location.pathname : ''

  LogService.createLog({
    service: LogServiceEnum.CLIENT,
    type: LogTypeEnum.ERROR,
    title,
    message: error?.message || 'Unknown error',
    detail: JSON.stringify(error?.stack, null, 2),
    endpoint
  })
}
