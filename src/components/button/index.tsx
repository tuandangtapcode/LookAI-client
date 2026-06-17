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
  | 'outlineCircle'
  | 'primaryCircle'

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
    save: 'bg-(--color-primary)! hover:!bg-(--color-primary-hover)! text-white',
    cancel: 'bg-white! hover:bg-white! text-black! border border-(--color-primary)!',
    submitLogin:
      'w-full bg-white! hover:bg-[#e4e7ec]! text-black! border border-(--color-primary)! rounded-[10px]! h-10!',
    login: 'bg-white! hover:bg-white! text-black! rounded-[30px]! py-4.5! w-full! text-[15px]!',
    register:
      'bg-(--color-primary-hover)! hover:bg-(--color-primary-hover)! text-white rounded-[30px]! py-4.5! w-27.5! text-[16px]!',
    saveFullWidth:
      'bg-(--color-primary)! hover:bg-(--color-primary-hover)! text-white w-full! text-[17px]! font-semibold! py-4.5! rounded-[30px]!',
    outline: 'bg-white! hover:bg-(--color-primary)! text-black!  hover:text-white! border border-(--color-primary)!',
    circle: 'bg-white! hover:bg-white! text-black! shadow-lg!',
    outlineFullWidth:
      'bg-white! hover:bg-(--color-primary)! text-black!  hover:text-white! border border-(--color-primary)! w-full! text-[16px]! py-4.5! rounded-[30px]!',
    outlineCircle: 'bg-white! hover:bg-white! text-black! border border-(--color-primary)!',
    primaryCircle: 'bg-(--color-primary)! hover:bg-(--color-primary)! text-white!'
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
        shape={['circle', 'outlineCircle', 'primaryCircle'].includes(type) ? 'circle' : 'default'}
      >
        {children}
      </AntdButton>
    </Tooltip>
  )
}

export default Button
