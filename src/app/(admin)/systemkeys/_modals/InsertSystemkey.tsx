'use client'
import Button from '@/components/button'
import Modal from '@/components/modal'
import { getListSystemkeyThunk } from '@/redux/globalThunk'
import { AppDispatch } from '@/redux/store'
import CommonService from '@/services/common'
import { logError } from '@/utils/helper/log'
import notify from '@/utils/notify'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Col, Form, Input, InputNumber, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

interface InsertSystemkeyProps {
  open: boolean
  onCancel: () => void
}

const InsertSystemkey = ({ open, onCancel }: InsertSystemkeyProps) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true)

      const res = await CommonService.createSystemkey(values)
      if (res?.error) return notify('error', res?.msg)

      await dispatch(getListSystemkeyThunk())
      notify('success', res?.msg)
      onCancel()
    } catch (error) {
      logError('InsertSystemkey.tsx-handleSubmit', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      keyName: '',
      subKeys: [{ keyName: '', keyValue: '' }]
    })
  }, [])

  return (
    <Modal
      open={open}
      title='Thêm Systemkey'
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
          <Col span={24}>
            <Form.List name='subKeys'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row key={key} gutter={[8, 0]} className='items-center'>
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, 'keyName']}
                          rules={[{ required: true, message: 'Thông tin không được để trống' }]}
                        >
                          <Input placeholder='Tên key' />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          name={[name, 'keyValue']}
                          rules={[{ required: true, message: 'Thông tin không được để trống' }]}
                        >
                          <InputNumber placeholder='Giá trị' min={1} />
                        </Form.Item>
                      </Col>
                      <Col span={1}>
                        <div className='cursor-pointer mb-2' onClick={() => remove(name)}>
                          <MinusCircleOutlined />
                        </div>
                      </Col>
                    </Row>
                  ))}
                  <div className='mt-2'>
                    <Button type='outlineFullWidth' onClick={() => add()} icon={<PlusOutlined />}>
                      Thêm children key
                    </Button>
                  </div>
                </>
              )}
            </Form.List>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default InsertSystemkey
