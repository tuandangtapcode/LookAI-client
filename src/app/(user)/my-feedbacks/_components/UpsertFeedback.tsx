'use client'
import Modal from '@/components/modal'
import { useCheckDeviceScreen } from '@/hooks/common'
import { IFeedback } from '@/interfaces/feedback'
import { globalSelector } from '@/redux/store'
import FeedbackService from '@/services/feedback'
import { SYSTEM_KEY } from '@/utils/constant/common'
import { getListComboKey } from '@/utils/helper/common'
import { logError } from '@/utils/helper/log'
import notify from '@/utils/notify'
import { Col, Form, Input, Row, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

interface IUpsertFeedbackProps {
  open: IFeedback | boolean
  onCancel: () => void
  setFeedbacks: (callback: (prev: IFeedback[]) => IFeedback[]) => void
}

const UpsertFeedback = ({ open, onCancel, setFeedbacks }: IUpsertFeedbackProps) => {
  const [form] = Form.useForm()
  const isEdit = typeof open !== 'boolean' && open?.id
  const [loading, setLoading] = useState(false)
  const { listSystemKey } = useSelector(globalSelector)
  const FEEDBACK_TYPE = getListComboKey(SYSTEM_KEY.FEEDBACK_TYPE, listSystemKey)
  const isMobile = useCheckDeviceScreen('mobile')

  const handleSubmit = async () => {
    try {
      setLoading(true)

      const value = await form.validateFields()
      const body = {
        ...value,
        feedbackId: isEdit ? open?.id : undefined
      }

      const res = isEdit ? await FeedbackService.updateFeedback(body) : await FeedbackService.createFeedback(body)
      if (res?.error) return notify('error', res?.msg)

      setFeedbacks((prev) =>
        isEdit ? prev.map((item) => (item.id === res?.data.id ? res?.data : item)) : [res?.data, ...prev]
      )
      notify('success', res?.msg)
      onCancel()
    } catch (error) {
      logError('UpsertFeedback.tsx-handleSubmit', error)
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
      width={isMobile ? '70vw' : '60vw'}
    >
      <Form form={form} layout='vertical'>
        <Row gutter={[8, 0]}>
          <Col span={24}>
            <Form.Item
              name='type'
              rules={[{ required: true, message: 'Thông tin không được để trống' }]}
              label='Loại phản hồi'
            >
              <Select
                placeholder='Loại phản hồi'
                options={FEEDBACK_TYPE.map((i) => ({
                  label: i.keyName,
                  value: i.keyValue
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name='content' label='Nội dung'>
              <Input.TextArea placeholder='Nội dung' autoSize={{ minRows: 5, maxRows: 10 }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default UpsertFeedback
