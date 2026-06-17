'use client'
import { Space, Typography } from 'antd'

const MobileAction = ({ icon, title }: { icon: React.ReactNode; title: string }) => {
  return (
    <div className='rounded-xl border border-white/80 bg-white/80 p-3'>
      <Space size={10}>
        <span className='rounded-lg bg-(--color-primary-matte) p-2 text-(--color-green)'>{icon}</span>
        <Typography.Text className='text-slate-700!'>{title}</Typography.Text>
      </Space>
    </div>
  )
}

export default MobileAction
