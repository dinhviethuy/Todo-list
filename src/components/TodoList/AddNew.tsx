import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
  Text
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { Add } from '../../action/TodoAction'
import { todoSchema } from '../../schema/todo.schema'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { getDate } from '../../utils/getDate'
import { useState } from 'react'
import { Payload, TAdd, TDisable } from '../../constants/types'
import TimePicker from '../TimePicker/TimePicker'

function AddNew() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [disable, setDisable] = useState<TDisable>({
    disable: false,
    loading: false
  })

  const toast = useToast()
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      time: { hour: 0, minute: 0 }
    },
    resolver: yupResolver(todoSchema)
  })

  const dispatch = useDispatch()

  const handleAddNew: SubmitHandler<TAdd> = (formData: TAdd) => {
    const { hour, minute } = formData.time
    setDisable({ disable: true, loading: true })
    const date = getDate()
    const todo: Payload = {
      id: Date.now(),
      ...formData,
      CreateAt: date.toString(),
      UpdateAt: date.toString(),
      timerStarted: false,
      status: false,
      time: {
        hour,
        minute,
        second: 59
      },
      timerExpired: false,
      timeStart: '',
      TimeFinish: '',
      timerPaused: false
    }

    try {
      dispatch(Add(todo))
      onClose()
      toast({
        title: 'Add new success',
        description: "You've successfully added a new todo",
        status: 'success',
        position: 'top',
        isClosable: true,
        duration: 1000
      })
      reset()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Add new error',
        description: 'An error occurred while adding a new todo',
        status: 'error',
        position: 'top',
        isClosable: true,
        duration: 1000
      })
    }
    setDisable({ disable: false, loading: false })
  }

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme='teal' variant='solid' onClick={onOpen}>
        Add new
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(handleAddNew)}>
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
                    rows={4}
                  />
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.time}>
                  <FormLabel>Select Time</FormLabel>
                  <Box>
                    <Controller
                      name='time'
                      control={control}
                      render={() => (
                        <TimePicker
                          onTimeChange={(time) => {
                            const { hour, minute } = time
                            const TimeNumber = { hour: parseInt(hour), minute: parseInt(minute) }
                            setValue('time', TimeNumber)
                          }}
                        />
                      )}
                    />
                    {errors.time?.hour && <Text color='red.500'>{errors.time.hour.message}</Text>}
                    {errors.time?.minute && <Text color='red.500'>{errors.time.minute.message}</Text>}
                  </Box>
                </FormControl>
                <ModalFooter>
                  <Button type='submit' colorScheme='blue' isLoading={disable.loading}>
                    Add
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
    </>
  )
}

export default AddNew
