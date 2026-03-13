import { IGetListResponse } from '@/interfaces/common'
import {
  ICreateOutfitAdvice,
  ICreateOutfitAdviceResponse,
  IFeedbackOutfitAdvice,
  IGetListOutfitAdvice,
  IOutfitAdvice
} from '@/interfaces/outfit-adivce'
import { truncateParams } from '@/utils/helper/common'
import axiosInstance, { IAxiosResponse } from '..'
import { apiFeedbackOutfitAdvice, apiGetListOutfitAdviceByAdmin, baseRouteOutfitAdvice } from './urls'

const createOutfitAdvice = (body: ICreateOutfitAdvice): Promise<IAxiosResponse<ICreateOutfitAdviceResponse>> =>
  axiosInstance.post(baseRouteOutfitAdvice, body)
const feedbackOutfitAdvice = (body: IFeedbackOutfitAdvice): Promise<IAxiosResponse<null>> =>
  axiosInstance.put(apiFeedbackOutfitAdvice, body)
const getListOutfitAdviceByAdmin = (
  params: IGetListOutfitAdvice
): Promise<IAxiosResponse<IGetListResponse<IOutfitAdvice>>> => {
  const _params = truncateParams(params)
  return axiosInstance.get(`${apiGetListOutfitAdviceByAdmin}${_params}`)
}

const OutfitAdviceService = {
  createOutfitAdvice,
  feedbackOutfitAdvice,
  getListOutfitAdviceByAdmin
}

export default OutfitAdviceService
