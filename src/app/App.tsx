'use client'
import { getDetailProfileThunk, getListSystemkeyThunk } from '@/redux/globalThunk'
import { AppDispatch, globalSelector } from '@/redux/store'
import { logError } from '@/utils/helper/log'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const App = ({ children }: { children: React.ReactNode }) => {
  const { isCheckAuth } = useSelector(globalSelector)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redir = searchParams.get('redir')

  const getListSystemkey = async () => {
    try {
      await dispatch(getListSystemkeyThunk())
    } catch (error) {
      logError('App.tsx-getListSystemkey', error)
    }
  }

  const getDetailProfile = async () => {
    try {
      await dispatch(getDetailProfileThunk(router)).unwrap()

      if (redir) return router.replace(redir)
    } catch (error) {
      logError('App.tsx-getDetailProfile', error)
    }
  }

  useEffect(() => {
    getListSystemkey()
  }, [])

  useEffect(() => {
    if (isCheckAuth) {
      getDetailProfile()
    }
  }, [isCheckAuth])

  return <div>{children}</div>
}

export default App
