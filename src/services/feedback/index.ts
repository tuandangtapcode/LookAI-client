import { IGetListResponse } from '@/interfaces/common'
import { ICreateFeedback, IFeedback, IGetListFeedback, IUpdateFeedback } from '@/interfaces/feedback'
import { truncateParams } from '@/utils/helper/common'
import axiosInstance, { IAxiosResponse } from '..'
import { apiGetListFeedbackByUser, baseRouteFeedback } from './urls'

const getListFeedback = (params: IGetListFeedback): Promise<IAxiosResponse<IGetListResponse<IFeedback>>> => {
  const _params = truncateParams(params)
  return axiosInstance.get(`${baseRouteFeedback}${_params}`)
}
const createFeedback = (body: ICreateFeedback): Promise<IAxiosResponse<IFeedback>> =>
  axiosInstance.post(baseRouteFeedback, body)
const updateFeedback = (body: IUpdateFeedback): Promise<IAxiosResponse<IFeedback>> =>
  axiosInstance.put(baseRouteFeedback, body)
const getListFeedbackByUser = (params: IGetListFeedback): Promise<IAxiosResponse<IGetListResponse<IFeedback>>> => {
  const _params = truncateParams(params)
  return axiosInstance.get(`${apiGetListFeedbackByUser}${_params}`)
}

const FeedbackService = {
  createFeedback,
  getListFeedback,
  updateFeedback,
  getListFeedbackByUser
}

export default FeedbackService
