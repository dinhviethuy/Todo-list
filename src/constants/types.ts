import { ReactNode } from 'react'

export type Edit = {
  title: string
  description?: string
}

export type TDisable = {
  disable: boolean
  loading: boolean
}

export type TAdd = {
  title: string
  description?: string
}

export interface CustomTabProps {
  children: ReactNode
}

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

export interface RootState {
  TodoReducer: Payload[]
}
