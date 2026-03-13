'use client'
import { Modal as AntdModal, Space } from 'antd'
import { ReactNode } from 'react'
import Button from '../button'

interface ModalProps {
  open: boolean
  title: string
  onCancel: () => void
  onSubmit?: () => void
  children: ReactNode
  loading?: boolean
  centered?: boolean
  width?: string | number
  cancelText?: string
  disabled?: boolean
  customButton?: ReactNode
  isShowFooter?: boolean
}

const Modal = ({
  open,
  title,
  onCancel,
  onSubmit,
  children,
  loading,
  centered = true,
  width = '70vw',
  cancelText,
  disabled = false,
  customButton,
  isShowFooter = true
}: ModalProps) => {
  return (
    <AntdModal
      open={open}
      onCancel={onCancel}
      title={<div className='text-[20px] font-bold'>{title}</div>}
      centered={centered}
      width={width}
      footer={
        isShowFooter ? (
          <Space>
            <Button type='cancel' onClick={onCancel}>
              {cancelText || 'Huỷ'}
            </Button>
            {onSubmit && (
              <Button type='save' onClick={onSubmit} loading={loading} disabled={disabled}>
                Lưu
              </Button>
            )}
            {!!customButton && customButton}
          </Space>
        ) : null
      }
    >
      {children}
    </AntdModal>
  )
}

export default Modal
