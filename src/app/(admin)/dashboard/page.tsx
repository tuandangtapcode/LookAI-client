'use client'
import { Typography } from 'antd'

const { Title } = Typography

const Dashboard = () => {
  return (
    <div>
      <span className='tracking-label text-(--color-gold)'>Quản lý</span>
      <Title level={2} className='mt-1!'>
        Dashboard
      </Title>
    </div>
  )
}

export default Dashboard
