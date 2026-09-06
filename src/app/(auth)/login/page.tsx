'use client'
import Button from '@/components/button'
import icons from '@/components/icons'
import globalSlice from '@/redux/globalSlice'
import AuthService from '@/services/auth'
import { routes } from '@/utils/constant/route'
import { logError } from '@/utils/helper/log'
import notify from '@/utils/notify'
import { useGoogleLogin } from '@react-oauth/google'
import { Col, Form, Image, Row, Typography } from 'antd'
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
    <Form layout='vertical' className='border border-(--color-line) bg-white p-6! sm:p-10!'>
      <Row className='justify-between items-center' gutter={[32, 32]}>
        <Col xxl={11} xl={11} lg={11} md={11} className='h-full hidden md:block'>
          <div className='border border-(--color-line) bg-(--color-ivory) p-8'>
            <Image width='100%' preview={false} src='/logo.png' alt='' />
          </div>
        </Col>
        <Col xxl={11} xl={11} lg={11} md={11} span={24}>
          <Row>
            <Col span={24} className='mb-7'>
              <span className='tracking-label block text-center text-(--color-gold)'>LookAI</span>
              <Typography.Title level={3} className='mb-4! mt-2! text-center! text-[26px]!'>
                Chào mừng bạn trở lại
              </Typography.Title>
              <div className='flex justify-around border border-(--color-line) p-1'>
                <Link
                  className={`block w-[48%] text-center py-2 text-[13px]! uppercase! tracking-widest! transition-colors ${
                    pathName === routes.login.source ? 'bg-(--color-ink)! text-white!' : 'text-(--color-ink)/70!'
                  }`}
                  href={routes.login.source}
                >
                  Đăng nhập
                </Link>
                <Link
                  className={`block w-[48%] text-center py-2 text-[13px]! uppercase! tracking-widest! transition-colors ${
                    pathName === routes.register.source ? 'bg-(--color-ink)! text-white!' : 'text-(--color-ink)/70!'
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
              <div className='flex gap-x-2 items-center justify-center'>
                <div className='text-sm font-normal text-(--color-text-default)/60'>Bạn chưa có tài khoản?</div>
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
