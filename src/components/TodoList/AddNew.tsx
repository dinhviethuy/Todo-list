import { AddIcon } from '@chakra-ui/icons'
import {
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
  VStack
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { Add } from '../../action/TodoAction'
import { Payload } from '../../types/action.type'
import { todoSchema } from '../../schema/todo.schema'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { getDate } from '../../utils/getDate'
import { useState } from 'react'

type Add = {
  title: string
  description?: string
}

type disable = {
  disable: boolean
  loading: boolean
}

function AddNew() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [disable, setDisable] = useState<disable>({ disable: false, loading: false })
  const toast = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Add>({
    resolver: yupResolver(todoSchema)
  })
  const dispatch = useDispatch()
  const handleAddNew: SubmitHandler<Add> = (AddNew: Add) => {
    setDisable({ disable: true, loading: true })
    const date = getDate()
    const todo: Payload = {
      id: Date.now(),
      ...AddNew,
      CreateAt: date.toString(),
      UpdateAt: date.toString(),
      status: false
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
                  <Input
                    placeholder='Enter title'
                    {...register('title')}
                    className='border border-gray-300 rounded-md p-2'
                    disabled={disable.disable}
                  />
                  <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    placeholder='Enter description (optional)'
                    {...register('description')}
                    className='border border-gray-300 rounded-md p-2'
                    disabled={disable.disable}
                  />
                </FormControl>
                <ModalFooter>
                  <Button
                    type='submit'
                    colorScheme='blue'
                    className='bg-blue-500 text-white hover:bg-blue-600'
                    isLoading={disable.loading}
                  >
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
