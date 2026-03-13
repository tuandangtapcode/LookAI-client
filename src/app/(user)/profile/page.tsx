'use client'
import Button from '@/components/button'
import globalSlice from '@/redux/globalSlice'
import { globalSelector } from '@/redux/store'
import { IAxiosResponse } from '@/services'
import AuthService from '@/services/auth'
import FileService from '@/services/file'
import UserService from '@/services/user'
import { SYSTEM_KEY } from '@/utils/constant/common'
import { getListComboKey } from '@/utils/helper/common'
import { handleBeforeUpload } from '@/utils/helper/file'
import notify from '@/utils/notify'
import { Card, Col, DatePicker, Form, Image, Input, InputNumber, Row, Select, Upload } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {
  const [form] = Form.useForm()
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { user, listSystemKey } = useSelector(globalSelector)
  const GENDER = getListComboKey(SYSTEM_KEY.GENDER, listSystemKey)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const { file, email, ...rest } = await form.validateFields()
      let resFile: IAxiosResponse<string> | undefined
      if (file) {
        resFile = await FileService.uploadSingleFile({ file: file.file })
        if (resFile?.error) return notify('error', resFile?.msg)
      }
      const res = await UserService.updateProfile({
        ...rest,
        avatar: resFile?.data ? resFile?.data : user?.avatar
      })
      if (res?.error) return notify('error', res?.msg)
      const resProfile = await AuthService.getDetailProfile()
      if (resProfile?.error) return notify('error', resProfile?.msg)
      dispatch(globalSlice.actions.setUser(resProfile?.data))
      notify('success', res?.msg)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      ...user,
      dateOfBirth: dayjs(user?.dateOfBirth)
    })
  }, [user])

  return (
    <div className='w-[80%] m-auto'>
      <Card title='Thông tin cá nhân'>
        <Form layout='vertical' form={form}>
          <Row gutter={[8, 0]}>
            <Col span={24} className='justify-items-center'>
              <Form.Item name='file' valuePropName='file'>
                <Upload
                  beforeUpload={(file) => handleBeforeUpload(file, setPreview)}
                  accept='image/*'
                  listType='picture-card'
                  multiple={false}
                  maxCount={1}
                  fileList={[]}
                >
                  <Image
                    src={preview ? preview : user?.avatar}
                    alt=''
                    preview={false}
                    className='w-25.5! h-25.5! object-contain'
                  />
                </Upload>
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item name='email' label='Email:'>
                <Input placeholder='Email' readOnly />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                name='userName'
                label='Họ và tên:'
                rules={[{ required: true, message: 'Thông tin không được để trống' }]}
              >
                <Input placeholder='Họ và tên' />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item name='skinColor' label='Màu da:'>
                <Input placeholder='VD: Trắng, Vàng, Nâu,...' />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item name='phone' label='Số điện thoại:'>
                <Input placeholder='Số điện thoại' />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                name='dateOfBirth'
                label='Ngày sinh:'
                rules={[{ required: true, message: 'Thông tin không được để trống' }]}
              >
                <DatePicker format='DD/MM/YYYY' placeholder='Ngày sinh' />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
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
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item name='height' label='Chiều cao (cm):'>
                <InputNumber placeholder='Chiều cao (cm)' min={100} />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item name='weight' label='Cân nặng (kg):'>
                <InputNumber placeholder='Cân nặng (kg)' min={30} />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item name='bust' label='Vòng ngực (cm):'>
                <InputNumber placeholder='Vòng ngực (cm)' min={50} />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item name='waist' label='Vòng eo (cm):'>
                <InputNumber placeholder='Vòng eo (cm)' min={50} />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item name='hip' label='Vòng hông (cm):'>
                <InputNumber placeholder='Vòng hông (cm)' min={50} />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item name='clothingSize' label='Size quần áo:'>
                <Input placeholder='VD: 39, 40, L, XL,...' />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item name='currentStyle' label='Phong cách hiện tại:'>
                <Input placeholder='VD: Trẻ trung, Thanh lịch, Năng động,...' />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item name='desiredStyle' label='Phong cách mong muốn:'>
                <Input placeholder='VD: Trẻ trung, Thanh lịch, Năng động,...' />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item name='occupation' label='Nghề nghiệp:'>
                <Input placeholder='VD: Kỹ sư, Giáo viên, Bác sĩ,...' />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item name='place' label='Nơi sống:'>
                <Input placeholder='VD: Nông thôn, Thành phố,...' />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button type='saveFullWidth' onClick={handleSubmit} loading={loading}>
                Lưu
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  )
}

export default Profile
