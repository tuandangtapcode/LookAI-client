'use client'
import { Typography } from 'antd'

const { Text } = Typography

const StatisticTokenUsed = () => {
  return (
    <div className='w-full p-4 bg-white border border-(--color-line)'>
      <Text className='tracking-label text-(--color-ink)/50'>Token đã sử dụng</Text>
    </div>
  )
}

export default StatisticTokenUsed
