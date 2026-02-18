'use client'
import Spin from '@/components/spin'
import { ITokenData } from '@/interfaces/auth'
import globalSlice from '@/redux/globalSlice'
import AuthService from '@/services/auth'
import { routes } from '@/utils/constant/route'
import { UserRoleEnum } from '@/utils/enum/user'
import { decodeData } from '@/utils/helper/common'
import { useRouter } from 'next/navigation'
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

  const checkAuth = async () => {
    try {
      setLoading(true)
      const res = await AuthService.checkAuth()
      if (!res?.data) return router.push(routes.forbidden.source)
      const tokenData: ITokenData = decodeData(res?.data)
      if (!tokenData?.id || !tokenData?.role) return router.push(routes.forbidden.source)
      if (!allowRoles.includes(tokenData?.role)) return router.push(routes.forbidden.source)
      setAuthorized(true)
      dispatch(globalSlice.actions.setIsCheckAuth(true))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <div className='h-screen'>
      <Spin loading={loading || !authorized}>{children}</Spin>
    </div>
  )
}

export default AuthHoc
