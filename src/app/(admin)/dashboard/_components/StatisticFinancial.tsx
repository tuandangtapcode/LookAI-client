'use client'
import Spin from '@/components/spin'
import { IStatisticFinancial } from '@/interfaces/dashboard'
import DashboardService from '@/services/dashboard'
import { logError } from '@/utils/helper/log'
import { useEffect, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = ['#60a5fa', '#38bdf8', '#06b6d4', '#0ea5a4', '#7dd3fc']

const StatisticFinancial = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IStatisticFinancial>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const now = new Date()
        const params = { forMonth: now.getMonth() + 1, forYear: now.getFullYear() }
        const res = await DashboardService.statisticFinancial(params)
        if (res?.data) setData(res.data)
      } catch (error) {
        logError('StatisticFinancial.tsx-fetchData', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const pieData = data ? data?.expense?.analysis?.map((a) => ({ name: a.type, value: a.totalAmount })) : []
  const barData = data
    ? [
        { name: 'Expense', value: data?.expense?.total, color: '#ff0000' },
        { name: 'Payment', value: data?.payment, color: '#1db954' }
      ]
    : []

  return (
    <Spin loading={loading}>
      <div className='grid grid-cols-2 gap-x-4'>
        <div className='w-full p-4 border border-(--color-matte) rounded'>
          <div className='text-sm text-gray-500 mb-2'>So sánh Chi và Thu</div>
          {!barData?.length ? (
            <div className='text-sm text-gray-400'>Không có dữ liệu</div>
          ) : (
            <div style={{ width: '100%', height: 170 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie dataKey='value' data={barData} nameKey='name' outerRadius={80} fill='#8884d8'>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
        <div className='w-full p-4 border border-(--color-matte) rounded'>
          <div className='text-sm text-gray-500 mb-2'>Phân tích chi theo loại</div>
          {!pieData.length ? (
            <div className='text-sm text-gray-400'>Không có dữ liệu</div>
          ) : (
            <div style={{ width: '100%', height: 170 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie dataKey='value' data={pieData} nameKey='name' outerRadius={80} fill='#8884d8'>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </Spin>
  )
}

export default StatisticFinancial
