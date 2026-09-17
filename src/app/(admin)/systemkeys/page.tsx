'use client'
import HeaderSection from '@/components/header/components/HeaderSection'
import Table from '@/components/table'
import { useGenerateSystemkeyColumns } from '@/hooks/systemkey'
import { globalSelector } from '@/redux/store'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import InsertChildrenkey from './_modals/InsertChildrenkey'
import InsertSystemkey from './_modals/InsertSystemkey'

const Systemkeys = () => {
  const { listSystemKey } = useSelector(globalSelector)
  const [insertSystemkey, setInsertSystemkey] = useState(false)
  const [insertChildrenkey, setInsertChildrenkey] = useState(false)
  const [parentId, setParentId] = useState('')

  const systemkeys = useMemo(() => {
    return listSystemKey
      ?.filter((item) => !item?.parentId)
      ?.map((item) => ({
        ...item,
        children: listSystemKey?.filter((child) => child?.parentId === item?.id) || []
      }))
  }, [listSystemKey])

  return (
    <div>
      <HeaderSection title='System Key' onAddButton={() => setInsertSystemkey(true)} />
      <div>
        <Table
          columns={useGenerateSystemkeyColumns((parentId: string) => {
            setParentId(parentId)
            setInsertChildrenkey(true)
          })}
          data={systemkeys}
        />
      </div>

      {insertSystemkey && <InsertSystemkey open={insertSystemkey} onCancel={() => setInsertSystemkey(false)} />}

      {insertChildrenkey && (
        <InsertChildrenkey open={insertChildrenkey} onCancel={() => setInsertChildrenkey(false)} parentId={parentId} />
      )}
    </div>
  )
}

export default Systemkeys
