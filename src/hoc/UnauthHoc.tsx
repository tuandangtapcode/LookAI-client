'use client'
import Spin from '@/components/spin'
import globalSlice from '@/redux/globalSlice'
import AuthService from '@/services/auth'
import { routes } from '@/utils/constant/route'
import { UserRoleEnum } from '@/utils/enum/user'
import { logError } from '@/utils/helper/log'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

interface UnauthHocProps {
  allowRoles: UserRoleEnum[]
  children: ReactNode
}

const UnauthHoc = ({ allowRoles, children }: UnauthHocProps) => {
  const [loading, setLoading] = useState(false)
  const [authorized, setAuthorized] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const checkAuth = async () => {
    try {
      setLoading(true)

      const res = await AuthService.checkAuth()
      if (!res?.data) {
        setAuthorized(true)
        return
      }

      if (!res?.data?.id || !res?.data?.role) return router.replace(routes.forbidden.source)

      if ([UserRoleEnum.ADMIN].includes(res?.data?.role)) {
        return router.replace(routes.dashboard.source)
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
