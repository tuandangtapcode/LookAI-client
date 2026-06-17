'use client'
import { getDetailProfileThunk, getListSystemkeyThunk } from '@/redux/globalThunk'
import { AppDispatch, globalSelector } from '@/redux/store'
import { routes } from '@/utils/constant/route'
import { UserRoleEnum } from '@/utils/enum/user'
import { logError } from '@/utils/helper/log'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const App = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false)
  const { isCheckAuth } = useSelector(globalSelector)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const redir = searchParams.get('redir')

  const getListSystemkey = async () => {
    try {
      setLoading(true)

      await dispatch(getListSystemkeyThunk())
    } catch (error) {
      logError('App.tsx-getListSystemkey', error)
    } finally {
      setLoading(false)
    }
  }

  const getDetailProfile = async () => {
    try {
      setLoading(true)

      const user = await dispatch(getDetailProfileThunk(router)).unwrap()

      if (redir) return router.replace(redir)

      if ([routes.login.source].includes(pathName) && [UserRoleEnum.ADMIN].includes(user?.role)) {
        router.replace(routes.dashboard.source)
      }
    } catch (error) {
      logError('App.tsx-getDetailProfile', error)
    } finally {
      setLoading(false)
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
