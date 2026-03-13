import { IGetListResponse } from '@/interfaces/common'
import { ICreateExpense, IExpense, IGetListExpense, IUpdateExpense } from '@/interfaces/expense'
import { truncateParams } from '@/utils/helper/common'
import axiosInstance, { IAxiosResponse } from '..'
import { baseRouteExpense } from './urls'

const getListExpense = (params: IGetListExpense): Promise<IAxiosResponse<IGetListResponse<IExpense>>> => {
  const _params = truncateParams(params)
  return axiosInstance.get(`${baseRouteExpense}${_params}`)
}
const createExpense = (body: ICreateExpense): Promise<IAxiosResponse<IExpense>> =>
  axiosInstance.post(baseRouteExpense, body)
const updateExpense = (body: IUpdateExpense): Promise<IAxiosResponse<IExpense>> =>
  axiosInstance.put(baseRouteExpense, body)

const ExpenseService = {
  createExpense,
  getListExpense,
  updateExpense
}

export default ExpenseService
