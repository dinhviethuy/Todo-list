import { Box, Button, TabList, TabPanel, TabPanels, Tabs, useMultiStyleConfig, useTab } from '@chakra-ui/react'
import { forwardRef, useEffect } from 'react'
import { AiOutlineDashboard, AiOutlineHome } from 'react-icons/ai'
import { CustomTabProps } from '../../constants/types'
import TodoList from '../../components/TodoList/TodoList'
import moment from 'moment'

function Home() {
  const CustomTab = forwardRef<HTMLButtonElement, CustomTabProps>((props, ref) => {
    const tabProps = useTab({ ...props, ref })
    const styles = useMultiStyleConfig('Tabs', tabProps)
    useEffect(() => {
      const startTime = '04/12/2024 12:00:00'
      const endTime = '04/12/2024 14:30:45'

      // Parse thời gian từ chuỗi định dạng dd/MM/yyyy HH:mm:ss
      const startDate = moment(startTime, 'DD/MM/YYYY HH:mm:ss')
      const endDate = moment(endTime, 'DD/MM/YYYY HH:mm:ss')

      // Tính khoảng thời gian
      const duration = moment.duration(endDate.diff(startDate))

      // Lọc các đơn vị lớn hơn 0
      const components = []
      if (duration.years() > 0) components.push(`${duration.years()} năm`)
      if (duration.months() > 0) components.push(`${duration.months()} tháng`)
      if (duration.days() > 0) components.push(`${duration.days()} ngày`)
      if (duration.hours() > 0) components.push(`${duration.hours()} giờ`)
      if (duration.minutes() > 0) components.push(`${duration.minutes()} phút`)
      if (duration.seconds() > 0) components.push(`${duration.seconds()} giây`)

      const result = components.join(', ')
      console.log(`Khoảng thời gian là: ${result}`)
    }, [])
    return (
      <Button __css={styles.tab} {...tabProps} className='flex items-center w-1/2 justify-center'>
        {tabProps.children}
      </Button>
    )
  })
  return (
    <Tabs>
      <div className='flex justify-center'>
        <TabList className='w-full flex justify-center'>
          <CustomTab>
            <Box className='mr-2'>
              <AiOutlineHome />
            </Box>
            Home
          </CustomTab>
          <CustomTab>
            <Box className='mr-2'>
              <AiOutlineDashboard />
            </Box>
            Dashboard
          </CustomTab>
        </TabList>
      </div>
      <TabPanels>
        <TabPanel>
          <TodoList />
        </TabPanel>
        <TabPanel>Coming soon</TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default Home
