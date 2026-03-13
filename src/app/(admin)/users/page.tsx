'use client'
import HeaderSection from '@/components/header/components/HeaderSection'
import Table from '@/components/table'
import { useGenerateUserColumn } from '@/hooks/user'
import { IGetListUser, IUserList } from '@/interfaces/user'
import { globalSelector } from '@/redux/store'
import UserService from '@/services/user'
import { SYSTEM_KEY } from '@/utils/constant/common'
import { routes } from '@/utils/constant/route'
import { getListComboKey } from '@/utils/helper/common'
import { Col, DatePicker, Input, Row, Select } from 'antd'
import { debounce } from 'lodash'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
  const [users, setUsers] = useState<IUserList[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState<IGetListUser>({
    currentPage: 1,
    pageSize: 10
  })
  const router = useRouter()
  const { listSystemKey } = useSelector(globalSelector)
  const GENDER = getListComboKey(SYSTEM_KEY.GENDER, listSystemKey)

  const getListUser = async () => {
    setLoading(true)
    try {
      const res = await UserService.getListUser(query)
      if (res?.error) return
      setUsers(res?.data?.list)
      setTotal(res?.data?.total)
    } finally {
      setLoading(false)
    }
  }

  const handleDetail = (userId: string) => {
    router.push(`${routes.users.source}/${userId}`)
  }

  const debouncedChangeQuery = debounce((newQuery: IGetListUser) => {
    setQuery(newQuery)
  }, 500)

  useEffect(() => {
    getListUser()
  }, [query])

  return (
    <div>
      <HeaderSection title='Quản lý người dùng' />
      <Row className='mb-4' gutter={[8, 8]}>
        <Col xxl={14} xl={14} lg={14} md={14} sm={24} xs={24}>
          <Input
            placeholder='Tên người dùng'
            onChange={(e) => {
              debouncedChangeQuery({ ...query, textSearch: e.target.value })
            }}
          />
        </Col>
        <Col xxl={5} xl={5} lg={5} md={5} sm={12} xs={12}>
          <Select
            placeholder='Giới tính'
            allowClear
            options={GENDER.map((i) => ({
              label: i?.keyName,
              value: i?.keyValue
            }))}
            onChange={(value) => {
              debouncedChangeQuery({ ...query, gender: value })
            }}
          />
        </Col>
        <Col xxl={5} xl={5} lg={5} md={5} sm={12} xs={12}>
          <DatePicker
            placeholder='Năm sinh'
            picker='year'
            onChange={(date, dateString) => {
              debouncedChangeQuery({ ...query, yearOfBirth: dateString || '' })
            }}
          />
        </Col>
      </Row>
      <div>
        <Table
          columns={useGenerateUserColumn(query, handleDetail)}
          data={users}
          total={total}
          setPagination={setQuery}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default Users
