import { IBaseData } from './common'

export interface ISystemkey extends IBaseData {
  parentId?: string
  keyValue: number
  keyName: string
}

export interface ICreateSystemkey {
  keyName: string
  subKeys: {
    keyValue: number
    keyName: string
  }[]
}

export interface IInsertChildkey {
  parentId: string
  keyName: string
}
