import { ISystemkey } from '@/interfaces/systemkey'
import globalSlice from '@/redux/globalSlice'
import AuthService from '@/services/auth'
import SocketService from '@/services/socket'
import { Dispatch } from '@reduxjs/toolkit'
import CryptoJS from 'crypto-js'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import env from '../config/env'
import { routes } from '../constant/route'

export const decodeData = (token: string) => {
  const decryptedBytes = CryptoJS.AES.decrypt(token, env.HASH_KEY)
  return JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8))
}

export const getListComboKey = (keyName: string, listSystemKey: ISystemkey[]) => {
  const parent = listSystemKey?.find((i) => i?.keyName === keyName)
  return listSystemKey?.filter((i) => i?.parentId === parent?.id).sort((a, b) => a.keyValue - b.keyValue)
}

export const handleLogout = async (dispatch: Dispatch, router: AppRouterInstance) => {
  const res = await AuthService.logout()
  if (res?.error) return
  router.push(routes.home.source)
  SocketService.disconnect()
  dispatch(globalSlice.actions.setUser(null))
  dispatch(globalSlice.actions.setIsCheckAuth(false))
}
