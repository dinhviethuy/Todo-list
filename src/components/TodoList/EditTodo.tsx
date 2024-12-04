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
  VStack
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { Payload } from '../../types/action.type'
import { todoSchema } from '../../schema/todo.schema'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { getDate } from '../../utils/getDate'
import { useState } from 'react'
import { RootState } from './TodoList'
import { EditTo } from '../../action/TodoAction'

type Edit = {
  title: string
  description?: string
}

type disable = {
  disable: boolean
  loading: boolean
}

type IProps = {
  id: number
}

function EditTodo(props: IProps) {
  const { id } = props
  const data = useSelector((state: RootState) => state.TodoReducer)
  const TodoItem: Payload = data.find((item) => item.id === id) as Payload
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [disable, setDisable] = useState<disable>({ disable: false, loading: false })
  const toast = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Edit>({
    resolver: yupResolver(todoSchema)
  })
  const dispatch = useDispatch()
  const handleAddNew: SubmitHandler<Edit> = (Edit: Edit) => {
    setDisable({ disable: true, loading: true })
    const date = getDate()
    const todo: Payload = {
      id: TodoItem.id,
      ...Edit,
      CreateAt: TodoItem.CreateAt,
      UpdateAt: date,
      status: TodoItem.status
    }
    try {
      dispatch(EditTo(todo))
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
      console.error(error)
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
          {/* <Button size='sm' colorScheme='blue' onClick={onOpen}>
            <EditIcon />
          </Button> */}
          <IconButton
            variant='outline'
            colorScheme='teal'
            aria-label='Edit todo'
            icon={<EditIcon />}
            onClick={onOpen}
            size='sm'
          />
        </Tooltip>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit todo</ModalHeader>
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
                      defaultValue={TodoItem?.title}
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
                      defaultValue={TodoItem?.description}
                    />
                  </FormControl>
                  <ModalFooter>
                    <Button
                      type='submit'
                      colorScheme='blue'
                      className='bg-blue-500 text-white hover:bg-blue-600'
                      isLoading={disable.loading}
                    >
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
    </>
  )
}

export default EditTodo
