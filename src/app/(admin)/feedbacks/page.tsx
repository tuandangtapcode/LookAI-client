'use client'
import { Typography } from 'antd'

const { Title } = Typography

const Feedbacks = () => {
  return (
    <div>
      <span className='tracking-label text-(--color-gold)'>Quản lý</span>
      <Title level={2} className='mt-1!'>
        Phản hồi
      </Title>
    </div>
  )
}

export default Feedbacks
