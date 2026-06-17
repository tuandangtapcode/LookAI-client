'use client'
import HeaderSection from '@/components/header/components/HeaderSection'
import Table from '@/components/table'
import { useGeneratePaymentColumn } from '@/hooks/payment'
import { IGetListPayment, IPayment } from '@/interfaces/payment'
import PaymentService from '@/services/payment'
import { logError } from '@/utils/helper/log'
import { Col, Input, Row } from 'antd'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'

const Payments = () => {
  const [payments, setPayments] = useState<IPayment[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [query, setQuery] = useState<IGetListPayment>({
    pageSize: 10,
    currentPage: 1
  })

  const debouncedChangeQuery = debounce((newQuery: IGetListPayment) => {
    setQuery(newQuery)
  }, 500)

  const getListPayment = async () => {
    try {
      setLoading(true)

      const res = await PaymentService.getListPayment(query)
      if (res?.error) return

      setPayments(res?.data?.list)
      setTotal(res?.data?.total)
    } catch (error) {
      logError('Payments.tsx-getListPayment', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListPayment()
  }, [query])

  return (
    <div>
      <HeaderSection title='Quản lý giao dịch' />
      <Row className='mb-4' gutter={[8, 8]}>
        <Col span={8}>
          <Input
            placeholder='Tên người dùng'
            onChange={(e) => {
              debouncedChangeQuery({ ...query, textSearch: e.target.value })
            }}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder='Tên gói dịch vụ'
            onChange={(e) => {
              debouncedChangeQuery({ ...query, packageName: e.target.value })
            }}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder='Mã thanh toán'
            onChange={(e) => {
              debouncedChangeQuery({ ...query, orderCode: e.target.value })
            }}
          />
        </Col>
      </Row>
      <div>
        <Table columns={useGeneratePaymentColumn(query)} data={payments} loading={loading} total={total} />
      </div>
    </div>
  )
}

export default Payments
