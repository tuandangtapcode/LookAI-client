'use client'
import Button from '@/components/button'
import icons from '@/components/icons'
import globalSlice from '@/redux/globalSlice'
import AuthService from '@/services/auth'
import { routes } from '@/utils/constant/route'
import { logError } from '@/utils/helper/log'
import notify from '@/utils/notify'
import { useGoogleLogin } from '@react-oauth/google'
import { Col, Form, Image, Row } from 'antd'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const Login = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const pathName = usePathname()

  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true)

        const userInfor = await AuthService.getInforByGoogleLogin(tokenResponse?.access_token)
        const dataFromGoogle = userInfor?.data

        const res = await AuthService.login({ email: dataFromGoogle.email, sub: dataFromGoogle.sub })
        if (res?.error) return notify('error', res?.msg)

        dispatch(globalSlice.actions.setIsCheckAuth(true))
      } catch (error) {
        logError('Login.tsx-handleLoginGoogle', error)
      } finally {
        setLoading(false)
      }
    }
  })

  return (
    <Form layout='vertical'>
      <Row className='justify-between items-center'>
        <Col xxl={11} xl={11} lg={11} md={11} className='h-full'>
          <Image width='100%' preview={false} src='/logo.png' alt='' className='rounded-[12px]' />
        </Col>
        <Col xxl={11} xl={11} lg={11} md={11}>
          <Row>
            <Col span={24} className='mb-6'>
              <div className='mb-3 font-semibold text-gray-800 text-[26px] text-center'>Chào mừng đến với LookAI</div>
              <div className='bg-(--color-background)! flex justify-around py-2.5 rounded-[40px]'>
                <Link
                  className={`block w-[40%] text-center text-white! py-2 rounded-3xl ${
                    pathName === routes.login.source ? 'bg-(--color-primary)!' : ''
                  }`}
                  href={routes.login.source}
                >
                  Đăng nhập
                </Link>
                <Link
                  className={`block w-[40%] text-center text-white! py-2 rounded-3xl ${
                    pathName === routes.register.source ? 'bg-(--color-primary)!' : ''
                  }`}
                  href={routes.register.source}
                >
                  Đăng ký
                </Link>
              </div>
            </Col>
            <Col span={24} className='mb-4'>
              <Button icon={icons.ICON_GOOGLE} type='submitLogin' onClick={handleLoginGoogle} loading={loading}>
                Đăng nhập với Google
              </Button>
            </Col>
            <Col span={24}>
              <div className='flex gap-x-2 items-center'>
                <div className='text-sm font-normal text-gray-700'>Bạn chưa có tài khoản?</div>
                <Link href={routes.register.source} className='primary-text font-medium'>
                  Đăng ký
                </Link>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  )
}

export default Login
