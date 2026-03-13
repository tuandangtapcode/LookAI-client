'use client'
import HeaderSection from '@/components/header/components/HeaderSection'
import Table from '@/components/table'
import { useGenerateExpenseColumn } from '@/hooks/expense'
import { IExpense, IGetListExpense } from '@/interfaces/expense'
import ExpenseService from '@/services/expense'
import { ExpenseTypeEnum } from '@/utils/enum/expense'
import { Col, DatePicker, Row, Select } from 'antd'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import UpsertExpense from './_modal/UpsertExpense'

const Expenses = () => {
  const [expenses, setExpenses] = useState<IExpense[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState<IGetListExpense>({
    currentPage: 1,
    pageSize: 10
  })
  const [openUpsertUpdateExpense, setOpenUpsertUpdateExpense] = useState<IExpense | boolean>(false)

  const getListExpense = async () => {
    setLoading(true)
    try {
      const res = await ExpenseService.getListExpense(query)
      if (res?.error) return
      setExpenses(res?.data?.list)
      setTotal(res?.data?.total)
    } finally {
      setLoading(false)
    }
  }

  const debouncedChangeQuery = debounce((newQuery: IGetListExpense) => {
    setQuery(newQuery)
  }, 500)

  useEffect(() => {
    getListExpense()
  }, [query])

  return (
    <div>
      <HeaderSection title='Quản lý chi phí' onAddButton={() => setOpenUpsertUpdateExpense(true)} />
      <Row className='mb-4' gutter={[8, 8]}>
        <Col span={12}>
          <Select
            placeholder='Loại chi phí'
            allowClear
            options={Object.values(ExpenseTypeEnum).map((value) => ({
              label: value,
              value: value
            }))}
            onChange={(value) => {
              debouncedChangeQuery({ ...query, type: value })
            }}
          />
        </Col>
        <Col span={12}>
          <DatePicker
            picker='month'
            placeholder='Chọn tháng'
            onChange={(date) => {
              debouncedChangeQuery({
                ...query,
                forMonth: date ? date.month() + 1 : undefined,
                forYear: date ? date.year() : undefined
              })
            }}
          />
        </Col>
      </Row>
      <div>
        <Table
          columns={useGenerateExpenseColumn(query, setOpenUpsertUpdateExpense)}
          data={expenses}
          loading={loading}
          total={total}
        />
      </div>

      {openUpsertUpdateExpense && (
        <UpsertExpense
          open={openUpsertUpdateExpense}
          onCancel={() => setOpenUpsertUpdateExpense(false)}
          onOk={getListExpense}
        />
      )}
    </div>
  )
}

export default Expenses
