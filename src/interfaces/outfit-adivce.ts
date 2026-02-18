import { GenderEnum } from '@/utils/enum/user'

export interface ICreateOutfitAdvice {
  height: number
  weight: number
  clothingSize: string
  skinColor: string
  gender: GenderEnum
  age: number
  fashionStyle: string
  occasion: string
}

export interface ICreateOutfitAdviceResponse {
  answer: string
  payload: ICreateOutfitAdvice
}
