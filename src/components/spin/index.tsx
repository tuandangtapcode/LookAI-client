'use client'
import { Spin as AntdSpin } from 'antd'
import { ReactNode } from 'react'

interface SpinProps {
  loading: boolean
  children: ReactNode
}

const Spin = ({ loading, children }: SpinProps) => {
  if (loading)
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <AntdSpin />
      </div>
    )

  return <>{children}</>
}

export default Spin
