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
import EditTodo from './EditTodo'
import DeleteTo from './DeleteTodo'
import Status from './StatusTodo'
import { RootState } from '../../constants/types'
import TimerStart from '../TimerStart/TimerStart'

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
                  <Th>Time Finish</Th>
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
                        <Badge colorScheme={item.status ? 'green' : item.timerExpired ? 'red' : 'orange'}>
                          {item.status ? 'Đã hoàn thành' : item.timerExpired ? 'Hết giờ' : 'Chưa hoàn thành'}
                        </Badge>
                      </Td>
                      <Td>
                        {item.timerStarted ? (
                          <TimerStart todo={item} />
                        ) : item.status ? (
                          `Đã hoàn thành trong ${item.TimeFinish}`
                        ) : (
                          `Thời gian còn lại: ${item.time.hour.toString().padStart(2, '0')}:${item.time.minute.toString().padStart(2, '0')}:${item.time.second.toString().padStart(2, '0')}`
                        )}
                      </Td>
                      <Td>
                        <Box className='flex gap-3 flex-wrap'>
                          {!item.status && !item.timerExpired && (
                            <Box className='self-start'>
                              <Status todo={item} />
                            </Box>
                          )}
                          <DeleteTo id={item.id} />
                          <EditTodo id={item.id} disableProps={item.timerExpired || item.status} />
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
