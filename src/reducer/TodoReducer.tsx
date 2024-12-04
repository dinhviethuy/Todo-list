import { Action, Payload } from '../constants/types'

const initialState: Payload[] = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo') as string) : []

function TodoReducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'ADD': {
      const newState: Payload[] = [action.payload, ...state]
      localStorage.setItem('todo', JSON.stringify(newState))
      return newState
    }
    case 'DELETE': {
      const newState: Payload[] = state.filter((item) => item.id !== action.id)
      localStorage.setItem('todo', JSON.stringify(newState))
      return newState
    }
    case 'EDIT': {
      const newState: Payload[] = state.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload
        }
        return item
      })
      localStorage.setItem('todo', JSON.stringify(newState))
      return newState
    }
    default:
      return state
  }
}

export default TodoReducer
