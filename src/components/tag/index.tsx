'use client'
import { ISystemkey } from '@/interfaces/systemkey'
import { Tag as AntdTag } from 'antd'

interface TagProps {
  colors: string[]
  value: number
  systemkeys: ISystemkey[]
}

const Tag = ({ colors, value, systemkeys }: TagProps) => {
  return (
    <AntdTag color={colors[value - 1]} className='px-2! py-1!'>
      {systemkeys.find((i) => i.keyValue === value)?.keyName}
    </AntdTag>
  )
}

export default Tag
