import { IGetListResponse } from '@/interfaces/common'
import {
  ICreateOutfitAdvice,
  IFeedbackOutfitAdvice,
  IGetListOutfitAdvice,
  IOutfitAdvice,
  IRefineOutfitAdvice
} from '@/interfaces/outfit-adivce'
import { truncateParams } from '@/utils/helper/common'
import axiosInstance, { IAxiosResponse } from '..'
import {
  apiFeedbackOutfitAdvice,
  apiGetListOutfitAdviceByUser,
  apiRefineOutfitAdvice,
  baseRouteOutfitAdvice
} from './urls'

const createOutfitAdvice = (body: ICreateOutfitAdvice): Promise<IAxiosResponse<IOutfitAdvice>> =>
  axiosInstance.post(baseRouteOutfitAdvice, body)

const feedbackOutfitAdvice = (body: IFeedbackOutfitAdvice): Promise<IAxiosResponse<null>> =>
  axiosInstance.put(apiFeedbackOutfitAdvice, body)

const getListOutfitAdvice = (
  params: IGetListOutfitAdvice
): Promise<IAxiosResponse<IGetListResponse<IOutfitAdvice>>> => {
  const _params = truncateParams(params)
  return axiosInstance.get(`${baseRouteOutfitAdvice}${_params}`)
}

const getDetailOutfitAdvice = (outfitAdviceId: string): Promise<IAxiosResponse<IOutfitAdvice[]>> =>
  axiosInstance.get(`${baseRouteOutfitAdvice}/${outfitAdviceId}`)

const getListOutfitAdviceByUser = (): Promise<IAxiosResponse<IOutfitAdvice[]>> =>
  axiosInstance.get(apiGetListOutfitAdviceByUser)

const refineOutfitAdvice = (body: IRefineOutfitAdvice): Promise<IAxiosResponse<IOutfitAdvice>> =>
  axiosInstance.post(apiRefineOutfitAdvice, body)

const OutfitAdviceService = {
  createOutfitAdvice,
  feedbackOutfitAdvice,
  getListOutfitAdvice,
  getDetailOutfitAdvice,
  getListOutfitAdviceByUser,
  refineOutfitAdvice
}

export default OutfitAdviceService
