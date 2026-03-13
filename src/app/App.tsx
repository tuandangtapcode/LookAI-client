'use client'
import { getDetailProfileThunk, getListSystemkeyThunk } from '@/redux/globalThunk'
import { AppDispatch, globalSelector } from '@/redux/store'
import { adminRoutes, routes } from '@/utils/constant/route'
import { UserRoleEnum } from '@/utils/enum/user'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './globals.css'

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
    } finally {
      setLoading(false)
    }
  }

  const getDetailProfile = async () => {
    try {
      setLoading(true)
      const user = await dispatch(getDetailProfileThunk(router)).unwrap()
      // SocketService.connect()
      // SocketService.addOnlineUser(user?.id)
      if (redir) return router.replace(redir)
      if ([routes.login.source, routes.register.source].includes(pathName)) {
        if (user?.role === UserRoleEnum.ADMIN) {
          router.replace(routes.dashboard.source)
        } else {
          router.replace(routes.home.source)
        }
      } else if (user?.role === UserRoleEnum.ADMIN && adminRoutes.find((i) => i.includes(pathName))) {
        router.replace(pathName)
      }
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
