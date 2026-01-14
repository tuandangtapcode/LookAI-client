'use client'
import { ReactNode } from 'react'
import Button from '../button'
import icons from '../icons'

interface HeaderSectionProps {
  title: string
  addText?: string
  onAddButton?: () => void
  customButton?: ReactNode
}

const HeaderSection = ({ title, onAddButton, addText, customButton }: HeaderSectionProps) => {
  return (
    <div className='flex justify-between items-center mb-6'>
      <div className='text-[24px] font-semibold'>{title}</div>
      {onAddButton && (
        <Button icon={icons.ICON_PLUS} onClick={onAddButton}>
          {addText || 'Thêm mới'}
        </Button>
      )}
      {!!customButton && customButton}
    </div>
  )
}

export default HeaderSection
