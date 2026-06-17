'use client'
import { CheckCircleFilled } from '@ant-design/icons'
import { Space, Typography } from 'antd'

const Benefit = ({ text }: { text: string }) => {
  return (
    <Space size={8}>
      <CheckCircleFilled className='text-(--color-primary)' />
      <Typography.Text className='text-slate-700!'>{text}</Typography.Text>
    </Space>
  )
}

export default Benefit
