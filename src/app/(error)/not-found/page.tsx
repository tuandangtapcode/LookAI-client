'use client'
import { Button, Result } from 'antd'
import { useRouter } from 'next/navigation'

const NotFound = () => {
  const router = useRouter()

  return (
    <Result
      status='404'
      title='404'
      subTitle='Xin lỗi, trang bạn đã truy cập không tồn tại.'
      extra={
        <Button type='primary' className='fw-700 greendBackground' onClick={() => router.push('/')}>
          Quay lại
        </Button>
      }
    />
  )
}
export default NotFound
