import { ICreateOutfitAdvice, ICreateOutfitAdviceResponse } from '@/interfaces/outfit-adivce'
import axiosInstance, { IAxiosResponse } from '..'
import { baseRouteOutfitAdvice } from './urls'

const createOutfitAdvice = (body: ICreateOutfitAdvice): Promise<IAxiosResponse<ICreateOutfitAdviceResponse>> =>
  axiosInstance.post(baseRouteOutfitAdvice, body)

const OutfitAdviceService = {
  createOutfitAdvice
}

export default OutfitAdviceService
