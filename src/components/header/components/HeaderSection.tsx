'use client'
import { ReactNode } from 'react'
import Button from '../../button'
import icons from '../../icons'

interface HeaderSectionProps {
  title: string
  addText?: string
  onAddButton?: () => void
  customButton?: ReactNode
}

const HeaderSection = ({ title, onAddButton, addText, customButton }: HeaderSectionProps) => {
  return (
    <div className='flex justify-between items-center mb-6 pb-4 border-b border-(--color-line)'>
      <div className='flex items-center gap-x-3'>
        <div className='w-1.5 h-6 bg-(--color-gold)' />
        <div className='font-serif text-[22px] font-semibold text-(--color-ink)'>{title}</div>
      </div>
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
