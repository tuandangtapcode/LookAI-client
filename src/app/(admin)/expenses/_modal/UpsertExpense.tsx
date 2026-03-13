'use client'
import Modal from '@/components/modal'
import { IExpense } from '@/interfaces/expense'
import ExpenseService from '@/services/expense'
import { ExpenseTypeEnum } from '@/utils/enum/expense'
import notify from '@/utils/notify'
import { Col, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

interface UpsertExpenseProps {
  open: IExpense | boolean
  onCancel: () => void
  onOk: () => void
}

const UpsertExpense = ({ open, onCancel, onOk }: UpsertExpenseProps) => {
  const [form] = Form.useForm()
  const isEdit = typeof open !== 'boolean' && open?.id
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const { forMonth, ...rest } = await form.validateFields()
      const body = {
        ...rest,
        forMonth: forMonth.month() + 1,
        forYear: forMonth.year(),
        expenseId: isEdit ? open?.id : undefined
      }
      console.log('body', body)
      const res = isEdit ? await ExpenseService.updateExpense(body) : await ExpenseService.createExpense(body)
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
      form.setFieldsValue({
        ...open,
        forMonth: open ? dayjs(`${open.forYear}-${open.forMonth}`, 'YYYY-MM') : null
      })
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
              name='amount'
              rules={[{ required: true, message: 'Thông tin không được để trống' }]}
              label='Số tiền'
            >
              <InputNumber placeholder='Số tiền' min={0.1} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='type'
              rules={[{ required: true, message: 'Thông tin không được để trống' }]}
              label='Loại chi phí'
            >
              <Select
                placeholder='Loại chi phí'
                options={Object.values(ExpenseTypeEnum).map((i) => ({
                  label: i,
                  value: i
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name='description' label='Mô tả'>
              <Input.TextArea placeholder='Mô tả' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='forMonth'
              rules={[{ required: true, message: 'Thông tin không được để trống' }]}
              label='Tháng'
            >
              <DatePicker picker='month' placeholder='Chọn tháng' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default UpsertExpense
