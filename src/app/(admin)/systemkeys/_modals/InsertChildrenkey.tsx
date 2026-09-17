'use client'
import Modal from '@/components/modal'
import { getListSystemkeyThunk } from '@/redux/globalThunk'
import { AppDispatch } from '@/redux/store'
import CommonService from '@/services/common'
import { logError } from '@/utils/helper/log'
import notify from '@/utils/notify'
import { Col, Form, Input, Row } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

interface InsertChildrenkeyProps {
  open: boolean
  onCancel: () => void
  parentId: string
}

const InsertChildrenkey = ({ open, onCancel, parentId }: InsertChildrenkeyProps) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true)

      const res = await CommonService.insertChildkey({ ...values, parentId })
      if (res?.error) return notify('error', res?.msg)

      await dispatch(getListSystemkeyThunk())
      notify('success', res?.msg)
      onCancel()
    } catch (error) {
      logError('InsertChildrenkey.tsx-handleSubmit', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      open={open}
      title='Thêm Childrenkey'
      onCancel={onCancel}
      onSubmit={() => form.submit()}
      loading={loading}
      width='50vw'
    >
      <Form form={form} layout='vertical' onFinish={handleSubmit}>
        <Row gutter={[8, 0]}>
          <Col span={24}>
            <Form.Item
              name='keyName'
              rules={[{ required: true, message: 'Thông tin không được để trống' }]}
              label='Tên key'
            >
              <Input placeholder='Tên key' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default InsertChildrenkey
