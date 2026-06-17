import { ILogin, IRegister, ITokenData } from '@/interfaces/auth'
import { IUser } from '@/interfaces/user'
import axios from 'axios'
import axiosInstance, { IAxiosResponse } from '..'
import { apiCheckAuth, apiGetDetailProfile, apiGetInforByGoogleLogin, apiLogin, apiLogout, apiRegister } from './url'

const getInforByGoogleLogin = (access_token: string) =>
  axios.get(apiGetInforByGoogleLogin, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
const register = (body: IRegister): Promise<IAxiosResponse<string>> => axiosInstance.post(apiRegister, body)
const login = (body: ILogin): Promise<IAxiosResponse<string>> => axiosInstance.post(apiLogin, body)
const checkAuth = (): Promise<IAxiosResponse<ITokenData | null>> => axiosInstance.get(apiCheckAuth)
const getDetailProfile = (): Promise<IAxiosResponse<IUser>> => axiosInstance.get(apiGetDetailProfile)
const logout = (): Promise<IAxiosResponse<string>> => axiosInstance.get(apiLogout)

const AuthService = {
  getInforByGoogleLogin,
  register,
  login,
  checkAuth,
  getDetailProfile,
  logout
}

export default AuthService
