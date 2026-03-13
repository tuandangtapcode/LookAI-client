import { ICalculateExpense } from './expense'
import { ICalculateTokenUsed, IGetTopTokenUsed } from './outfit-adivce'

export interface IStatisticTokenUsed {
  tokenUsed: ICalculateTokenUsed
  topUserTokenUsed: IGetTopTokenUsed[]
}

export interface IStatisticFinancial {
  expense: ICalculateExpense
  payment: number
}
