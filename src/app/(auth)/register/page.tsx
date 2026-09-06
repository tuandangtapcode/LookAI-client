'use client'
import Button from '@/components/button'
import icons from '@/components/icons'
import globalSlice from '@/redux/globalSlice'
import { globalSelector } from '@/redux/store'
import AuthService from '@/services/auth'
import { SYSTEM_KEY } from '@/utils/constant/common'
import { routes } from '@/utils/constant/route'
import { getListComboKey } from '@/utils/helper/common'
import { logError } from '@/utils/helper/log'
import { getRegexPhoneNumber } from '@/utils/helper/string'
import notify from '@/utils/notify'
import { useGoogleLogin } from '@react-oauth/google'
import { Col, DatePicker, Form, Image, Input, Row, Select, Typography } from 'antd'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Register = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const pathName = usePathname()
  const { listSystemKey } = useSelector(globalSelector)
  const GENDER = getListComboKey(SYSTEM_KEY.GENDER, listSystemKey)
  const [formData, setFormData] = useState<any>()

  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true)

        const userInfor = await AuthService.getInforByGoogleLogin(tokenResponse?.access_token)
        const dataFromGoogle = userInfor?.data

        const res = await AuthService.register({
          ...formData,
          email: dataFromGoogle.email,
          sub: dataFromGoogle.sub,
          userName: dataFromGoogle.name,
          avatar: dataFromGoogle.picture
        })
        if (res?.error) return notify('error', res?.msg)

        dispatch(globalSlice.actions.setIsCheckAuth(true))
      } catch (error) {
        logError('Register.tsx-handleLoginGoogle', error)
      } finally {
        setLoading(false)
      }
    }
  })

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      setFormData(values)
      handleLoginGoogle()
    } catch (error) {
      logError('Register.tsx-handleSubmit', error)
    }
  }

  return (
    <Form layout='vertical' form={form} className='border border-(--color-line) bg-white p-6! sm:p-10!'>
      <Row className='justify-between items-center' gutter={[32, 32]}>
        <Col xxl={11} xl={11} lg={11} md={11} className='h-full hidden md:block'>
          <div className='border border-(--color-line) bg-(--color-ivory) p-8'>
            <Image width='100%' preview={false} src='/logo.png' alt='' />
          </div>
        </Col>
        <Col xxl={11} xl={11} lg={11} md={11} span={24}>
          <Row>
            <Col span={24} className='mb-6'>
              <span className='tracking-label block text-center text-(--color-gold)'>LookAI</span>
              <Typography.Title level={3} className='mb-3! mt-2! text-center! text-[25px]!'>
                Chào mừng đến với LookAI
              </Typography.Title>
              <div className='hidden md:flex justify-around border border-(--color-line) p-1 mb-3'>
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
              <div className='text-sm text-(--color-text-default)/60 text-center'>
                Hãy điền đầy đủ các thông tin cần thiết sau đó ấn &quot;Đăng ký với Google&quot;
              </div>
            </Col>
            <Col span={24}>
              <Form.Item
                name='phone'
                label='Số điện thoại:'
                rules={[{ pattern: getRegexPhoneNumber(), message: 'Số điện thoại không đúng định dạng' }]}
              >
                <Input placeholder='Số điện thoại' />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name='dateOfBirth'
                label='Ngày sinh:'
                rules={[{ required: true, message: 'Thông tin không được để trống' }]}
              >
                <DatePicker format='DD/MM/YYYY' placeholder='Ngày sinh' />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name='gender'
                label='Giới tính:'
                rules={[{ required: true, message: 'Thông tin không được để trống' }]}
              >
                <Select
                  placeholder='Giới tính'
                  options={GENDER.map((i) => ({
                    value: i.keyValue,
                    label: i.keyName
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={24} className='mb-4 mt-4'>
              <Button icon={icons.ICON_GOOGLE} type='submitLogin' onClick={handleSubmit} loading={loading}>
                Đăng ký với Google
              </Button>
            </Col>
            <Col span={24}>
              <div className='flex gap-x-2 items-center'>
                <div className='text-sm font-normal text-(--color-text-default)/60'>Bạn đã có tài khoản?</div>
                <Link href={routes.login.source} className='primary-text font-medium'>
                  Đăng nhập
                </Link>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  )
}

export default Register
