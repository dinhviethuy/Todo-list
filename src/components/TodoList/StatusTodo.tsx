import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  IconButton,
  Tooltip,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { getDate } from '../../utils/getDate'
import { Payload } from '../../constants/types'
import { getTimeFinish } from '../../utils/getTimeFinish'
import { FaCirclePause, FaCirclePlay } from 'react-icons/fa6'
import { MarkCompleted, StartTimer, StopTimer } from '../../action/TodoAction'
import { CheckIcon } from '@chakra-ui/icons'
import { useRef } from 'react'
interface IProps {
  todo: Payload
}

export const Status = (props: IProps) => {
  const { status, timeStart, timerStarted, timerExpired, title, timerPaused } = props.todo
  const dispatch = useDispatch()
  const toast = useToast()
  const { isOpen: isOpenFinish, onOpen: onOpenFinish, onClose: onCloseFinish } = useDisclosure()
  const cancelRef = useRef(null)
  const { isOpen: isOpenPlay, onOpen: onOpenPlay, onClose: onClosePlay } = useDisclosure()
  const cancelRefPlay = useRef(null)
  const { isOpen: isOpenPause, onOpen: onOpenPause, onClose: onClosePause } = useDisclosure()
  const cancelRefPause = useRef(null)
  const startTimer = () => {
    const time = timeStart === '' ? getDate() : timeStart
    const updatedTime = getDate()
    const todo: Payload = {
      ...props.todo,
      timerStarted: true,
      timerPaused: false,
      status: false,
      timeStart: time,
      UpdateAt: updatedTime
    }
    try {
      dispatch(StartTimer(todo, true))
      toast({
        title: 'Start Timer Success',
        description: "We've started your timer.",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top'
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Start Timer Error',
        description: "We've encountered an error while starting your timer.",
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      })
    }
  }
  const pauseTimer = () => {
    const updatedTime = getDate()
    const todo: Payload = {
      ...props.todo,
      timerStarted: false,
      timerPaused: true,
      status: false,
      UpdateAt: updatedTime
    }
    try {
      dispatch(StopTimer(todo))
      toast({
        title: 'Start Timer Success',
        description: "We've started your timer.",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top'
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Start Timer Error',
        description: "We've encountered an error while starting your timer.",
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      })
    }
  }
  const handleStatus = () => {
    const date = getDate()
    const timeFinish = getTimeFinish(timeStart, date)
    const todo: Payload = {
      ...props.todo,
      UpdateAt: date,
      timerStarted: false,
      TimeFinish: timeFinish,
      status: !status
    }
    try {
      dispatch(MarkCompleted(todo))
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
      <Tooltip label={timerStarted ? 'Finish' : 'Play'}>
        {timerStarted || timerPaused ? (
          <>
            {timerPaused && (
              <IconButton
                variant='solid'
                aria-label='Play todo'
                icon={<FaCirclePlay />}
                size='sm'
                onClick={onOpenPlay}
              />
            )}
            {timerStarted && (
              <Box className='flex gap-3 flex-wrap'>
                <IconButton
                  variant='solid'
                  colorScheme='green'
                  aria-label='Finish todo'
                  icon={<CheckIcon />}
                  size='sm'
                  onClick={onOpenFinish}
                />
                <IconButton
                  variant='solid'
                  aria-label='Pause todo'
                  icon={<FaCirclePause />}
                  size='sm'
                  onClick={onOpenPause}
                />
              </Box>
            )}
          </>
        ) : (
          !timerExpired &&
          !status && (
            <IconButton variant='solid' aria-label='Play todo' icon={<FaCirclePlay />} size='sm' onClick={onOpenPlay} />
          )
        )}
      </Tooltip>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onCloseFinish}
        isOpen={isOpenFinish}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Confirm?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{`You want to ${status ? 'undo' : 'finish'} this todo ${title}?`}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCloseFinish}>
              No
            </Button>
            <Button
              colorScheme='green'
              ml={3}
              onClick={() => {
                onCloseFinish()
                handleStatus()
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRefPlay}
        onClose={onClosePlay}
        isOpen={isOpenPlay}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Confirm?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{`You want to play this todo ${title}?`}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRefPlay} onClick={onClosePlay}>
              No
            </Button>
            <Button
              colorScheme='green'
              ml={3}
              onClick={() => {
                onClosePlay()
                startTimer()
              }}
            >
              Play
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRefPause}
        onClose={onClosePause}
        isOpen={isOpenPause}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Confirm?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{`You want to pause this todo ${title}?`}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRefPause} onClick={onClosePause}>
              No
            </Button>
            <Button
              colorScheme='green'
              ml={3}
              onClick={() => {
                onClosePause()
                pauseTimer()
              }}
            >
              Pause
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Status
