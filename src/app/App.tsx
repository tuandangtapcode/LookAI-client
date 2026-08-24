'use client'
import { getDetailProfileThunk, getListSystemkeyThunk } from '@/redux/globalThunk'
import { AppDispatch, globalSelector } from '@/redux/store'
import { routes } from '@/utils/constant/route'
import { UserRoleEnum } from '@/utils/enum/user'
import { logError } from '@/utils/helper/log'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const App = ({ children }: { children: React.ReactNode }) => {
  const { isCheckAuth } = useSelector(globalSelector)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redir = searchParams.get('redir')
  const pathName = usePathname()

  const getListSystemkey = async () => {
    try {
      await dispatch(getListSystemkeyThunk())
    } catch (error) {
      console.log('error: ', error);
      logError('App.tsx-getListSystemkey', error)
    }
  }

  const getDetailProfile = async () => {
    try {
      const user = await dispatch(getDetailProfileThunk(router)).unwrap()

      if (redir) {
        router.replace(redir)
        return
      }

      if ([routes.login.source, routes.register.source].includes(pathName)) {
        if (user?.role === UserRoleEnum.ADMIN) {
          router.replace(routes.dashboard.source)
        } else {
          router.replace(routes.home.source)
        }
      }
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
