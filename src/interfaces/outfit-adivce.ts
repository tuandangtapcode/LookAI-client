import { OutfitAdviceRatingEnum } from '@/utils/enum/outfit-advice'
import { GenderEnum } from '@/utils/enum/user'
import { IBaseData, IPagination } from './common'
import { IPackage } from './package'
import { IUser } from './user'

export interface ICreateOutfitAdvice {
  height: number
  weight: number
  clothingSize: string
  skinColor: string
  gender: GenderEnum
  age: number
  currentStyle: string
  desiredStyle: string
  occupation: string
  place: string
  occasion: string
}

export interface IFeedbackOutfitAdvice {
  outfitAdviceId: string
  feedback: string
}

export interface IGetListOutfitAdvice extends IPagination {
  userId: string
}

export interface IOutfitAdvice extends IBaseData {
  requestPayload: string
  responsePayload: string
  inputToken: number
  outputToken: number
  parentAdviceId?: string
  user: IUser
  package: IPackage
}

export interface ICalculateTokenUsed {
  totalInputToken: number
  totalOutputToken: number
}

export interface IGetTopTokenUsed {
  userId: string
  userName: string
  totalInputToken: number
  totalOutputToken: number
}

export interface IRefineOutfitAdvice {
  outfitAdviceId: string
  rating: OutfitAdviceRatingEnum
  feedback: string
}
