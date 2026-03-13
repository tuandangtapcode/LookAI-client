import { IStatistic } from '@/interfaces/common'
import { IStatisticFinancial, IStatisticTokenUsed } from '@/interfaces/dashboard'
import { truncateParams } from '@/utils/helper/common'
import axiosInstance, { IAxiosResponse } from '..'
import { apiStatisticFinancial, apiStatisticTokenUsed } from './urls'

const statisticTokenUsed = (params: IStatistic): Promise<IAxiosResponse<IStatisticTokenUsed>> => {
  const _params = truncateParams(params)
  return axiosInstance.get(`${apiStatisticTokenUsed}${_params}`)
}
const statisticFinancial = (params: IStatistic): Promise<IAxiosResponse<IStatisticFinancial>> => {
  const _params = truncateParams(params)
  return axiosInstance.get(`${apiStatisticFinancial}${_params}`)
}

const DashboardService = {
  statisticTokenUsed,
  statisticFinancial
}

export default DashboardService
