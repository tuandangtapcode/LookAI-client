import AuthService from '@/services/auth'
import CommonService from '@/services/common'
import { routes } from '@/utils/constant/route'
import notify from '@/utils/notify'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export const getListSystemkeyThunk = createAsyncThunk(
  'GET-LIST-SYSTEMKEY',
  async (_, { getState, rejectWithValue }) => {
    const res = await CommonService.getListSystemkey()
    if (res?.error) {
      notify('error', res?.msg)
      rejectWithValue(res?.msg)
    }
    return res?.data
  }
)

export const getDetailProfileThunk = createAsyncThunk(
  'GET-DETAIL-PROFILE',
  async (router: AppRouterInstance, { getState, rejectWithValue }) => {
    const res = await AuthService.getDetailProfile()
    if (res?.error) {
      router.push(routes.notFound.source)
      notify('error', res?.msg)
      rejectWithValue(res?.msg)
    }
    return res?.data
  }
)
