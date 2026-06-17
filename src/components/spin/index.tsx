'use client'
import { Spin as AntdSpin } from 'antd'
import { ReactNode } from 'react'

interface SpinProps {
  loading: boolean
  children: ReactNode
  fullScreen?: boolean
}

const Spin = ({ loading, children, fullScreen }: SpinProps) => {
  if (loading)
    return (
      <div className={`w-full flex justify-center items-center ${fullScreen ? 'min-h-screen' : 'h-full'}`}>
        <AntdSpin />
      </div>
    )

  return <>{children}</>
}

export default Spin
