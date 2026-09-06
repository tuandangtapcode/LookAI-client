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
    save: 'bg-(--color-ink)! hover:!bg-(--color-gold)! text-white! border-none! font-medium! tracking-wide!',
    cancel: 'bg-white! hover:bg-(--color-ivory-deep)! text-(--color-ink)! border border-(--color-line)!',
    submitLogin:
      'w-full bg-white! hover:bg-(--color-ivory-deep)! text-(--color-ink)! border border-(--color-ink)! rounded-[4px]! h-10!',
    login:
      'bg-(--color-ink)! hover:bg-(--color-gold)! text-white! border-none! rounded-none! py-4.5! w-full! text-[13px]! uppercase! tracking-[0.14em]!',
    register:
      'bg-(--color-gold)! hover:bg-(--color-ink)! text-white! rounded-none! py-4.5! px-6! text-[14px]! uppercase! tracking-[0.12em]! whitespace-nowrap!',
    saveFullWidth:
      'bg-(--color-ink)! hover:bg-(--color-gold)! text-white! w-full! text-[15px]! font-medium! uppercase! tracking-[0.14em]! py-4.5! rounded-none!',
    outline:
      'bg-transparent! hover:bg-(--color-ink)! text-(--color-ink)!  hover:text-white! border border-(--color-ink)!',
    circle: 'bg-white! hover:bg-white! text-(--color-ink)! shadow-lg!',
    outlineFullWidth:
      'bg-transparent! hover:bg-(--color-ink)! text-(--color-ink)!  hover:text-white! border border-(--color-ink)! w-full! text-[14px]! uppercase! tracking-[0.12em]! py-4.5! rounded-none!',
    outlineCircle: 'bg-white! hover:bg-white! text-(--color-ink)! border border-(--color-line)!',
    primaryCircle: 'bg-(--color-ink)! hover:bg-(--color-gold)! text-white!'
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
