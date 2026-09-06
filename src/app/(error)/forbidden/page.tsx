'use client'
import { Button, Result } from 'antd'
import { useRouter } from 'next/navigation'

const Forbidden = () => {
  const router = useRouter()

  return (
    <Result
      status='403'
      title='403'
      subTitle='Xin lỗi, bạn không được phép truy cập trang này.'
      extra={
        <Button type='primary' onClick={() => router.push('/')}>
          Quay lại
        </Button>
      }
    />
  )
}
export default Forbidden
