import { Badge, useToast } from '@chakra-ui/react'
import { Payload } from '../../constants/types'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { StartTimer } from '../../action/TodoAction'

interface IProps {
  todo: Payload
}

function TimerStart(props: IProps) {
  const { todo } = props
  const { hour, minute, second } = todo.time
  const dispatch = useDispatch()
  const toast = useToast()
  useEffect(() => {
    const interval = setInterval(() => {
      const { hour, minute, second } = todo.time
      if (hour == 0 && minute == 0 && second == 0) {
        toast({
          title: `Timer Expired todo ${todo.title}`,
          description: 'Your timer has expired.',
          status: 'warning',
          duration: 2000,
          isClosable: true,
          position: 'top'
        })
      }
      dispatch(StartTimer(todo, false))
    }, 1000)
    return () => clearInterval(interval)
  }, [dispatch, hour, minute, second, toast, todo])
  return (
    <>
      <Badge>
        Còn lại {hour.toString().padStart(2, '0')}:{minute.toString().padStart(2, '0')}:
        {second.toString().padStart(2, '0')}
      </Badge>
    </>
  )
}

export default TimerStart
