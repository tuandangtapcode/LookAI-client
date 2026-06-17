import { ExpenseTypeEnum } from '@/utils/enum/expense'
import { IBaseData, IPagination } from './common'

export interface IExpense extends IBaseData {
  amount: number
  type: ExpenseTypeEnum
  description?: string
  forMonth: number
  forYear: number
}

export interface ICreateExpense {
  amount: number
  type: ExpenseTypeEnum
  description?: string
  forMonth: number
  forYear: number
}

export type IUpdateExpense = Partial<ICreateExpense> & {
  expenseId: string
}

export interface IGetListExpense extends IPagination {
  forMonth?: number
  forYear?: number
  type?: ExpenseTypeEnum
}

export interface IExpenseByType {
  type: ExpenseTypeEnum
  totalAmount: number
}

export interface ICalculateExpense {
  total: number
  analysis: IExpenseByType[]
}
