import { LogServiceEnum, LogTypeEnum } from '@/utils/enum/log'
import { IBaseData, IPagination } from './common'

export interface ICreateLog {
  service: LogServiceEnum
  type: LogTypeEnum
  title: string
  message: string
  detail: string
  endpoint: string
}

export interface IGetListLog extends IPagination {
  type?: LogTypeEnum
  service?: LogServiceEnum
}

export interface ILog extends IBaseData {
  type: LogTypeEnum
  title: string
  message: string
  detail: string
  endpoint?: string
  body?: string
  thirdEndpoint?: string
  thirdBody?: string
  service: LogServiceEnum
}
