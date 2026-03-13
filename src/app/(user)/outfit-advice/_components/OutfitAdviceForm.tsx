'use client'

import { globalSelector } from '@/redux/store'
import { SYSTEM_KEY } from '@/utils/constant/common'
import { getListComboKey } from '@/utils/helper/common'
import { Col, Form, FormInstance, Input, InputNumber, Row, Select } from 'antd'
import { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'

interface OutfitAdviceFormProps {
  form: FormInstance
}

const OutfitAdviceForm = ({ form }: OutfitAdviceFormProps) => {
  const { user, listSystemKey } = useSelector(globalSelector)
  const GENDER = getListComboKey(SYSTEM_KEY.GENDER, listSystemKey)

  useEffect(() => {
    if (user?.dateOfBirth) {
      const age = new Date().getFullYear() - new Date(user?.dateOfBirth).getFullYear()
      form.setFieldsValue({ ...user, age })
    } else {
      form.setFieldsValue(user)
    }
  }, [user])

  return (
    <Form form={form} layout='vertical'>
      <Row gutter={[8, 0]}>
        <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            name='height'
            label='Chiều cao:'
            rules={[{ required: true, message: 'Thông tin không được để trống' }]}
          >
            <InputNumber placeholder='Chiều cao' />
          </Form.Item>
        </Col>
        <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            name='weight'
            label='Cân nặng:'
            rules={[{ required: true, message: 'Thông tin không được để trống' }]}
          >
            <InputNumber placeholder='Cân nặng' />
          </Form.Item>
        </Col>
        <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
          <Form.Item name='clothingSize' label='Size quần áo:'>
            <Input placeholder='VD: 39, 40, L, XL,...' />
          </Form.Item>
        </Col>
        <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            name='skinColor'
            label='Màu da:'
            rules={[{ required: true, message: 'Thông tin không được để trống' }]}
          >
            <Input placeholder='VD: Trắng, Vàng, Nâu,...' />
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
          <Form.Item name='age' label='Tuổi:' rules={[{ required: true, message: 'Thông tin không được để trống' }]}>
            <InputNumber placeholder='Tuổi' />
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
          <Form.Item
            name='occasion'
            label='Bạn cần tư vấn cho dịp nào:'
            rules={[{ required: true, message: 'Thông tin không được để trống' }]}
          >
            <Input placeholder='VD: Dự tiệc, Công sở, Hẹn hò,...' />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default memo(OutfitAdviceForm)
