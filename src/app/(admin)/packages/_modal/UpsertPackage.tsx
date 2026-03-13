'use client'
import Modal from '@/components/modal'
import TinyEditor from '@/components/tiny-editor'
import { IPackage } from '@/interfaces/package'
import PackageService from '@/services/package'
import notify from '@/utils/notify'
import { Col, Form, Input, InputNumber, Row } from 'antd'
import { useEffect, useState } from 'react'

interface UpsertPackageProps {
  open: IPackage | boolean
  onCancel: () => void
  onOk: () => void
}

const UpsertPackage = ({ open, onCancel, onOk }: UpsertPackageProps) => {
  const [form] = Form.useForm()
  const isEdit = typeof open !== 'boolean' && open?.id
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const body = {
        ...values,
        packageId: isEdit ? open?.id : undefined
      }
      const res = isEdit ? await PackageService.updatePackage(body) : await PackageService.createPackage(body)
      if (res?.error) return
      onOk()
      notify('success', res?.msg)
      onCancel()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue(open)
    }
  }, [])

  return (
    <Modal
      open={!!open}
      title={isEdit ? 'Chỉnh sửa' : 'Thêm mới'}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      loading={loading}
    >
      <Form form={form} layout='vertical'>
        <Row gutter={[8, 0]}>
          <Col span={24}>
            <Form.Item
              name='name'
              rules={[{ required: true, message: 'Thông tin không được để trống' }]}
              label='Tên gói'
            >
              <Input placeholder='Tên gói' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name='duration' label='Thời hạn'>
              <InputNumber placeholder='Thời hạn' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name='price' rules={[{ required: true, message: 'Thông tin không được để trống' }]} label='Giá'>
              <InputNumber placeholder='Giá' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='quota'
              rules={[{ required: true, message: 'Thông tin không được để trống' }]}
              label='Số lượng request/tháng'
            >
              <InputNumber placeholder='Số lượng request/tháng' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='description'
              rules={[{ required: true, message: 'Thông tin không được để trống' }]}
              label='Mô tả'
            >
              <TinyEditor />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default UpsertPackage
