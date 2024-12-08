import { EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { todoSchema } from '../../schema/todo.schema'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { getDate } from '../../utils/getDate'
import { memo, useRef, useState } from 'react'
import { EditTo } from '../../action/TodoAction'
import { Edit, Payload, RootState, TDisable } from '../../constants/types'
import TimePicker from '../TimePicker/TimePicker'

type IProps = {
  id: number
  disableProps: boolean
}
function EditTodo(props: IProps) {
  const { id, disableProps } = props
  const data = useSelector((state: RootState) => state.TodoReducer)
  const originalTodoItem: Payload = data.find((item) => item.id === id) as Payload
  const [currentTodoItem, setCurrentTodoItem] = useState<Payload>(originalTodoItem)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenChild, onOpen: onOpenChild, onClose: onCloseChild } = useDisclosure()
  const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure()
  const [disable, setDisable] = useState<TDisable>({ disable: false, loading: false })
  const toast = useToast()
  const cancelRef = useRef(null)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors }
  } = useForm<Edit>({
    defaultValues: {
      title: currentTodoItem.title,
      description: currentTodoItem.description,
      time: {
        hour: currentTodoItem.time.hour,
        minute: currentTodoItem.time.minute
      }
    },
    resolver: yupResolver(todoSchema)
  })

  const dispatch = useDispatch()

  const handleAddNew: SubmitHandler<Edit> = (edit: Edit) => {
    setDisable({ disable: true, loading: true })
    const date = getDate()
    const { hour, minute } = edit.time
    const second =
      hour === currentTodoItem.time.hour && minute === currentTodoItem.time.minute ? currentTodoItem.time.second : 59
    const updatedTodo: Payload = {
      ...currentTodoItem,
      timerStarted: false,
      ...edit,
      UpdateAt: date,
      time: {
        hour,
        minute,
        second
      }
    }

    try {
      dispatch(EditTo(updatedTodo))
      setCurrentTodoItem(updatedTodo)
      onClose()
      toast({
        title: 'Edit success',
        description: 'You have successfully edited the todo',
        status: 'success',
        position: 'top',
        isClosable: true,
        duration: 2000
      })
      reset()
    } catch (error) {
      console.error('Error occurred while editing todo:', error)
      toast({
        title: 'Edit error',
        description: 'An error occurred while editing the todo',
        status: 'error',
        position: 'top',
        isClosable: true,
        duration: 2000
      })
    }
    setDisable({ disable: false, loading: false })
  }

  return (
    <>
      <Box className='self-start'>
        <Tooltip label='Edit todo'>
          <IconButton
            variant='outline'
            colorScheme='teal'
            aria-label='Edit todo'
            icon={<EditIcon />}
            onClick={() => {
              reset({
                title: currentTodoItem.title,
                description: currentTodoItem.description,
                time: {
                  hour: currentTodoItem.time.hour,
                  minute: currentTodoItem.time.minute
                }
              })
              if (originalTodoItem.timerStarted) onOpenChild()
              else onOpen()
            }}
            size='sm'
          />
        </Tooltip>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit todo</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  console.log(e)
                  handleSubmit(handleAddNew)()
                }}
              >
                <VStack spacing={4} align='stretch'>
                  <FormControl isRequired isInvalid={!!errors.title}>
                    <FormLabel>Title</FormLabel>
                    <Input placeholder='Enter title' {...register('title')} disabled={disable.disable} />
                    <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      placeholder='Enter description (optional)'
                      {...register('description')}
                      disabled={disable.disable}
                    />
                  </FormControl>
                  <FormControl isRequired isInvalid={!!errors.time}>
                    <FormLabel>Select Time</FormLabel>
                    <Box>
                      <Controller
                        name='time'
                        control={control}
                        render={({ field }) => (
                          <TimePicker
                            disabled={disableProps}
                            hour={field.value.hour.toString().padStart(2, '0')}
                            minute={field.value.minute.toString().padStart(2, '0')}
                            onTimeChange={(time) => {
                              setValue('time', {
                                hour: parseInt(time.hour),
                                minute: parseInt(time.minute)
                              })
                            }}
                          />
                        )}
                      />
                      {errors.time?.hour && <Text color='red.500'>{errors.time.hour.message}</Text>}
                      {errors.time?.minute && <Text color='red.500'>{errors.time.minute.message}</Text>}
                    </Box>
                  </FormControl>
                  <ModalFooter>
                    <Button colorScheme='blue' isLoading={disable.loading} onClick={onOpenUpdate}>
                      Update
                    </Button>
                    <Button colorScheme='red' ml={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </VStack>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onCloseChild}
        isOpen={isOpenChild}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Warning</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Todo is running, do you want to stop it?</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCloseChild}>
              No
            </Button>
            <Button
              colorScheme='red'
              ml={3}
              onClick={() => {
                onCloseChild()
                onOpen()
              }}
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onCloseUpdate}
        isOpen={isOpenUpdate}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Confirm</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Are you sure you want to update?</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCloseUpdate}>
              No
            </Button>
            <Button
              colorScheme='red'
              ml={3}
              onClick={() => {
                onCloseUpdate()
                onClose()
                handleSubmit(handleAddNew)()
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default memo(EditTodo)
