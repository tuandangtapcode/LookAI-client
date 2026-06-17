'use client'
import { CheckCircleFilled } from '@ant-design/icons'
import { Space, Typography } from 'antd'

const SuggestionItem = ({ title, tone }: { title: string; tone: string }) => {
  return (
    <div className='rounded-xl border border-white/85 bg-white/85 p-3'>
      <Space align='start' size={10}>
        <CheckCircleFilled className='mt-1 text-(--color-green)' />
        <div>
          <Typography.Text className='block! font-semibold! text-slate-800!'>{title}</Typography.Text>
          <Typography.Text className='text-xs! text-slate-500!'>{tone}</Typography.Text>
        </div>
      </Space>
    </div>
  )
}

export default SuggestionItem
