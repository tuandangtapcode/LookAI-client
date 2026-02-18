'use client'
import { Button as AntdButton, Tooltip } from 'antd'
import { ReactNode } from 'react'

type ButtonType =
  | 'save'
  | 'cancel'
  | 'submitLogin'
  | 'login'
  | 'register'
  | 'saveFullWidth'
  | 'outline'
  | 'circle'
  | 'outlineFullWidth'

interface ButtonProps {
  type?: ButtonType
  loading?: boolean
  onClick: () => void
  disabled?: boolean
  tooltip?: string
  children?: ReactNode
  icon?: ReactNode
  size?: 'large' | 'middle' | 'small'
}

const Button = ({
  type = 'save',
  loading,
  onClick,
  disabled,
  tooltip,
  children,
  icon,
  size = 'middle'
}: ButtonProps) => {
  const types: Record<ButtonType, string> = {
    save: '!bg-[var(--color-primary)] hover:!bg-[var(--color-primary-hover)] text-white',
    cancel: '!bg-white hover:!bg-white !text-black border !border-[var(--color-primary)]',
    submitLogin:
      'w-full !bg-white hover:!bg-[#e4e7ec] !text-black border !border-[var(--color-primary)] !rounded-[10px] !h-[40px]',
    login: '!bg-white hover:!bg-white !text-black !rounded-[30px] !py-[18px] !w-full !text-[15px]',
    register:
      '!bg-[var(--color-primary-hover)] hover:!bg-[var(--color-primary-hover)] text-white !rounded-[30px] !py-[18px] !w-[110px] !text-[16px]',
    saveFullWidth:
      '!bg-[var(--color-primary)] hover:!bg-[var(--color-primary-hover)] text-white !w-full !text-[17px] !font-[600] !py-[18px] !rounded-[30px]',
    outline:
      '!bg-white hover:!bg-[var(--color-primary)] !text-black  hover:!text-white border !border-[var(--color-primary)]',
    circle: '!bg-white hover:!bg-white !text-black !rounded-[50%] !shadow-lg',
    outlineFullWidth:
      '!bg-white hover:!bg-[var(--color-primary)] !text-black  hover:!text-white border !border-[var(--color-primary)] !w-full !text-[16px] !py-[18px] !rounded-[30px]'
  }

  return (
    <Tooltip title={tooltip}>
      <AntdButton
        type='primary'
        loading={loading}
        disabled={disabled}
        onClick={onClick}
        icon={icon}
        size={size}
        className={`${types[type]}`}
      >
        {children}
      </AntdButton>
    </Tooltip>
  )
}

export default Button
