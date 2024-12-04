export type Payload = {
  id: number
  title: string
  description?: string
  CreateAt: string
  UpdateAt: string
  status: boolean
}

export interface Action {
  type: string
  payload: Payload
  id: number
}
