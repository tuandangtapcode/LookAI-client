import { ILogin, IRegister, ITokenData } from '@/interfaces/auth'
import { IUser } from '@/interfaces/user'
import axiosInstance, { IAxiosResponse } from '..'
import { apiCheckAuth, apiGetDetailProfile, apiLogin, apiLogout, apiRefresh, apiRegister } from './url'

const register = (body: IRegister): Promise<IAxiosResponse<string>> => axiosInstance.post(apiRegister, body)

const login = (body: ILogin): Promise<IAxiosResponse<string>> => axiosInstance.post(apiLogin, body)

const checkAuth = (): Promise<IAxiosResponse<ITokenData | null>> => axiosInstance.get(apiCheckAuth)

const getDetailProfile = (): Promise<IAxiosResponse<IUser>> => axiosInstance.get(apiGetDetailProfile)

const logout = (): Promise<IAxiosResponse<string>> => axiosInstance.get(apiLogout)

const refresh = (): Promise<IAxiosResponse<string>> => axiosInstance.get(apiRefresh)

const AuthService = {
  register,
  login,
  checkAuth,
  getDetailProfile,
  logout,
  refresh
}

export default AuthService
