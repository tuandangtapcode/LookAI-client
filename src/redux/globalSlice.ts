import { ISystemkey } from '@/interfaces/systemkey'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from './../interfaces/user'
import { getDetailProfileThunk, getListSystemkeyThunk } from './globalThunk'

interface InitialState {
  user: IUser | null
  isCheckAuth: boolean
  listSystemKey: ISystemkey[]
}

const initialState: InitialState = {
  user: null,
  isCheckAuth: false,
  listSystemKey: []
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload
    },
    setIsCheckAuth: (state, action: PayloadAction<boolean>) => {
      state.isCheckAuth = action.payload
    },
    setListSystemKey: (state, action: PayloadAction<ISystemkey[]>) => {
      state.listSystemKey = action.payload
    }
  },
  extraReducers(builder) {
    // systemkey
    builder.addCase(getListSystemkeyThunk.fulfilled, (state, action: PayloadAction<ISystemkey[]>) => {
      state.listSystemKey = action.payload
    })
    // user
    builder.addCase(getDetailProfileThunk.fulfilled, (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload
    })
  }
})

export default globalSlice
