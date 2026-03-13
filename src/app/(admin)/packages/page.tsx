'use client'
import HeaderSection from '@/components/header/components/HeaderSection'
import Table from '@/components/table'
import { useGeneratePackageColumn, usePackages } from '@/hooks/package'
import { IPackage } from '@/interfaces/package'
import { useState } from 'react'
import UpsertPackage from './_modal/UpsertPackage'

const Packages = () => {
  const { packages, loading, refresh } = usePackages({})
  const [openUpsertUpdatePackage, setOpenUpsertUpdatePackage] = useState<IPackage | boolean>(false)

  return (
    <div>
      <HeaderSection title='Quản lý gói' onAddButton={() => setOpenUpsertUpdatePackage(true)} />
      <div>
        <Table columns={useGeneratePackageColumn(setOpenUpsertUpdatePackage)} data={packages} loading={loading} />
      </div>

      {openUpsertUpdatePackage && (
        <UpsertPackage
          open={openUpsertUpdatePackage}
          onCancel={() => setOpenUpsertUpdatePackage(false)}
          onOk={refresh}
        />
      )}
    </div>
  )
}

export default Packages
