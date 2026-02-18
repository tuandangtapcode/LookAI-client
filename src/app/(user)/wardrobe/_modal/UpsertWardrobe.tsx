'use client'
import Modal from '@/components/modal'
import { IItemType } from '@/interfaces/item-type'
import { IWardrobe } from '@/interfaces/wardrobe'
import { IAxiosResponse } from '@/services'
import FileService from '@/services/file'
import WardrobeService from '@/services/wardrobe'
import { BooleanEnum, ItemCategoryEnum } from '@/utils/enum/common'
import { handleBeforeUpload } from '@/utils/helper/file'
import notify from '@/utils/notify'
import { Checkbox, Col, Form, Image, Input, Row, Select, Upload } from 'antd'
import { useEffect, useState } from 'react'

interface UpsertWardrobeProps {
  open: IWardrobe | boolean
  itemCategory: ItemCategoryEnum
  onCancel: () => void
  setWardrobes: (callback: (prev: IWardrobe[]) => IWardrobe[]) => void
  setSelectedWardrobe: (wardrobe: IWardrobe) => void
  itemTypes: IItemType[]
}

const UpsertWardrobe = ({
  open,
  itemCategory,
  onCancel,
  setWardrobes,
  setSelectedWardrobe,
  itemTypes
}: UpsertWardrobeProps) => {
  const isEdit = typeof open !== 'boolean' && open?.id
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [preview, setPreview] = useState('')

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const { file, isFavourite, ...rest } = await form.validateFields()
      let resFile: IAxiosResponse<string> | undefined
      if (file?.file) {
        resFile = await FileService.uploadSingleFile({ file: file.file })
        if (resFile?.error) return notify('error', resFile?.msg)
      }
      const body = {
        ...rest,
        itemCategory,
        image: resFile?.data ? resFile?.data : preview,
        isFavourite: isFavourite ? BooleanEnum.TRUE : BooleanEnum.FALSE,
        wardrobeId: isEdit ? open?.id : undefined
      }
      const res = isEdit ? await WardrobeService.updateWardrobe(body) : await WardrobeService.createWardrobe(body)
      if (res?.error) return notify('error', res?.msg)
      setWardrobes((prev) =>
        isEdit ? prev.map((item) => (item.id === res?.data.id ? res?.data : item)) : [res?.data, ...prev]
      )
      setSelectedWardrobe(res?.data)
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
        file: open?.image
      })
      setPreview(open?.image)
    }
  }, [open])

  return (
    <Modal
      open={!!open}
      title={isEdit ? 'Chỉnh sửa' : 'Thêm mới'}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      loading={loading}
      centered
      width='60vw'
    >
      <Form form={form} layout='vertical'>
        <Row gutter={[8, 0]}>
          <Col span={10}>
            <Form.Item
              name='file'
              rules={[{ required: true, message: 'Thông tin không được để trống' }]}
              className='justify-items-center'
            >
              <Upload
                beforeUpload={(file) => handleBeforeUpload(file, setPreview)}
                accept='image/*'
                listType='picture-card'
                multiple={false}
                maxCount={1}
                fileList={[]}
              >
                <Image src={preview} alt='' preview={false} className='object-contain' />
              </Upload>
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              name='name'
              rules={[{ required: true, message: 'Thông tin không được để trống' }]}
              label='Tên trang phục'
            >
              <Input placeholder='Tên trang phục' />
            </Form.Item>
            <Form.Item name='itemTypeId' label='Loại trang phục'>
              <Select
                placeholder='Loại trang phục'
                options={itemTypes
                  ?.filter((item) => item?.category === itemCategory)
                  .map((i) => ({
                    label: i?.name,
                    value: i?.id
                  }))}
              />
            </Form.Item>
            <Form.Item
              name='color'
              rules={[{ required: true, message: 'Thông tin không được để trống' }]}
              label='Màu sắc'
            >
              <Input placeholder='Màu sắc' />
            </Form.Item>
            <Form.Item name='size' label='Size'>
              <Input placeholder='Size' />
            </Form.Item>
            <Form.Item name='isFavourite' label='Trang phục yêu thích' valuePropName='checked'>
              <Checkbox />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default UpsertWardrobe
