import { Action, Payload } from '../types/action.type'

type AddAction = Omit<Action, 'id'>
type EditAction = Omit<Action, 'id'>
type DeleteAction = Omit<Action, 'payload'>

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
