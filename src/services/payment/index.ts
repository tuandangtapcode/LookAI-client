import { IGetListResponse } from '@/interfaces/common'
import { ICreatePayment, IGetListPayment, IPayment } from '@/interfaces/payment'
import { truncateParams } from '@/utils/helper/common'
import axiosInstance, { IAxiosResponse } from '..'
import { apiGetListPaymentByUser, baseRoutePayment } from './url'

const createPayment = (body: ICreatePayment): Promise<IAxiosResponse<null>> =>
  axiosInstance.post(baseRoutePayment, body)
const getListPayment = (params: IGetListPayment): Promise<IAxiosResponse<IGetListResponse<IPayment>>> => {
  const _params = truncateParams(params)
  return axiosInstance.get(`${baseRoutePayment}${_params}`)
}
const getListPaymentByUser = (params: IGetListPayment): Promise<IAxiosResponse<IGetListResponse<IPayment>>> => {
  const _params = truncateParams(params)
  return axiosInstance.get(`${apiGetListPaymentByUser}${_params}`)
}

const PaymentService = {
  createPayment,
  getListPayment,
  getListPaymentByUser
}

export default PaymentService
