'use client'
import icons from '@/components/icons'

interface HeaderDetailProps {
  title: string
  onBack: () => void
}

const HeaderDetail = ({ title, onBack }: HeaderDetailProps) => {
  return (
    <div className='flex items-center gap-x-2'>
      <div className='cursor-pointer' onClick={onBack}>
        {icons.ICON_BACK}
      </div>
      <div className='text-[24px] font-semibold'>{title}</div>
    </div>
  )
}

export default HeaderDetail
