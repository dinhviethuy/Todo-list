import { Action, Payload } from '../constants/types'

type AddAction = Omit<Action, 'id'>
type EditAction = Omit<Action, 'id'>
type DeleteAction = Omit<Action, 'payload'>
type StartTimerAction = Omit<Action, 'id'> & { start: boolean; payload: Payload; type: string }
type StopTimerAction = Omit<Action, 'payload'>
type MarkCompletedAction = Omit<Action, 'id'>
type TimerExpiredAction = Omit<Action, 'payload'>

export const Add = (todo: Payload): AddAction => {
  return {
    type: 'ADD',
    payload: todo
  }
}

export const EditTo = (todo: Payload): EditAction => {
  return {
    type: 'EDIT',
    payload: todo
  }
}

export const DeleteTodo = (id: number): DeleteAction => {
  return {
    type: 'DELETE',
    id: id
  }
}

export const StartTimer = (todo: Payload, start: boolean): StartTimerAction => {
  return {
    type: 'START_TIMER',
    start: start,
    payload: todo
  }
}

export const StopTimer = (id: number): StopTimerAction => {
  return {
    type: 'STOP_TIMER',
    id: id
  }
}

export const MarkCompleted = (todo: Payload): MarkCompletedAction => {
  return {
    type: 'MARK_COMPLETED',
    payload: todo
  }
}

export const TimerExpired = (id: number): TimerExpiredAction => {
  return {
    type: 'TIMER_EXPIRED',
    id: id
  }
}
