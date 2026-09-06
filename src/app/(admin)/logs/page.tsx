'use client'
import { Typography } from 'antd'

const { Title } = Typography

const Logs = () => {
  return (
    <div>
      <span className='tracking-label text-(--color-gold)'>Quản lý</span>
      <Title level={2} className='mt-1!'>
        Log
      </Title>
    </div>
  )
}

export default Logs
