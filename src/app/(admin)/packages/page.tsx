'use client'
import HeaderSection from '@/components/header/components/HeaderSection'
import Spin from '@/components/spin'
import Table from '@/components/table'
import { useGeneratePackageColumn, usePackages } from '@/hooks/package'
import { IPackage } from '@/interfaces/package'
import { useState } from 'react'
import UpsertPackage from './_modal/UpsertPackage'

const Packages = () => {
  const { packages, loading, refresh } = usePackages({ isActive: null })
  const [openUpsertUpdatePackage, setOpenUpsertUpdatePackage] = useState<IPackage | boolean>(false)

  return (
    <Spin loading={loading}>
      <HeaderSection title='Quản lý gói' onAddButton={() => setOpenUpsertUpdatePackage(true)} />
      <div>
        <Table columns={useGeneratePackageColumn(setOpenUpsertUpdatePackage)} data={packages} />
      </div>

      {openUpsertUpdatePackage && (
        <UpsertPackage
          open={openUpsertUpdatePackage}
          onCancel={() => setOpenUpsertUpdatePackage(false)}
          onOk={refresh}
        />
      )}
    </Spin>
  )
}

export default Packages
