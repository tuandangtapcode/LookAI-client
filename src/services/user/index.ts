import { IGetListResponse } from '@/interfaces/common'
import { IGetListUser, IUpdateProfile, IUser, IUserList } from '@/interfaces/user'
import { truncateParams } from '@/utils/helper/common'
import axiosInstance, { IAxiosResponse } from '..'
import { baseRouteUser } from './urls'

const updateProfile = (body: IUpdateProfile): Promise<IAxiosResponse<IUser>> => axiosInstance.put(baseRouteUser, body)
const getListUser = (params: IGetListUser): Promise<IAxiosResponse<IGetListResponse<IUserList>>> => {
  const _params = truncateParams(params)
  return axiosInstance.get(`${baseRouteUser}${_params}`)
}
const getDetailUser = (userId: string): Promise<IAxiosResponse<IUser>> =>
  axiosInstance.get(`${baseRouteUser}/${userId}`)

const UserService = {
  updateProfile,
  getListUser,
  getDetailUser
}

export default UserService
