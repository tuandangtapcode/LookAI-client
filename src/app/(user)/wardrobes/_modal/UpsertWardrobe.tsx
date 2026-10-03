'use client'
import Modal from '@/components/modal'
import { IItemType } from '@/interfaces/item-type'
import { IAnalyzeWardrobeImageResult, IWardrobe } from '@/interfaces/wardrobe'
import WardrobeService from '@/services/wardrobe'
import { BooleanEnum, ItemCategoryEnum } from '@/utils/enum/common'
import { handleBeforeUpload, handleUploadFile } from '@/utils/helper/file'
import { logError } from '@/utils/helper/log'
import notify from '@/utils/notify'
import { Checkbox, Col, Form, Input, Row, Select, Upload } from 'antd'
import { useEffect, useState } from 'react'

interface UpsertWardrobeProps {
  open: IWardrobe | boolean
  itemCategory: ItemCategoryEnum
  onCancel: () => void
  setWardrobes: (callback: (prev: IWardrobe[]) => IWardrobe[]) => void
  itemTypes: IItemType[]
}

const UpsertWardrobe = ({ open, itemCategory, onCancel, setWardrobes, itemTypes }: UpsertWardrobeProps) => {
  const isEdit = typeof open !== 'boolean' && open?.id
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [preview, setPreview] = useState('')
  const [analyzedWardrobeImage, setAnalyzedWardrobeImage] = useState<IAnalyzeWardrobeImageResult>()

  const handleAnalyzeWardrobeImage = async (fileInfo: any) => {
    try {
      setLoading(true)

      if (!fileInfo) return notify('error', 'Hãy upload file ảnh')

      const fileUrl = await handleUploadFile(fileInfo.file)
      if (!fileUrl) return notify('error', 'Lỗi upload file')

      const resAnalyzed = await WardrobeService.analyzeWardrobeImage({
        image: fileUrl,
        itemCategory
      })
      if (resAnalyzed?.error) return notify('error', resAnalyzed?.msg)

      setAnalyzedWardrobeImage(resAnalyzed?.data)
      setPreview(fileUrl)
      form.setFieldsValue(resAnalyzed?.data)
    } catch (error) {
      logError('UpsertWardrobe.tsx-handleAnalyzeWardrobeImage', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)

      const { isFavourite, file, ...rest } = await form.validateFields()

      const body = {
        ...rest,
        itemCategory,
        image: preview,
        isFavourite: isFavourite ? BooleanEnum.TRUE : BooleanEnum.FALSE,
        wardrobeId: isEdit ? open?.id : undefined
      }

      const res = isEdit ? await WardrobeService.updateWardrobe(body) : await WardrobeService.createWardrobe(body)
      if (res?.error) return notify('error', res?.msg)

      const itemType = itemTypes.find((i) => i?.id === body?.itemTypeId)
      const newWardrobe = { ...res?.data, itemType }

      setWardrobes((prev) =>
        isEdit ? prev.map((item) => (item.id === res?.data.id ? newWardrobe : item)) : [newWardrobe, ...prev]
      )
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
      disabled={!analyzedWardrobeImage}
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
                onChange={handleAnalyzeWardrobeImage}
                accept='image/*'
                listType='picture-card'
                multiple={false}
                maxCount={1}
                fileList={[]}
              >
                {preview ? (
                  <img draggable={false} src={preview} alt='avatar' className='w-full h-full object-cover' />
                ) : (
                  <div>Chọn ảnh</div>
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={14} className={`${!analyzedWardrobeImage ? 'hidden!' : ''}`}>
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
