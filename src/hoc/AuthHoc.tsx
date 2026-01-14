'use client'
import { ITokenData } from '@/interfaces/auth'
import globalSlice from '@/redux/globalSlice'
import AuthService from '@/services/auth'
import { routes } from '@/utils/constant/route'
import { UserRoleEnum } from '@/utils/enum/user'
import { decodeData } from '@/utils/helper/common'
import { Spin } from 'antd'
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

  return loading || !authorized ? (
    <div
      className='loading-center'
      style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}
    >
      <Spin spinning={loading} />
    </div>
  ) : (
    <div>{children}</div>
  )
}

export default AuthHoc
