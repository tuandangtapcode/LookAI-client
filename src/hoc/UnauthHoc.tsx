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
      const tokenData: ITokenData = decodeData(res?.data)
      if (!tokenData?.id || !tokenData?.role) return router.push(routes.forbidden.source)
      if (!allowRoles.includes(tokenData?.role) && tokenData?.role === UserRoleEnum.ADMIN) {
        return router.push(routes.dashboard.source)
      } else if (!allowRoles.includes(tokenData?.role) && tokenData?.role !== UserRoleEnum.ADMIN) {
        return router.push(routes.forbidden.source)
      }
      dispatch(globalSlice.actions.setIsCheckAuth(true))
      setAuthorized(true)
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
      <Spin spinning={true} />
    </div>
  ) : (
    <div>{children}</div>
  )
}

export default UnauthHoc
