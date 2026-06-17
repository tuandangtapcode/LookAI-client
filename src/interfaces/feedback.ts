import { FeedbackStatusEnum, FeedbackTypeEnum } from '@/utils/enum/feedback'
import { IBaseData, IPagination } from './common'
import { IUser } from './user'

export interface ICreateFeedback {
  content: string
  type: FeedbackTypeEnum
}

export interface IUpdateFeedback extends ICreateFeedback {
  feedbackId: string
  status?: FeedbackStatusEnum
}

export interface IGetListFeedback extends IPagination {
  type?: FeedbackTypeEnum
  status?: FeedbackStatusEnum
}

export interface IFeedback extends IBaseData {
  type: FeedbackTypeEnum
  content: string
  status: FeedbackStatusEnum
  user: IUser
}
