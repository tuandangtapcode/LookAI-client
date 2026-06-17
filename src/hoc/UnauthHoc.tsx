'use client'
import Spin from '@/components/spin'
import globalSlice from '@/redux/globalSlice'
import { globalSelector } from '@/redux/store'
import AuthService from '@/services/auth'
import { routes } from '@/utils/constant/route'
import { UserRoleEnum } from '@/utils/enum/user'
import { logError } from '@/utils/helper/log'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface UnauthHocProps {
  allowRoles: UserRoleEnum[]
  children: ReactNode
}

const UnauthHoc = ({ allowRoles, children }: UnauthHocProps) => {
  const [loading, setLoading] = useState(false)
  const [authorized, setAuthorized] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const { user } = useSelector(globalSelector)
  const pathName = usePathname()

  const checkAuth = async () => {
    try {
      setLoading(true)

      const res = await AuthService.checkAuth()
      if (!res?.data) {
        setAuthorized(true)
        return
      }

      if (!res?.data?.id || !res?.data?.role) {
        router.replace(routes.forbidden.source)
        return
      }

      if ([UserRoleEnum.ADMIN].includes(res?.data?.role)) {
        router.replace(routes.dashboard.source)
        return
      }

      if ([routes.login.source, routes.register.source].includes(pathName)) {
        router.replace(routes.home.source)
        setAuthorized(true)
        return
      }

      dispatch(globalSlice.actions.setIsCheckAuth(true))
      setAuthorized(true)
    } catch (error) {
      logError('UnauthHoc.tsx-checkAuth', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <Spin loading={loading || !authorized} fullScreen>
      {children}
    </Spin>
  )
}

export default UnauthHoc
