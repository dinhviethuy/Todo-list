import { CheckIcon, RepeatClockIcon } from '@chakra-ui/icons'
import { IconButton, Tooltip, useToast } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { getDate } from '../../utils/getDate'
import { Payload } from '../../constants/types'
import { getTimeFinish } from '../../utils/getTimeFinish'

interface IProps {
  todo: Payload
}

export const Status = (props: IProps) => {
  const { status, CreateAt } = props.todo
  const dispatch = useDispatch()
  const toast = useToast()
  const handleStatus = () => {
    const date = getDate()
    const timeFinish = getTimeFinish(CreateAt, date)
    const todo: Payload = {
      ...props.todo,
      UpdateAt: date,
      TimeFinish: timeFinish,
      status: !status
    }
    try {
      dispatch({
        type: 'EDIT',
        payload: todo
      })
      toast({
        title: !status ? 'Finish Success' : 'Undo Success',
        description: "We've updated your todo.",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top'
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Update Error',
        description: "We've encountered an error while updating your todo.",
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      })
    }
  }
  return (
    <>
      <Tooltip label={status ? 'Undo' : 'Finish'}>
        {status ? (
          <IconButton
            variant='solid'
            aria-label='Undo todo'
            icon={<RepeatClockIcon />}
            size='sm'
            onClick={handleStatus}
          />
        ) : (
          <IconButton
            variant='solid'
            colorScheme='green'
            aria-label='Undo todo'
            icon={<CheckIcon />}
            size='sm'
            onClick={handleStatus}
          />
        )}
      </Tooltip>
    </>
  )
}

export default Status
