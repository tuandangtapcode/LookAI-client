'use client'
import icons from '@/components/icons'

interface HeaderDetailProps {
  title: string
  onBack: () => void
}

const HeaderDetail = ({ title, onBack }: HeaderDetailProps) => {
  return (
    <div className='flex items-center gap-x-3 mb-6 pb-4 border-b border-(--color-line)'>
      <div className='cursor-pointer text-(--color-ink) hover:text-(--color-gold) transition-colors' onClick={onBack}>
        {icons.ICON_BACK}
      </div>
      <div className='font-serif text-[22px] font-semibold text-(--color-ink)'>{title}</div>
    </div>
  )
}

export default HeaderDetail
