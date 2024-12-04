import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
import AddNew from './AddNew'
import { useSelector } from 'react-redux'
import { Payload } from '../../types/action.type'
import EditTodo from './EditTodo'
import DeleteTo from './DeleteTodo'
import Status from './StatusTodo'

export interface RootState {
  TodoReducer: Payload[]
}

function TodoList() {
  const data = useSelector((state: RootState) => state.TodoReducer)
  return (
    <>
      <Card>
        <CardHeader className='flex justify-between'>
          <Heading size='md'>Todo List</Heading>
          <Box>
            <AddNew />
          </Box>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Title</Th>
                  <Th>Description</Th>
                  <Th>Create At</Th>
                  <Th>Update At</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              {data.length > 0 && (
                <Tbody>
                  {data.map((item) => (
                    <Tr key={item.id}>
                      <Td>{item.id}</Td>
                      <Td>{item.title}</Td>
                      <Td whiteSpace='wrap' width={300}>
                        {item.description}
                      </Td>
                      <Td>{item.CreateAt}</Td>
                      <Td>{item.UpdateAt}</Td>
                      <Td width={300}>
                        <Badge colorScheme={item.status ? 'green' : 'red'}>
                          {item.status ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                        </Badge>
                      </Td>
                      <Td>
                        <Box className='flex gap-3 flex-wrap'>
                          <Box className='self-start'>
                            <Status todo={item} />
                          </Box>
                          <DeleteTo id={item.id} />
                          <EditTodo id={item.id} />
                        </Box>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              )}
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </>
  )
}

export default TodoList
