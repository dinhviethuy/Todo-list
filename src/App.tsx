import { Box, Button, TabList, TabPanel, TabPanels, Tabs, useMultiStyleConfig, useTab } from '@chakra-ui/react'
import TodoList from './components/TodoList/TodoList'
import { forwardRef } from 'react'
import { AiOutlineDashboard, AiOutlineHome } from 'react-icons/ai'

interface CustomTabProps {
  children: React.ReactNode
}

function App() {
  const CustomTab = forwardRef<HTMLButtonElement, CustomTabProps>((props, ref) => {
    // 1. Reuse the `useTab` hook
    const tabProps = useTab({ ...props, ref })

    // 2. Hook into the Tabs `size`, `variant`, props
    const styles = useMultiStyleConfig('Tabs', tabProps)

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

export default App
