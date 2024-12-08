import { Action, Payload } from '../../constants/types'

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
    case 'START_TIMER': {
      const newState: Payload[] = state.map((todo) => {
        if (todo.id === action.payload.id && action.start) {
          return action.payload
        }
        if (todo.id === action.payload.id) {
          const { hour, minute, second } = todo.time
          if (second === 0) {
            if (minute === 0) {
              if (hour === 0) {
                return { ...todo, timerStarted: false, timerExpired: true }
              } else {
                return { ...todo, time: { hour: hour - 1, minute: 59, second: 59 }, timerStarted: true }
              }
            } else {
              return { ...todo, time: { hour: hour, minute: minute - 1, second: 59 }, timerStarted: true }
            }
          } else {
            return { ...todo, time: { hour: hour, minute: minute, second: second - 1 }, timerStarted: true }
          }
        }
        return todo
      })
      localStorage.setItem('todo', JSON.stringify(newState))
      return newState
    }

    case 'STOP_TIMER': {
      const newState: Payload[] = state.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload
        }
        return todo
      })
      localStorage.setItem('todo', JSON.stringify(newState))
      return newState
    }

    case 'MARK_COMPLETED': {
      const newState: Payload[] = state.map((todo) => (todo.id === action.payload.id ? action.payload : todo))
      localStorage.setItem('todo', JSON.stringify(newState))
      return newState
    }

    case 'TIMER_EXPIRED': {
      const newState: Payload[] = state.map((todo) =>
        todo.id === action.id ? { ...todo, timerStarted: false, timerExpired: true } : todo
      )
      localStorage.setItem('todo', JSON.stringify(newState))
      return newState
    }
    default:
      return state
  }
}

export default TodoReducer
