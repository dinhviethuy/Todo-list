import { ReactNode } from 'react'

export type Edit = {
  title: string
  description?: string
  time: {
    hour: number
    minute: number
  }
}

export type TDisable = {
  disable: boolean
  loading: boolean
}

export type TAdd = {
  title: string
  description?: string
  time: {
    hour: number
    minute: number
  }
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
  TimeFinish?: string
  time: {
    hour: number
    minute: number
    second: number
  }
  timerStarted: boolean
  timerPaused: boolean
  timerExpired: boolean
  timeStart: string
}

export interface Action {
  type: string
  payload: Payload
  id: number
  start?: boolean
}

export interface RootState {
  TodoReducer: Payload[]
}
