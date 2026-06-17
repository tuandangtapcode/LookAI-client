'use client'
import Spin from '@/components/spin'
import globalSlice from '@/redux/globalSlice'
import AuthService from '@/services/auth'
import { routes } from '@/utils/constant/route'
import { UserRoleEnum } from '@/utils/enum/user'
import { handleLogout } from '@/utils/helper/common'
import { logError } from '@/utils/helper/log'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

interface AuthHocProps {
  allowRoles: UserRoleEnum[]
  children: ReactNode
}

const AuthHoc = ({ allowRoles, children }: AuthHocProps) => {
  const [loading, setLoading] = useState(false)
  const [authorized, setAuthorized] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const pathName = usePathname()

  const checkAuth = async () => {
    try {
      setLoading(true)

      const res = await AuthService.checkAuth()
      if (!res?.data) {
        const redirectUrl = pathName
          ? `${routes.login.source}?redir=${encodeURIComponent(pathName)}`
          : routes.login.source

        return router.replace(redirectUrl)
      }

      // Nếu có token nhưng token không hợp lệ thì logout
      if (!res?.data?.id || !res?.data?.role) {
        handleLogout(dispatch, router)
        return
      }

      // Nếu role của user không nằm trong danh sách cho phép thì redirect về forbidden
      if (!allowRoles.includes(res?.data?.role)) {
        router.replace(routes.forbidden.source)
        return
      }

      setAuthorized(true)
      dispatch(globalSlice.actions.setIsCheckAuth(true))
    } catch (error) {
      logError('AuthHoc.tsx-checkAuth', error)
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

export default AuthHoc
