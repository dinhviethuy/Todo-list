import { useState } from 'react'
import { Box, HStack, Select } from '@chakra-ui/react'

interface IProps {
  onTimeChange: (time: { hour: string; minute: string }) => void
  hour?: string
  minute?: string
  disabled?: boolean
}

const TimePicker = (props: IProps) => {
  const { onTimeChange, hour, minute, disabled = false } = props
  const [time, setTime] = useState({ hour: hour || '', minute: minute || '' })
  const handleChange = (field: 'hour' | 'minute', value: string) => {
    const updatedTime = { ...time, [field]: value }
    setTime(updatedTime)
    onTimeChange(updatedTime)
  }

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))

  return (
    <HStack>
      <Select
        placeholder='Hour'
        value={time.hour}
        onChange={(e) => handleChange('hour', e.target.value)}
        width='86px'
        disabled={disabled}
      >
        {hours.map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </Select>
      <Box>:</Box>
      <Select
        placeholder='Minute'
        value={time.minute}
        onChange={(e) => handleChange('minute', e.target.value)}
        width='102px'
        disabled={disabled}
      >
        {minutes.map((minute) => (
          <option key={minute} value={minute}>
            {minute}
          </option>
        ))}
      </Select>
    </HStack>
  )
}

export default TimePicker
