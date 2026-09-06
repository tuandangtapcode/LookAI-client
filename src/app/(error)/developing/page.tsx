'use client'
import Button from '@/components/button'
import { routes } from '@/utils/constant/route'
import { ToolOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import { useRouter } from 'next/navigation'

const Developing = () => {
  const router = useRouter()

  return (
    <div className='flex min-h-[70vh] flex-col items-center justify-center bg-(--color-ivory) px-4 text-center'>
      <div className='mb-6 flex h-16 w-16 items-center justify-center border border-(--color-line) bg-white'>
        <ToolOutlined className='text-2xl text-(--color-gold)' />
      </div>
      <span className='tracking-label text-(--color-gold)'>Sắp ra mắt</span>
      <Typography.Title level={2} className='mb-3! mt-2! text-3xl!'>
        Tính năng đang được phát triển
      </Typography.Title>
      <Typography.Paragraph className='mb-8! max-w-md text-(--color-text-default)/70!'>
        Chức năng này hiện chưa sẵn sàng để sử dụng. Đội ngũ LookAI đang hoàn thiện trải nghiệm tốt nhất cho bạn, vui
        lòng quay lại sau nhé.
      </Typography.Paragraph>
      <Button type='save' onClick={() => router.push(routes.home.source)}>
        Về trang chủ
      </Button>
    </div>
  )
}

export default Developing
