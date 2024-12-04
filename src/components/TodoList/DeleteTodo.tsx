import { DeleteIcon } from '@chakra-ui/icons'
import {
  AlertDialog,
  AlertDialogBody,
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
import { DeleteTodo } from '../../action/TodoAction'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'

interface IProps {
  id: number
}

function DeleteTo(props: IProps) {
  const { id } = props
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)
  const toast = useToast()
  const handleDelete = () => {
    try {
      dispatch(DeleteTodo(id))
      toast({
        title: 'Delete Success',
        description: "We've deleted your todo.",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top'
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Delete Error',
        description: "We've encountered an error while deleting your todo.",
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      })
    }
    onClose()
  }
  return (
    <>
      <Box>
        <Tooltip label='Delete'>
          <IconButton
            variant='solid'
            colorScheme='red'
            aria-label='Delete todo'
            icon={<DeleteIcon />}
            size='sm'
            onClick={onOpen}
          />
        </Tooltip>
      </Box>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Todo
            </AlertDialogHeader>
            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DeleteTo
