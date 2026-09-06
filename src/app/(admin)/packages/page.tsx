'use client'
import HeaderSection from '@/components/header/components/HeaderSection'
import Table from '@/components/table'
import { useGeneratePackageColumn, usePackages } from '@/hooks/package'
import { IPackage } from '@/interfaces/package'
import { useState } from 'react'
import UpsertPackage from './_modal/UpsertPackage'

const Packages = () => {
  const { packages, loading, refresh } = usePackages({})
  const [upsertUpdatePackage, setUpsertUpdatePackage] = useState<IPackage | boolean>(false)

  return (
    <div>
      <span className='tracking-label text-(--color-gold)'>Quản lý</span>
      <HeaderSection title='Gói dịch vụ' onAddButton={() => setUpsertUpdatePackage(true)} />
      <div>
        <Table columns={useGeneratePackageColumn(setUpsertUpdatePackage)} data={packages} loading={loading} />
      </div>

      {upsertUpdatePackage && (
        <UpsertPackage open={upsertUpdatePackage} onCancel={() => setUpsertUpdatePackage(false)} onOk={refresh} />
      )}
    </div>
  )
}

export default Packages
