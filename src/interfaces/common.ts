export interface IPagination {
  pageSize: number
  currentPage: number
  textSearch?: string
}

export interface IButtonShow {
  isCreate: boolean
  isUpdate: boolean
  isDelete: boolean
}

export interface IGetListResponse<T> {
  list: T[]
  total: number
  buttonShow?: IButtonShow
}

export interface IBaseData {
  id: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IStatistic {
  forMonth?: number
  forYear?: number
}
