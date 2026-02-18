import { IUpdateProfile, IUser } from '@/interfaces/user'
import axiosInstance, { IAxiosResponse } from '..'
import { baseRouteUser } from './urls'

const updateProfile = (body: IUpdateProfile): Promise<IAxiosResponse<IUser>> => axiosInstance.put(baseRouteUser, body)

const UserService = {
  updateProfile
}

export default UserService
