'use client'
import { Table as AntdTable } from 'antd'
import { TableProps as AtndTableProps, ColumnsType } from 'antd/es/table'
import { ExpandableConfig } from 'antd/es/table/interface'

export type TableRowSelection<T extends object = object> = AtndTableProps<T>['rowSelection']

interface TableProps<T extends object> {
  columns: ColumnsType<T>
  data: T[]
  pagination?: any
  total?: number
  setPagination?: (callback: (prev: any) => any) => void
  rowSelection?: TableRowSelection<T>
  expandable?: ExpandableConfig<T>
}

const Table = <T extends object>({
  columns,
  data,
  pagination,
  total,
  setPagination,
  rowSelection,
  expandable
}: TableProps<T>) => {
  return (
    <AntdTable
      bordered
      columns={columns}
      dataSource={data}
      rowKey='id'
      rowSelection={rowSelection ? rowSelection : undefined}
      expandable={expandable}
      pagination={
        pagination?.pageSize && total
          ? {
              hideOnSinglePage: total <= 10,
              current: pagination?.currentPage,
              pageSize: pagination?.pageSize,
              responsive: true,
              total,
              showSizeChanger: total > 10,
              locale: { items_per_page: '' },
              onChange: (currentPage, pageSize) =>
                setPagination?.((pre: any) => ({
                  ...pre,
                  currentPage,
                  pageSize
                }))
            }
          : false
      }
    />
  )
}

export default Table
