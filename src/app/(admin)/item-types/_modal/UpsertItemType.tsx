'use client'
import Modal from '@/components/modal'
import { IItemType } from '@/interfaces/item-type'
import { globalSelector } from '@/redux/store'
import ItemTypeService from '@/services/item-type'
import { SYSTEM_KEY } from '@/utils/constant/common'
import { getListComboKey } from '@/utils/helper/common'
import notify from '@/utils/notify'
import { Col, Form, Input, Row, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

interface UpsertItemTypeProps {
  open: IItemType | boolean
  onCancel: () => void
  onOk: () => void
}

const UpsertItemType = ({ open, onCancel, onOk }: UpsertItemTypeProps) => {
  const { listSystemKey } = useSelector(globalSelector)
  const ITEM_CATEGORY = getListComboKey(SYSTEM_KEY.ITEM_CATEGORY, listSystemKey)
  const [form] = Form.useForm()
  const isEdit = typeof open !== 'boolean' && open?.id
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const body = {
        ...values,
        itemTypeId: isEdit ? open?.id : undefined
      }
      const res = isEdit ? await ItemTypeService.updateItemType(body) : await ItemTypeService.createItemType(body)
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
              label='Tên loại trang phục'
            >
              <Input placeholder='Tên loại trang phục' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='category'
              rules={[{ required: true, message: 'Thông tin không được để trống' }]}
              label='Danh mục'
            >
              <Select
                placeholder='Danh mục'
                options={ITEM_CATEGORY.map((i) => ({
                  label: i.keyName,
                  value: i.keyValue
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default UpsertItemType
