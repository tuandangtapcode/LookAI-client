'use client'
import Button from '@/components/button'
import icons from '@/components/icons'
import Spin from '@/components/spin'
import { ITokenData } from '@/interfaces/auth'
import globalSlice from '@/redux/globalSlice'
import { globalSelector } from '@/redux/store'
import AuthService from '@/services/auth'
import { SYSTEM_KEY } from '@/utils/constant/common'
import { routes } from '@/utils/constant/route'
import { UserRoleEnum } from '@/utils/enum/user'
import { decodeData, getListComboKey } from '@/utils/helper/common'
import { getRegexPhoneNumber } from '@/utils/helper/string'
import notify from '@/utils/notify'
import { useGoogleLogin } from '@react-oauth/google'
import { Col, DatePicker, Form, Image, Input, Row, Select } from 'antd'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Register = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
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
        const tokenData: ITokenData = decodeData(res?.data)
        if (!tokenData?.id || !tokenData?.role) return router.push(routes.forbidden.source)
        dispatch(globalSlice.actions.setIsCheckAuth(true))
        if (![UserRoleEnum.USER, UserRoleEnum.STYLIST].includes(tokenData?.role)) {
          router.push(routes.dashboard.source)
        } else {
          router.push(routes.home.source)
        }
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
      console.log('error', error)
    }
  }

  return (
    <Spin loading={loading}>
      <Form layout='vertical' form={form}>
        <Row className='justify-between items-center'>
          <Col xxl={11} xl={11} lg={11} md={11} className='h-full'>
            <Image width='100%' preview={false} src='/logo-header.png' alt='' className='rounded-[12px]' />
          </Col>
          <Col xxl={11} xl={11} lg={11} md={11}>
            <Row>
              <Col span={24} className='mb-6'>
                <div className='mb-3 font-semibold text-gray-800 text-[25px] text-center'>Chào mừng đến với LookAI</div>
                <div className='bg-(--color-background)! hidden md:flex justify-around py-2.5 rounded-[40px] mb-3'>
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
                <div className='text-sm text-gray-500 text-center'>
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
                <Button icon={icons.ICON_GOOGLE} type='submitLogin' onClick={handleSubmit}>
                  Đăng ký với Google
                </Button>
              </Col>
              <Col span={24}>
                <div className='flex gap-x-2 items-center'>
                  <div className='text-sm font-normal text-gray-700'>Bạn đã có tài khoản?</div>
                  <Link href={routes.login.source} className='primary-text font-medium'>
                    Đăng nhập
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  )
}

export default Register
